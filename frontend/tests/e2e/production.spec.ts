import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

test('production serves the homepage and excludes development controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Debrato Ghosh', exact: true, level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Development toolkit' }),
  ).toHaveCount(0);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});

test('production reloads the homepage, 404s retired routes and serves the PDF', async ({
  page,
}) => {
  await page.goto('/');
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Debrato Ghosh', exact: true, level: 1 }),
  ).toBeVisible();
  for (const path of [
    '/toolkit',
    '/blogs',
    '/photography',
    '/projects/smolink',
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: 'This page was never printed.' }),
    ).toBeVisible();
  }
  const pdf = await page.request.get('/Debrato-Ghosh-Resume.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
