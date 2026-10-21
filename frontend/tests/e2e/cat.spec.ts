import { test, expect } from './fixtures';

test('cat sleeps until poked, then chases the pointer and keeps its visibility preference', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const cat = page.locator('.cat-sprite');
  await expect(cat).toHaveCount(1);
  await expect(cat).toHaveAttribute('data-cat-state', 'sleeping');
  const before = await cat.boundingBox();
  await page.mouse.move(1000, 250);
  await expect(cat).toHaveAttribute('data-cat-state', 'sleeping');
  const style = await cat.evaluate((element) => {
    const computed = getComputedStyle(element);
    return { pointerEvents: computed.pointerEvents, cursor: computed.cursor };
  });
  expect(style.pointerEvents).toBe('auto');
  expect(style.cursor).toBe('pointer');
  await cat.click();
  await expect(cat).toHaveAttribute('data-cat-state', 'running');
  await page.mouse.move(1000, 250);
  await expect
    .poll(async () => (await cat.boundingBox())!.x)
    .toBeGreaterThan(before!.x + 30);
  await page.getByRole('button', { name: 'Hide cat' }).click();
  await expect(cat).toHaveCount(0);
  await page.reload();
  await expect(cat).toHaveCount(0);
  await page.getByRole('button', { name: 'Show cat' }).click();
  await expect(cat).toHaveCount(1);
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(cat).toHaveCount(1);
});

test('reduced motion removes the running cat and preserves keyboard control', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.cat-sprite')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Cat resting' }),
  ).toBeDisabled();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
});
