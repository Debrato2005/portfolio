import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (route) => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Search portfolio' }).focus();
  await page.keyboard.press('Control+k');
});

test('opening the palette is ready for typing without an extra click', async ({
  page,
}) => {
  await expect(
    page.getByRole('combobox', { name: 'Search commands' }),
  ).toBeFocused();
  await page.keyboard.type('dark mode');
  await expect(page.getByRole('option')).toHaveCount(1);
});

test('search understands a theme request and applies it with the keyboard', async ({
  page,
}) => {
  const search = page.getByRole('combobox', { name: 'Search commands' });
  await search.fill('dark mode');
  await expect(page.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('pointer selection and Enter activate the same visible command', async ({
  page,
}) => {
  const search = page.getByRole('combobox', { name: 'Search commands' });
  await search.fill('photography');
  const gallery = page.getByRole('option', {
    name: 'Photography gallery',
    exact: true,
  });
  await gallery.hover();
  await expect(gallery).toHaveAttribute('aria-selected', 'true');
  await expect(search).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/photography$/);
  await expect(
    page.getByRole('heading', { name: 'Through my lens', exact: true }),
  ).toBeFocused();
});

test('composing a search query does not accidentally run its command', async ({
  page,
}) => {
  const search = page.getByRole('combobox', { name: 'Search commands' });
  await search.fill('photography');
  await search.dispatchEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    isComposing: true,
    bubbles: true,
  });
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(search).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#photography h2')).toBeFocused();
});

test('typing shortcuts in editable fields keeps the editor focused', async ({
  page,
}) => {
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Search portfolio' }),
  ).toBeFocused();
  await page.evaluate(() => {
    const editor = document.createElement('textarea');
    editor.setAttribute('aria-label', 'Draft note');
    document.querySelector('main')?.prepend(editor);
  });
  const editor = page.getByRole('textbox', { name: 'Draft note' });
  await editor.fill('A work in progress');
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(editor).toBeFocused();
});

test('external commands use native links to the supplied profile', async ({
  page,
  context,
}) => {
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('GitHub profile');
  const github = page.getByRole('option', { name: 'GitHub profile' });
  await expect(github).toHaveAttribute(
    'href',
    'https://github.com/Debrato2005',
  );
  await context.route('https://github.com/Debrato2005', (route) =>
    route.fulfill({ body: 'External profile opened' }),
  );
  await github.click();
  await expect(page).toHaveURL('https://github.com/Debrato2005');
  await expect(page.getByText('External profile opened')).toBeVisible();
});

test('reopening during a close fade cancels the previous pending command', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('dark mode');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Search commands' }),
  ).toHaveValue('');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('enlarged text keeps a matching command visible and usable on a narrow phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  const allCommands = await page.getByRole('listbox').boundingBox();
  const fullPopup = await page.getByRole('dialog').boundingBox();
  expect(allCommands!.height).toBeGreaterThanOrEqual(200);
  await page
    .getByRole('combobox', { name: 'Search commands' })
    .fill('dark mode');
  const selected = page.getByRole('option', {
    name: 'Theme: dark',
    exact: true,
  });
  const bounds = await selected.boundingBox();
  const list = await page.getByRole('listbox').boundingBox();
  const popup = await page.getByRole('dialog').boundingBox();
  const group = await page
    .getByRole('group', { name: 'Appearance' })
    .boundingBox();
  expect(list!.height).toBeGreaterThan(40);
  expect(list!.height).toBeLessThanOrEqual(group!.height + 1);
  expect(popup!.height).toBeLessThan(fullPopup!.height - 60);
  expect(bounds!.y).toBeGreaterThanOrEqual(Math.max(list!.y, popup!.y));
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(
    Math.min(list!.y + list!.height, popup!.y + popup!.height) + 1,
  );
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
