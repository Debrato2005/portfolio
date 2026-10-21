import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('the homepage owns project depth and section navigation', async ({
  page,
}) => {
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Main' });
  await expect(
    navigation.getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('href', '/#projects');
  await expect(page.locator('.project-card')).toHaveCount(6);

  const cryptalis = page.locator('#project-cryptalis');
  await cryptalis.getByLabel('Open project brief for Cryptalis').click();
  await expect(cryptalis).toContainText('UNKNOWN');
  await expect(
    cryptalis.getByRole('link', { name: 'Cryptalis repository' }),
  ).toHaveAttribute('href', 'https://github.com/Debrato2005/cryptalis');

  await navigation.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator('#projects h2')).toBeFocused();

  const internalDestinations = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(internalDestinations).not.toEqual(
    expect.arrayContaining([
      expect.stringMatching(/^\/projects/),
      expect.stringMatching(/^\/hackathons/),
      expect.stringMatching(/^\/thoughts/),
      expect.stringMatching(/^\/photography\//),
    ]),
  );
});

test('the command palette jumps to inline project detail', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search portfolio' }).click();
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('Project: Cryptalis');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/#project-cryptalis$/);
  const project = page.locator('#project-cryptalis');
  await expect(
    project.getByRole('heading', { name: 'Cryptalis' }),
  ).toBeFocused();
  await expect(project.locator('details')).toHaveAttribute('open', '');
});

test('all six project briefs remain keyboard accessible from the compact overview', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const cards = page.locator('#projects .project-card');
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    const brief = card.locator('summary');
    const details = card.locator('details');
    await expect(details).not.toHaveAttribute('open', '');
    await brief.focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(
      card.getByRole('heading', { name: 'Limits and current status' }),
    ).toBeVisible();
    await brief.focus();
    await page.keyboard.press('Enter');
    await expect(details).not.toHaveAttribute('open', '');
  }
});

test('only the blog and photography archives remain as portfolio routes', async ({
  page,
}) => {
  for (const [path, heading] of [
    ['/blogs', 'Writing archive'],
    ['/photography', 'Through my lens'],
  ] as const) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: heading, exact: true }),
    ).toBeVisible();
  }

  for (const path of [
    '/projects',
    '/projects/cryptalis',
    '/hackathons/svasth',
    '/thoughts',
    '/photography/night-sky',
    '/toolkit',
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true }),
    ).toBeVisible();
  }
});

test('hackathon records stay inline as a plain clothesline list', async ({
  page,
}) => {
  await page.goto('/#hackathons');
  const records = page.getByRole('list', { name: 'Hackathon records' });
  await expect(records.getByRole('listitem')).toHaveCount(5);
  await expect(records).toContainText('SVASTH Hackathon');
  await expect(records).toContainText('Winner — 1st place');
  await expect(records).toContainText('Resume-reported');
  await expect(records.getByRole('button')).toHaveCount(0);
  await expect(records.getByRole('link')).toHaveCount(0);
});

test('the photography archive shows every collection and opens images in a lightbox', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(async () => {
    const modulePath = '/src/features/portfolio/content.ts';
    const content = (await import(/* @vite-ignore */ modulePath)) as {
      photoCollections: { photos: unknown[] }[];
    };
    const src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="teal"/></svg>',
      );
    content.photoCollections[0]!.photos = [
      {
        slug: 'test-frame',
        src,
        width: 40,
        height: 40,
        alt: 'Test night sky frame',
        caption: 'A test-only frame',
      },
    ];
  });

  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await page.getByRole('link', { name: 'Explore photography' }).click();
  await expect(page).toHaveURL('/photography');
  await expect(page.getByRole('region', { name: 'Night sky' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Landscapes' })).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Everyday light' }),
  ).toBeVisible();

  const invoker = page.getByRole('button', {
    name: 'View Test night sky frame',
  });
  await invoker.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(invoker).toBeFocused();
});
