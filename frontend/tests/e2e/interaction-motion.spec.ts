import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (route) => route.abort());
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 100));
});

test('enabling reduced motion resolves a running name scramble immediately', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.clock.runFor(120);
  expect(await page.locator('[data-scramble]').textContent()).not.toBe(
    'DEBRATO GHOSH',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.runFor(20);
  expect(await page.locator('[data-scramble]').textContent()).toBe(
    'DEBRATO GHOSH',
  );
});

test('changing motion preferences keeps quotes paused until explicit play', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.locator('.quotes').scrollIntoViewIfNeeded();
  await page.clock.runFor(50);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(
    page.getByRole('button', { name: 'Play quotes' }),
  ).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.getByRole('button', { name: 'Play quotes' })).toBeEnabled();
  const before = await page.locator('.quote-text').textContent();
  await page.clock.runFor(8500);
  await expect(page.locator('.quote-text')).toHaveText(before ?? '');
  await page.getByRole('button', { name: 'Play quotes' }).click();
  await page.clock.runFor(8500);
  await expect(page.locator('.quote-text')).not.toHaveText(before ?? '');
});

test('focusing a quote source cancels its pending automatic change', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.locator('.quotes').scrollIntoViewIfNeeded();
  await page.clock.runFor(50);
  const quote = page.locator('.quote-text');
  const before = await quote.textContent();
  await page.clock.runFor(8000);
  await expect(quote).toHaveAttribute('data-fading', 'true');
  const source = quote.getByRole('link');
  await source.focus();
  await page.clock.runFor(300);
  await expect(quote).toHaveText(before ?? '');
  await expect(source).toBeFocused();
  await expect(quote).toHaveAttribute('data-fading', 'false');
  await expect(page.getByRole('button', { name: 'Play quotes' })).toBeVisible();
});

test('pausing a quote during its fade keeps the current quote visible', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.locator('.quotes').scrollIntoViewIfNeeded();
  await page.clock.runFor(50);
  await page.getByRole('button', { name: 'Pause quotes' }).focus();
  const play = page.getByRole('button', { name: 'Play quotes' });
  await play.click();
  const quote = page.locator('.quote-text');
  const before = await quote.textContent();
  await page.clock.runFor(8050);
  await expect(quote).toHaveAttribute('data-fading', 'true');
  await page.getByRole('button', { name: 'Pause quotes' }).click();
  await page.clock.runFor(300);
  await expect(quote).toHaveText(before ?? '');
  await expect(quote).toHaveAttribute('data-fading', 'false');
});
