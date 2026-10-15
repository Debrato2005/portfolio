import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('section guides clear the content and the desktop index labels fit', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1760, height: 800 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const guides = await page
    .locator('.portfolio-content')
    .evaluate((content) => {
      const before = getComputedStyle(content, '::before');
      const after = getComputedStyle(content, '::after');
      return { left: parseFloat(before.left), right: parseFloat(after.right) };
    });
  expect(guides.left).toBeLessThan(0);
  expect(guides.right).toBeLessThan(0);
  const index = page.getByRole('navigation', { name: 'Section index' });
  await expect(index).toBeVisible();
  const links = await index.locator('a').evaluateAll((elements) =>
    elements.map((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getClientRects().length;
    }),
  );
  expect(links.every((lines) => lines === 1)).toBe(true);
  await page.setViewportSize({ width: 1760, height: 500 });
  const bounds = await index.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(500);
});

test('skills use the available section width without crowding adjacent groups', async ({
  page,
}) => {
  for (const width of [1760, 1515, 1120, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.locator('.skills-grid').evaluate((grid) => {
      const bounds = grid.getBoundingClientRect();
      const groups = [...grid.children];
      return {
        gutter: groups[0]!.getBoundingClientRect().left - bounds.left,
        crowded: groups.some((group) => {
          const box = group.getBoundingClientRect();
          return [...group.querySelectorAll('li,h3')].some((item) => {
            const rect = item.getBoundingClientRect();
            return rect.left < box.left - 1 || rect.right > box.right + 1;
          });
        }),
      };
    });
    expect(geometry.gutter, `${width}px empty skills gutter`).toBeLessThan(2);
    expect(geometry.crowded, `${width}px skill group containment`).toBe(false);
  }
});

test('phone collection cards keep the icon, label and arrow in one row', async ({
  page,
}) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const card = page.locator('.collection-card').first();
    const thumbnail = await card.locator('.collection-slot').boundingBox();
    const title = await card.locator('strong').boundingBox();
    const arrow = await card.locator(':scope > .icon').boundingBox();
    expect(thumbnail!.y + thumbnail!.height).toBeGreaterThan(title!.y);
    expect(arrow!.x).toBeGreaterThan(title!.x + title!.width);
  }
});

test('content, labels and controls stay readable at desktop and phone widths', async ({
  page,
}) => {
  for (const width of [1440, 941, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (const selector of [
      '.about-layout > div > p',
      '.project-copy > p:not(.project-status)',
      '.experience-grid article > p',
      '.thought-card > p:not(.eyebrow)',
    ]) {
      const sizes = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) =>
            parseFloat(getComputedStyle(element).fontSize),
          ),
        );
      expect(
        Math.min(...sizes),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(18);
    }
    for (const selector of [
      '.tag-list li',
      '.project-status',
      '.snapshot ul',
      '.calendar-note',
      '.quote-position',
      '.site-footer',
    ]) {
      const sizes = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) =>
            parseFloat(getComputedStyle(element).fontSize),
          ),
        );
      expect(
        Math.min(...sizes),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(14);
    }
    for (const selector of [
      '.theme-control',
      '.search-trigger',
      '.project-filters button',
      '.photo-strip-controls button',
      '.calendar-note button',
    ]) {
      const heights = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) => element.getBoundingClientRect().height),
        );
      expect(
        Math.min(...heights),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(44);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test('archive copy and metadata use the same readable scale', async ({
  page,
}) => {
  for (const path of [
    '/projects',
    '/projects/cryptalis',
    '/hackathons/svasth',
    '/thoughts/the-next-breakthrough-is-in-another-field',
    '/photography',
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(path);
    const copy = await page
      .locator(
        'main p:not(.eyebrow):not(.content-status):not(.publication-status):not(.project-status):not(.sr-only)',
      )
      .evaluateAll((elements) =>
        elements.map((element) =>
          parseFloat(getComputedStyle(element).fontSize),
        ),
      );
    expect(Math.min(...copy), path).toBeGreaterThanOrEqual(14);
    await page.setViewportSize({ width: 320, height: 720 });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${path} at 320px with doubled text`,
    ).toBeLessThanOrEqual(320);
  }
});

test('section jumps animate only with motion enabled and finish at the right heading', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
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
          Math.abs(
            document.querySelector('#contact')!.getBoundingClientRect().top,
          ) < 100 ||
          scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
      ),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});

test('name scramble preserves word geometry and quote fade keeps the footer still', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const widths: number[][] = [];
  for (let index = 0; index < 5; index++) {
    widths.push(
      await page
        .locator('.name-word')
        .evaluateAll((words) =>
          words.map((word) => word.getBoundingClientRect().width),
        ),
    );
    await page.waitForTimeout(220);
  }
  expect(
    Math.max(...widths.map((item) => item[0]!)) -
      Math.min(...widths.map((item) => item[0]!)),
  ).toBeLessThan(1);
  const quote = page.locator('.quote-text');
  const before = await quote.textContent();
  const footer = await page.locator('.site-footer').boundingBox();
  await page.getByRole('button', { name: 'Next quote' }).click();
  await expect(page.locator('.quote-text')).toHaveAttribute(
    'data-fading',
    'true',
  );
  await expect(page.locator('.quote-text')).not.toHaveText(before!);
  const after = await page.locator('.site-footer').boundingBox();
  expect(Math.abs(footer!.height - after!.height)).toBeLessThan(1);
});

test('collection arrows move the filmstrip without moving the page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#photography').evaluate((section) =>
    window.scrollTo({
      top: section.getBoundingClientRect().top + scrollY - 100,
      behavior: 'instant',
    }),
  );
  const before = await page.evaluate(() => scrollY);
  await page.getByRole('button', { name: 'Next collection' }).click();
  await expect(page.locator('.photo-strip-controls')).toContainText(
    'Landscapes',
  );
  await expect
    .poll(() =>
      page.locator('.photo-strip-track').evaluate((track) => track.scrollLeft),
    )
    .toBeGreaterThan(10);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    2,
  );
});
