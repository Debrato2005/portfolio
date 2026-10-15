import { defineConfig } from '@playwright/test';
import shared from './playwright.config.ts';
export default defineConfig({
  ...shared,
  testIgnore: [],
  testMatch: '**/production.spec.ts',
  outputDir: 'test-results/production',
  use: { ...shared.use, baseURL: 'http://127.0.0.1:4317' },
  webServer: {
    command: 'npm run preview:e2e',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: false,
  },
});
