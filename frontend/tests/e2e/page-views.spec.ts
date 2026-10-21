import { expect, test } from './fixtures';

const endpoint = 'https://countapi.mileshilliard.com/api/v1/';
const key = 'debrato2005-portfolio-page-views';

test('one document load counts once through StrictMode and home remounts', async ({
  page,
}) => {
  const actions: string[] = [];
  await page.route(`${endpoint}**`, (route) => {
    actions.push(new URL(route.request().url()).pathname.split('/')[3]!);
    return route.fulfill({ json: { key, value: 1234 } });
  });
  await page.goto('/');
  const counter = page.getByRole('group', { name: 'Page views' });
  await expect(counter).toContainText('1,234');
  await page.locator('.thought-card h3 a').click();
  await expect(page).toHaveURL(/\/blogs$/);
  await page.goBack();
  await expect(counter).toContainText('1,234');
  expect(actions).toEqual(['hit']);
  await page.reload();
  await expect(counter).toContainText('1,234');
  expect(actions).toEqual(['hit', 'hit']);
});

test('failed increments show no invented total and retry only reads', async ({
  page,
}) => {
  const actions: string[] = [];
  await page.route(`${endpoint}**`, (route) => {
    const action = new URL(route.request().url()).pathname.split('/')[3]!;
    actions.push(action);
    return action === 'hit'
      ? route.abort()
      : route.fulfill({ json: { key, value: 8 } });
  });
  await page.goto('/');
  const counter = page.getByRole('group', { name: 'Page views' });
  await expect(counter).toContainText('Unavailable');
  await expect(counter.locator('strong')).toHaveText('Unavailable');
  expect(
    (await counter
      .getByRole('button', { name: 'Retry page views' })
      .boundingBox())!.height,
  ).toBeGreaterThanOrEqual(28);
  await counter.getByRole('button', { name: 'Retry page views' }).click();
  await expect(counter.locator('strong')).toHaveText('8');
  expect(actions).toEqual(['hit', 'get']);
});

test('a direct archive load registers one view before the home counter mounts', async ({
  page,
}) => {
  const actions: string[] = [];
  await page.route(`${endpoint}**`, (route) => {
    actions.push(new URL(route.request().url()).pathname.split('/')[3]!);
    return route.fulfill({ json: { key, value: 7 } });
  });
  await page.goto('/blogs');
  await expect.poll(() => actions.length).toBe(1);
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await expect(page.getByRole('group', { name: 'Page views' })).toContainText(
    '7',
  );
  expect(actions).toEqual(['hit']);
});
