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
    await use(page);
  },
});
export { expect };
