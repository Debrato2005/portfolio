import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

function payload(year: number) {
  const now = new Date();
  const end =
    year === now.getUTCFullYear()
      ? Date.UTC(year, now.getUTCMonth(), now.getUTCDate())
      : Date.UTC(year, 11, 31);
  const days = Array.from(
    { length: (end - Date.UTC(year, 0, 1)) / 86400000 + 1 },
    (_, i) => ({
      date: new Date(Date.UTC(year, 0, 1) + i * 86400000)
        .toISOString()
        .slice(0, 10),
      count: i === 0 ? 3 : 0,
      level: i === 0 ? 2 : 0,
    }),
  );
  return {
    total: { [year]: 3 },
    contributions: days,
  };
}
test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('unavailable calendar remains keyboard accessible at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await expect(
    page.getByRole('img', { name: /daily counts unavailable/ }),
  ).toBeVisible();
  await page.getByRole('combobox', { name: 'Contribution year' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('.calendar-scroll')).toBeFocused();
  const audit = await new AxeBuilder({ page })
    .include('.calendar-panel')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test('independent provider failures do not claim a live calendar or a known rate limit', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('img', { name: /daily counts unavailable/ }),
  ).toBeVisible();
  const profileStatus = page.getByRole('status', {
    name: 'GitHub profile status',
  });
  await expect(
    profileStatus.getByRole('button', { name: 'Retry profile' }),
  ).toBeVisible();
  await expect(profileStatus).not.toContainText(
    /calendar remains live|limited this profile/i,
  );
  await expect(profileStatus).toContainText(/unavailable/i);
});
test('validated relay payload supports seven rows, keyboard, hover, touch and year navigation', async ({
  page,
}) => {
  await page.route(
    'https://github-contributions-api.jogruber.de/v4/Debrato2005?*',
    (route) =>
      route.fulfill({
        json: payload(
          Number(new URL(route.request().url()).searchParams.get('y')),
        ),
      }),
  );
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Explore daily contributions' })
    .click();
  const year = new Date().getUTCFullYear();
  const first = page.getByRole('button', {
    name: `3 contributions on January 1, ${year}`,
  });
  await expect(first).toBeVisible();
  await expect(page.locator('.calendar-grid')).toHaveCSS(
    'grid-template-rows',
    /(?:\S+ ){6}\S+/,
  );
  await first.focus();
  await expect(
    page.getByRole('status', { name: 'Selected contribution day' }),
  ).toContainText('3 contributions on January 1');
  await first.press('ArrowDown');
  await expect(
    page.getByRole('button', { name: `0 contributions on January 2, ${year}` }),
  ).toBeFocused();
  await first.hover();
  await expect(
    page.getByRole('status', { name: 'Selected contribution day' }),
  ).toContainText('3 contributions on January 1');
  await first.dispatchEvent('pointerdown', { pointerType: 'touch' });
  await expect(
    page.getByRole('status', { name: 'Selected contribution day' }),
  ).toContainText('3 contributions on January 1');
  await page
    .getByRole('combobox', { name: 'Contribution year' })
    .selectOption(String(year - 1));
  await expect(
    page.getByRole('button', {
      name: `3 contributions on January 1, ${year - 1}`,
    }),
  ).toBeVisible();
});
test('unavailable data remains unknown and retry can recover', async ({
  page,
}) => {
  let available = false;
  await page.route(
    'https://github-contributions-api.jogruber.de/v4/Debrato2005?*',
    (route) =>
      available
        ? route.fulfill({
            json: payload(
              Number(new URL(route.request().url()).searchParams.get('y')),
            ),
          })
        : route.fulfill({ status: 503, json: { error: 'Unavailable' } }),
  );
  await page.goto('/');
  await expect(
    page.getByRole('img', { name: /daily counts unavailable/ }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /^0 contributions on/ }),
  ).toHaveCount(0);
  available = true;
  await page.getByRole('button', { name: 'Retry contribution data' }).click();
  await page
    .getByRole('button', { name: 'Explore daily contributions' })
    .click();
  await expect(
    page.getByRole('button', { name: /^3 contributions on January 1/ }),
  ).toBeVisible();
});
test('a late response for the old year cannot replace the selected year', async ({
  page,
}) => {
  const year = new Date().getUTCFullYear();
  await page.route(
    'https://github-contributions-api.jogruber.de/v4/Debrato2005?*',
    async (route) => {
      const selected = Number(
        new URL(route.request().url()).searchParams.get('y'),
      );
      if (selected === year)
        await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({ json: payload(selected) });
    },
  );
  await page.goto('/');
  await page
    .getByRole('combobox', { name: 'Contribution year' })
    .selectOption(String(year - 1));
  await page
    .getByRole('button', { name: 'Explore daily contributions' })
    .click();
  await expect(
    page.getByRole('button', {
      name: `3 contributions on January 1, ${year - 1}`,
    }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  await expect(
    page.getByRole('button', { name: `3 contributions on January 1, ${year}` }),
  ).toHaveCount(0);
});

test('populated calendar has accessible targets and stays within a narrow page at double text size', async ({
  page,
}) => {
  await page.route(
    'https://github-contributions-api.jogruber.de/v4/Debrato2005?*',
    (route) =>
      route.fulfill({
        json: payload(
          Number(new URL(route.request().url()).searchParams.get('y')),
        ),
      }),
  );
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Explore daily contributions' }),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .include('.calendar-panel')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page
    .getByRole('button', { name: 'Explore daily contributions' })
    .click();
  await expect(
    page.getByRole('button', { name: /^3 contributions on January 1/ }),
  ).toBeVisible();
  const expanded = await new AxeBuilder({ page })
    .include('.calendar-panel')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(expanded.violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.locator('.contribution-total span').evaluateAll((labels) =>
      labels.every((label) => {
        const range = document.createRange();
        range.selectNodeContents(label);
        return (
          range.getBoundingClientRect().right <=
          label.parentElement!.getBoundingClientRect().right + 1
        );
      }),
    ),
  ).toBe(true);
  await page.locator('.calendar-panel').screenshot({
    path: `/tmp/portfolio-calendar-320-${test.info().project.name}.png`,
  });
});
