import { test as base, expect } from '@playwright/test';

// Browser journeys never add real views or depend on external service availability.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('https://countapi.mileshilliard.com/api/v1/**', (route) =>
      route.fulfill({
        json: { key: 'debrato2005-portfolio-page-views', value: 42 },
      }),
    );
    await page.route(
      'https://github-contributions-api.jogruber.de/v4/Debrato2005**',
      (route) => route.abort(),
    );
    await page.route('https://api.github.com/users/Debrato2005', (route) =>
      route.fulfill({
        json: {
          login: 'Debrato2005',
          public_repos: 18,
          followers: 21,
          following: 4,
        },
      }),
    );
    await use(page);
  },
});
export { expect };
