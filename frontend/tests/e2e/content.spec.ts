import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('archive filters survive a case-study visit and browser back', async ({
  page,
}) => {
  await page.goto('/projects');
  await expect(
    page.getByRole('heading', { name: 'Project archive', exact: true }),
  ).toBeFocused();
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Applications', exact: true }).click();
  await expect(page).toHaveURL(/work=Applications/);
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('link', { name: 'UniSpace', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'UniSpace', exact: true }),
  ).toBeFocused();
  await page.goBack();
  await expect(
    page.getByRole('button', { name: 'Applications', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
});

test('case studies expose sources, limitations and adjacent projects after reload', async ({
  page,
}) => {
  await page.goto('/projects/cryptalis');
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Cryptalis', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Limits and current status' }),
  ).toContainText('UNKNOWN');
  await expect(
    page.getByRole('region', { name: 'Sources' }).getByRole('link'),
  ).toHaveAttribute('href', 'https://github.com/Debrato2005/cryptalis');
  await page.getByRole('link', { name: /Next project: Smolink/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Smolink', exact: true }),
  ).toBeFocused();
  await page.getByRole('link', { name: /Previous project: Cryptalis/ }).click();
  await page.getByRole('link', { name: 'Back to project archive' }).click();
  await expect(page).toHaveURL('/projects');
  await page.goto('/projects/oncosyn');
  await expect(page.getByRole('main')).toContainText(
    'No public repository or demo is currently linked.',
  );
  await expect(
    page.getByRole('link', { name: 'View repository', exact: true }),
  ).toHaveCount(0);
});

test('hackathon archive opens sourced detail without invented event media', async ({
  page,
}) => {
  await page.goto('/hackathons');
  await page
    .getByRole('link', { name: 'SVASTH Hackathon', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'SVASTH Hackathon', exact: true }),
  ).toBeFocused();
  await expect(page.getByRole('main')).toContainText(
    '1st place — resume-reported',
  );
  await expect(page.getByRole('main')).toContainText(
    'Official evidence pending',
  );
  await expect(page.getByRole('main').getByRole('img')).toHaveCount(0);
  await expect(page.getByRole('main')).toContainText(
    'Source: original owner-supplied resume.',
  );
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Owner-supplied resume' }),
  ).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to hackathon archive' }).click();
  await expect(
    page.getByRole('heading', { name: 'Hackathons', exact: true }),
  ).toBeFocused();
});

test('writing archive opens an editorial introduction with the original publication', async ({
  page,
}) => {
  await page.goto('/thoughts');
  await page
    .getByRole('link', {
      name: 'The next breakthrough is in another field',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('heading', {
      name: 'The next breakthrough is in another field',
      exact: true,
    }),
  ).toBeFocused();
  await expect(
    page.getByRole('link', { name: 'Read on Bear Blog' }),
  ).toHaveAttribute(
    'href',
    'https://debrato.bearblog.dev/the-next-breakthrough-is-in-another-field/',
  );
  await expect(page.getByRole('main')).toContainText(
    'Publication date not verified',
  );
  await page.getByRole('link', { name: 'Back to writing archive' }).click();
  await expect(
    page.getByRole('heading', { name: 'Train of Thought', exact: true }),
  ).toBeFocused();
});

test('unknown content slugs recover to the relevant archive', async ({
  page,
}) => {
  for (const [path, recovery, destination] of [
    ['/projects/missing-project', 'Back to project archive', '/projects'],
    ['/hackathons/missing-event', 'Back to hackathon archive', '/hackathons'],
    ['/thoughts/missing-article', 'Back to writing archive', '/thoughts'],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'not found',
    );
    await page.getByRole('link', { name: recovery, exact: true }).click();
    await expect(page).toHaveURL(destination);
  }
});
