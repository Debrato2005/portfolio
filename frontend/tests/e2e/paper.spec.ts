import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

const name = { name: 'Debrato Ghosh', exact: true, level: 1 } as const;

async function axe(page: import('@playwright/test').Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  return result.violations.map((violation) => ({
    id: violation.id,
    targets: violation.nodes.map((node) => node.target.join(' ')),
  }));
}

test('day and night desks have no automated WCAG A or AA violations', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  await expect(page.getByRole('heading', name)).toBeVisible();
  expect(await axe(page)).toEqual([]);
  await page.getByRole('button', { name: /Switch to night/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await axe(page)).toEqual([]);
});

test('the theme choice survives a reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: /Switch to night/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(
    page.getByRole('button', { name: /Switch to day/ }),
  ).toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`the file fits a ${width}px viewport without sideways scroll`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', name)).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('the content matches the resume and GitHub profile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const main = page.getByRole('main');
  for (const fact of [
    'CGPA 8.66 / 10',
    'aiRender Technology Pvt. Ltd.',
    'Madtales.ai',
    'Kapol Vidyanidhi International School, Mumbai',
    'PAV Head — PRISM',
    'Processed 300+ astronomical frames',
    'Nginx',
    'Pydantic',
  ])
    await expect(main.getByText(fact, { exact: false }).first()).toBeVisible();
  await expect(main.getByText('TypeScript', { exact: true })).toHaveCount(0);
  await expect(main.getByText(/NASA Space Apps|HackCBS|SVASTH/)).toHaveCount(0);
  await expect(page.locator('a[href*="bearblog"]')).toHaveCount(0);
});

test('divider tabs move to the section and focus its heading', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Sections' })
    .getByRole('link', { name: 'Experience' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Experience', level: 2 }),
  ).toBeFocused();
  await expect(page).toHaveURL(/#experience$/);
});

test('the phone contents menu opens, navigates and closes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Contents' }).click();
  await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page
    .getByRole('navigation', { name: 'Contents', exact: true })
    .getByRole('link', { name: /Contact/ })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Contact', level: 2 }),
  ).toBeFocused();
  await expect(page.getByRole('button', { name: 'Contents' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('project cards open as a dialog and return focus when closed', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#work');
  await expect(page.locator('.index-card')).toHaveCount(6);
  const card = page.getByRole('button', { name: /Smolink/ });
  await card.click();
  const dialog = page.getByRole('dialog', { name: 'Smolink' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Argon2id', { exact: false })).toBeVisible();
  await expect(
    dialog.getByRole('link', { name: /View on GitHub/ }),
  ).toHaveAttribute('href', 'https://github.com/Debrato2005/smolink');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
  await page.getByRole('button', { name: /OncoSyn/ }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'OncoSyn' })
      .getByText('No public repository yet'),
  ).toBeVisible();
});

test('GitHub shows live profile counts and an honest empty calendar', async ({
  page,
}) => {
  await page.goto('/#github');
  const github = page.locator('#github');
  await expect(github.getByText('18', { exact: true })).toBeVisible();
  await expect(github.getByText('Calendar unavailable')).toBeVisible();
  await expect(github.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(github.locator('.graph-plot rect')).toHaveCount(0);
});

test('the back cover shows the page-view count', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.back-views')).toContainText(
    'This file has been opened 42 times',
  );
});

test('reduced motion leaves every sheet visible without scrolling', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/reveal-ready/);
  for (const node of await page.locator('[data-reveal]').all())
    await expect(node).toHaveCSS('opacity', '1');
});

test('unknown addresses show the misprint page', async ({ page }) => {
  await page.goto('/blogs');
  await expect(
    page.getByRole('heading', { name: 'This page was never printed.' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to the first page' }).click();
  await expect(page.getByRole('heading', name)).toBeVisible();
});
