import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';
test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('production serves direct routes and excludes development controls', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      name: 'DEBRATO GHOSH',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Development toolkit' }),
  ).toHaveCount(0);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.goto('/toolkit');
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
});

test('production reloads the three approved routes and serves the public PDF', async ({
  page,
}) => {
  for (const [path, heading] of [
    ['/', 'DEBRATO GHOSH'],
    ['/blogs', 'Writing archive'],
    ['/photography', 'Through my lens'],
  ]) {
    await page.goto(path!);
    await page.reload();
    await expect(
      page.getByRole('heading', { name: heading!, exact: true }),
    ).toBeVisible();
  }
  for (const path of [
    '/projects',
    '/projects/smolink',
    '/hackathons/svasth',
    '/thoughts',
    '/photography/night-sky',
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true }),
    ).toBeVisible();
  }
  const pdf = await page.request.get('/Debrato-Ghosh-Resume.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
