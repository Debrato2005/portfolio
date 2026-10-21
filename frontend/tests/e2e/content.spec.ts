import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('homepage filters preserve every project and inline project evidence', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Applications', exact: true }).click();
  await expect(page).toHaveURL(/work=Applications/);
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'All work', exact: true }).click();

  const cryptalis = page.locator('#project-cryptalis');
  await cryptalis.getByLabel('Open project brief for Cryptalis').click();
  await expect(cryptalis.getByLabel('Limits and current status')).toContainText(
    'UNKNOWN',
  );
  await expect(
    cryptalis.getByLabel('Sources').getByRole('link'),
  ).toHaveAttribute('href', 'https://github.com/Debrato2005/cryptalis');

  const oncosyn = page.locator('#project-oncosyn');
  await oncosyn.getByLabel('Open project brief for OncoSyn').click();
  await expect(oncosyn).toContainText(
    'No public repository or demo is currently linked.',
  );
  await expect(oncosyn.getByRole('link', { name: /repository/i })).toHaveCount(
    0,
  );
});

test('hackathon evidence remains honest and inline', async ({ page }) => {
  await page.goto('/#hackathons');
  const record = page.getByRole('list', { name: 'Hackathon records' });
  await expect(record.getByRole('listitem')).toHaveCount(5);
  await expect(record).toContainText('SVASTH Hackathon');
  await expect(record).toContainText('Winner — 1st place');
  await expect(record).toContainText('Resume-reported');
  await expect(record.locator('.achievement-qualifier')).toHaveCount(1);
  await expect(record.getByRole('img')).toHaveCount(0);
  await expect(record.getByRole('link')).toHaveCount(0);
});

test('writing archive links published work to the original publication', async ({
  page,
}) => {
  await page.goto('/blogs');
  await expect(
    page.getByRole('heading', { name: 'Writing archive', exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole('heading', {
      name: 'The next breakthrough is in another field',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Read original' }),
  ).toHaveAttribute(
    'href',
    'https://debrato.bearblog.dev/the-next-breakthrough-is-in-another-field/',
  );
  await expect(page.getByRole('main')).toContainText(
    'Publication date not verified',
  );
});

test('legacy content addresses are not portfolio routes', async ({ page }) => {
  for (const path of [
    '/projects',
    '/projects/missing-project',
    '/hackathons/missing-event',
    '/thoughts/missing-article',
    '/photography/missing',
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true }),
    ).toBeVisible();
  }
});

test('project filters preserve the current section and keyboard focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(page.locator('#projects h2')).toBeFocused();
  const before = await page.evaluate(() => scrollY);
  const research = page.getByRole('button', { name: 'Research', exact: true });
  await research.click();
  await expect(page).toHaveURL(/\?work=Research#projects$/);
  await expect(research).toBeFocused();
  await expect(page.locator('.project-card h3')).toHaveText([
    'OncoSyn',
    'Cryptalis',
    'OrbitOps',
  ]);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    2,
  );
  const all = page.getByRole('button', { name: 'All work', exact: true });
  await all.click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(all).toBeFocused();
  await expect(page.locator('.project-card')).toHaveCount(6);
});
