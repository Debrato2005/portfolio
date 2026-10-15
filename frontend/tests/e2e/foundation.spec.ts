import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('routes recover and focus the new page heading', async ({ page }) => {
  await page.goto('/missing');
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeFocused();
  await page.getByRole('link', { name: 'Return home' }).click();
  await expect(
    page.getByRole('heading', {
      name: 'DEBRATO GHOSH',
      exact: true,
    }),
  ).toBeFocused();
});
test('home has no automated WCAG A or AA violations', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({
    path: `output/playwright/home-${testInfo.project.name}-desktop.png`,
    fullPage: true,
  });
});
test('content reflows at 320px and 200 percent text size', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.screenshot({
    path: `output/playwright/home-${testInfo.project.name}-mobile.png`,
    fullPage: true,
  });
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test('development primitives support dialog keyboard recovery and calendar selection', async ({
  page,
}) => {
  await page.goto('/toolkit');
  await expect(
    page.getByRole('heading', { name: 'Development toolkit', exact: true }),
  ).toBeFocused();
  await page.getByRole('button', { name: 'Open example dialog' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Open example dialog' }),
  ).toBeFocused();
  await page
    .getByRole('button', { name: /Tuesday, October 13th, 2026/ })
    .click();
  await expect(
    page.getByRole('status', { name: 'Selected date' }),
  ).toContainText('2026-10-13');
  await expect(
    page.getByRole('img', { name: 'Development QR fixture' }),
  ).toBeVisible();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});
