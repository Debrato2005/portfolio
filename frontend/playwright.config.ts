import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= fileURLToPath(
  new URL('./.local/browsers', import.meta.url),
);
// Local browser journeys use direct connections rather than desktop proxy discovery.
if (process.platform === 'linux')
  process.env.GIO_USE_PROXY_RESOLVER ??= 'dummy';
// Keep automated journeys separate from an interactive development preview.
const port = Number(process.env.PORTFOLIO_E2E_PORT ?? 5197);
export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: '**/production.spec.ts',
  outputDir: 'test-results/development',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: `npm run dev -- --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
});
