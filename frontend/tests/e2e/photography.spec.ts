import { test, expect } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('populated collection rotation pauses after input and stays manual with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.clock.install();
  await page.goto('/blogs');
  await page.evaluate(async () => {
    const path = '/src/features/portfolio/content.ts';
    const content = (await import(/* @vite-ignore */ path)) as {
      photoCollections: { photos: unknown[] }[];
    };
    for (const collection of content.photoCollections) {
      collection.photos = [
        {
          slug: 'test-frame',
          src: '/images/project-oncosyn.webp',
          width: 40,
          height: 40,
          alt: 'Test image',
          caption: null,
        },
      ];
    }
  });
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  const strip = page.getByRole('region', { name: 'Photography collections' });
  await page.evaluate(() => document.fonts.ready);
  await strip.scrollIntoViewIfNeeded();
  await expect(
    strip.getByRole('button', { name: 'Pause collection rotation' }),
  ).toBeVisible();
  await page.waitForTimeout(100);
  await page.clock.runFor(6100);
  await expect(strip.locator('.photo-strip-controls')).toContainText(
    'Landscapes',
  );
  await strip.getByRole('button', { name: 'Next collection' }).click();
  await page.clock.runFor(1000);
  await expect(strip.locator('.photo-strip-controls')).toContainText(
    'Everyday light',
  );
  const play = strip.getByRole('button', { name: 'Play collection rotation' });
  await expect(play).toBeVisible();
  await page.clock.runFor(12500);
  await expect(strip.locator('.photo-strip-controls')).toContainText(
    'Everyday light',
  );
  await play.click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(play).toBeDisabled();
  await page.clock.runFor(12500);
  await expect(strip.locator('.photo-strip-controls')).toContainText(
    'Everyday light',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(play).toBeEnabled();
  await page.clock.runFor(12500);
  await expect(strip.locator('.photo-strip-controls')).toContainText(
    'Everyday light',
  );
});

test('collection filmstrip jumps into the complete gallery without invented photographs', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const strip = page.getByRole('region', { name: 'Photography collections' });
  await expect(strip.getByRole('link', { name: /Night sky/ })).toBeVisible();
  await strip.getByRole('button', { name: 'Next collection' }).click();
  await expect(strip.getByRole('status')).toContainText('Landscapes');
  await strip.getByRole('link', { name: /Landscapes/ }).click();
  await expect(page).toHaveURL(/\/photography#collection-landscapes$/);
  await expect(
    page.getByRole('heading', { name: 'Landscapes', exact: true }),
  ).toBeFocused();
  await expect(
    page
      .getByRole('region', { name: 'Landscapes' })
      .getByText('No photographs published yet.'),
  ).toBeVisible();
  await expect(page.locator('.empty-collection-cover')).toHaveCount(3);
  await expect(page.getByRole('button', { name: /^View / })).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Landscapes', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Everyday light', exact: true }),
  ).toBeVisible();
});

test('legacy collection routes recover and homepage filmstrip controls work', async ({
  page,
}) => {
  await page.goto('/photography/missing');
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Return home' }).click();
  const strip = page.getByRole('region', { name: 'Photography collections' });
  await strip.focus();
  await strip.press('ArrowRight');
  await expect(strip.getByRole('status')).toContainText('Landscapes');
  await strip.press('ArrowLeft');
  await expect(strip.getByRole('status')).toContainText('Night sky');
});

test('public resume downloads a PDF and command search opens writing', async ({
  page,
}) => {
  await page.goto('/');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Resume', exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('Debrato-Ghosh-Resume.pdf');
  expect(await download.failure()).toBeNull();
  await page.keyboard.press('Control+k');
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('Writing archive');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/blogs$/);
  await expect(
    page.getByRole('heading', { name: 'Writing archive', exact: true }),
  ).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});

