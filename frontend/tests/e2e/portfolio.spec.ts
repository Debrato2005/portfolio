import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('larger project cards keep a coherent responsive grid', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const tops = await page
    .locator('.project-card')
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().top),
    );
  expect(tops).toHaveLength(4);
  expect(Math.abs(tops[0]! - tops[1]!)).toBeLessThan(1);
  expect(Math.abs(tops[2]! - tops[3]!)).toBeLessThan(1);
  expect(tops[2]!).toBeGreaterThan(tops[0]!);
  await page.setViewportSize({ width: 390, height: 844 });
  const narrow = await page
    .locator('.project-card')
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().top),
    );
  expect(narrow[1]! > narrow[0]!).toBe(true);
});

test('project engineering notes reveal sourced detail with the keyboard', async ({
  page,
}) => {
  await page.goto('/');
  const card = page.locator('.project-card').filter({ hasText: 'Cryptalis' });
  const notes = card.getByLabel('Engineering notes for Cryptalis');
  await notes.focus();
  await page.keyboard.press('Enter');
  await expect(card.getByText('Architecture', { exact: true })).toBeVisible();
  await expect(
    card.getByRole('link', { name: 'Cryptalis repository' }),
  ).toHaveAttribute('href', 'https://github.com/Debrato2005/cryptalis');
  await notes.focus();
  await page.keyboard.press('Enter');
  await expect(card.getByText('Architecture', { exact: true })).toBeHidden();
  await expect(
    page
      .locator('.project-card')
      .filter({ hasText: 'OncoSyn' })
      .getByRole('link', { name: /repository/i }),
  ).toHaveCount(0);
});

test('GitHub profile shows actual response counts and an explicitly unavailable calendar', async ({
  page,
}) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.fulfill({
      json: {
        login: 'Debrato2005',
        public_repos: 0,
        followers: 17,
        following: 8,
      },
    }),
  );
  await page.goto('/');
  await expect(
    page.getByRole('group', { name: 'Public repositories' }),
  ).toContainText('0');
  await expect(page.getByRole('group', { name: 'Followers' })).toContainText(
    '17',
  );
  await expect(
    page.getByRole('img', { name: /Contribution calendar.*unavailable/ }),
  ).toBeVisible();
  await page.getByLabel('Contribution year').selectOption('2025');
  await expect(
    page.getByRole('img', { name: /Contribution calendar for 2025/ }),
  ).toBeVisible();
});

test('GitHub profile failure never becomes zero statistics', async ({
  page,
}) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.fulfill({ status: 403, json: { message: 'rate limited' } }),
  );
  await page.goto('/');
  await expect(
    page.getByRole('status', { name: 'GitHub profile status' }),
  ).toContainText('Public profile data is unavailable');
  await expect(page.locator('.github-stats')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Retry profile' }),
  ).toBeVisible();
});

test('GitHub profile retry recovers after a limited request', async ({
  page,
}) => {
  let recover = false;
  await page.route('https://api.github.com/users/Debrato2005', (route) => {
    if (!recover) {
      return route.fulfill({ status: 403, json: { message: 'rate limited' } });
    }
    return route.fulfill({
      json: {
        login: 'Debrato2005',
        public_repos: 12,
        followers: 17,
        following: 8,
      },
    });
  });
  await page.goto('/');
  const retry = page.getByRole('button', { name: 'Retry profile' });
  await expect(retry).toBeVisible();
  recover = true;
  await retry.click();
  await expect(
    page.getByRole('group', { name: 'Public repositories' }),
  ).toContainText('12');
});

test('theme choice persists after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Theme: System' }).click();
  await expect(
    page.getByRole('button', { name: 'Theme: Light' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Theme: Light' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeVisible();
});

test('palette filters and navigates with the keyboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search portfolio' }).focus();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('photography');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#photography h2')).toBeFocused();
  await page.getByRole('button', { name: 'Search portfolio' }).click();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Search portfolio' }),
  ).toBeFocused();
});

test('project filters show matching work and restore all projects', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Research', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(
    page.locator('.project-card').filter({ hasText: 'Smolink' }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'All work' }).click();
  await expect(page.locator('.project-card')).toHaveCount(4);
});

test('photography opens a detail page and supports return navigation', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore photography' }).click();
  await expect(
    page.getByRole('heading', { name: 'Through my lens', exact: true }),
  ).toBeFocused();
  await expect(page.locator('main img')).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to portfolio' }).click();
  await expect(
    page.getByRole('heading', { name: 'DEBRATO GHOSH', exact: true }),
  ).toBeVisible();
});

test('reduced motion shows a stable name and manual quotes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-scramble]')).toHaveText('DEBRATO GHOSH');
  await expect(page.getByRole('button', { name: 'Play quotes' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Play quotes' }),
  ).toBeDisabled();
  const before = await page.locator('.quote-text').textContent();
  await page.getByRole('button', { name: 'Next quote' }).click();
  await expect(page.locator('.quote-text')).not.toHaveText(before ?? '');
  await expect(page.locator('#github')).toContainText(
    'Contribution data is unavailable',
  );
  await expect(page.locator('.view-counter')).toContainText('42');
});

test('keyboard search returns focus to its invoker and keeps selected commands visible', async ({
  page,
}) => {
  await page.goto('/');
  const theme = page.getByRole('button', { name: 'Theme: System' });
  await theme.focus();
  await page.keyboard.press('Control+k');
  for (let index = 0; index < 12; index++)
    await page.keyboard.press('ArrowDown');
  const list = await page.getByRole('listbox').boundingBox();
  const selected = await page
    .getByRole('option', { selected: true })
    .boundingBox();
  expect(
    selected &&
      list &&
      selected.y >= list.y &&
      selected.y + selected.height <= list.y + list.height + 1,
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(theme).toBeFocused();
});

test('quote changes preserve footer geometry on narrow screens and enlarged text', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  for (const size of ['100%', '200%']) {
    await page.addStyleTag({ content: `html { font-size: ${size}; }` });
    const heights: number[] = [];
    for (let index = 0; index < 3; index++) {
      heights.push((await page.locator('.quotes').boundingBox())?.height ?? 0);
      await page.getByRole('button', { name: 'Next quote' }).click();
    }
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
  }
});