test('illustrated covers load and lead to collections without fabricated personal photographs', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const selector of [
    '.achievement-illustration img',
    '.thought-cover img',
    '.collection-card[data-illustrated="true"] img',
  ]) {
    for (const cover of await page.locator(selector).all()) {
      await cover.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          cover.evaluate(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  await expect(
    page.getByText('Illustrated covers · Original photographs coming'),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Explore photography' }).click();
  await expect(
    page.getByRole('heading', { name: 'No photographs published yet.' }),
  ).toHaveCount(3);
  await expect(page.locator('.empty-collection-cover')).toHaveCount(3);
  await expect(page.getByRole('button', { name: /^View / })).toHaveCount(0);
});

test('populated gallery supports focus recovery, next photo and reduced-motion controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // Development-only module data injection: test images never enter production content.
  await page.evaluate(async () => {
    const modulePath = '/src/features/portfolio/content.ts';
    const module = (await import(/* @vite-ignore */ modulePath)) as {
      photoCollections: { photos: unknown[] }[];
    };
    const src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="teal"/></svg>',
      );
    module.photoCollections[0]!.photos = [
      {
        slug: 'test-one',
        src,
        width: 40,
        height: 40,
        alt: 'Test frame one',
        caption: 'Test caption one',
      },
      {
        slug: 'test-two',
        src,
        width: 40,
        height: 40,
        alt: 'Test frame two',
        caption: null,
      },
    ];
  });
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await page.getByRole('link', { name: 'Explore photography' }).click();
  const invoker = page.getByRole('button', { name: 'View Test frame one' });
  await invoker.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('img')).toHaveAttribute(
    'alt',
    'Test frame one',
  );
  await expect
    .poll(() =>
      page
        .getByRole('dialog')
        .evaluate((dialog) => dialog.contains(document.activeElement)),
    )
    .toBe(true);
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog').getByRole('img')).toHaveAttribute(
    'alt',
    'Test frame two',
  );
  await expect(
    page.getByRole('button', { name: 'Play slideshow' }),
  ).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(invoker).toBeFocused();
});

test('mobile section menu navigates and current section updates', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Jump to section').selectOption('skills');
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#skills h2')).toBeFocused();
  await page.setViewportSize({ width: 1760, height: 900 });
  await page
    .locator('#projects')
    .evaluate((element) => element.scrollIntoView());
  await expect(
    page
      .getByRole('navigation', { name: 'Section index' })
      .getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('aria-current', 'location');
});

test('enlarged desktop text keeps the section index clear and accurate', async ({
  page,
}) => {
  await page.setViewportSize({ width: 2240, height: 1087 });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 150%; }' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#projects').evaluate((section) =>
    window.scrollTo({
      top: section.getBoundingClientRect().top + scrollY - 80,
      behavior: 'instant',
    }),
  );
  const menu = page.getByLabel('Jump to section');
  await expect(menu).toBeHidden();
  const index = page.getByRole('navigation', { name: 'Section index' });
  await expect(index).toBeVisible();
  await expect(
    index.getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('aria-current', 'location');
  const geometry = await page.evaluate(() => {
    const nav = document.querySelector('.section-index')!;
    const content = document.querySelector('.portfolio-content')!;
    const track = document.querySelector('.photo-strip-track')!;
    const box = nav.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    return {
      gap: box.left - contentBox.right,
      topDelta: Math.abs(box.top - innerHeight * 0.26),
      scrollbarWidth: getComputedStyle(track).scrollbarWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  expect(geometry.gap).toBeGreaterThanOrEqual(24);
  expect(geometry.topDelta).toBeLessThanOrEqual(2);
  expect(geometry.scrollbarWidth).toBe('none');
  expect(geometry.overflow).toBe(false);
});

test('home link restores the hero after a section jump and shortcut close restores its invoker', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Contact', exact: true })
    .click();
  await expect(page.locator('#contact h2')).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
      ),
    )
    .toBe(true);
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'DEBRATO GHOSH', exact: true }),
  ).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeLessThan(80);
  const invoker = page.getByRole('button', {
    name: /^Theme: (Light|Dark)$/,
  });
  await invoker.focus();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(invoker).toBeFocused();
});

test('a homepage document load always starts at the hero', async ({ page }) => {
  await page.goto('/#contact');
  await expect(
    page.getByRole('heading', { name: 'DEBRATO GHOSH', exact: true }),
  ).toBeInViewport();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(80);
  await expect(page).toHaveURL(/\/$/);
});

test('collection swipe and arrow navigation share the visible selection', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const strip = page.getByRole('region', { name: 'Photography collections' });
  const track = strip.locator('.photo-strip-track');
  await track.evaluate((element) => {
    element.scrollLeft = element.scrollWidth;
  });
  await expect(strip.getByRole('status')).toContainText('Everyday light');
  await strip.getByRole('button', { name: 'Next collection' }).click();
  await expect(strip.getByRole('status')).toContainText('Night sky');
});

test('desktop strip preserves the selected final collection when two cards fit', async ({
  page,
}) => {
  await page.setViewportSize({ width: 941, height: 1672 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const strip = page.getByRole('region', { name: 'Photography collections' });
  await expect(strip.getByRole('status')).toContainText('Night sky');
  await strip.getByRole('button', { name: 'Next collection' }).click();
  await strip.getByRole('button', { name: 'Next collection' }).click();
  await expect(strip.getByRole('status')).toContainText('Everyday light');
  await page.waitForTimeout(200);
  await expect(strip.getByRole('status')).toContainText('Everyday light');
});
