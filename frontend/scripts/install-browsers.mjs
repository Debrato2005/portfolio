import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const browserPath = fileURLToPath(
  new URL('../.local/browsers', import.meta.url),
);
const result = spawnSync(
  process.execPath,
  [
    'node_modules/@playwright/test/cli.js',
    'install',
    'chromium',
    'firefox',
    'webkit',
  ],
  {
    stdio: 'inherit',
    timeout: 180_000,
    env: {
      ...process.env,
      PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST:
        process.env.PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST ??
        'https://cdn.playwright.dev',
      PLAYWRIGHT_WEBKIT_DOWNLOAD_HOST:
        process.env.PLAYWRIGHT_WEBKIT_DOWNLOAD_HOST ??
        'https://cdn.playwright.dev',
      PLAYWRIGHT_BROWSERS_PATH: browserPath,
    },
  },
);
if (result.error)
  console.error(
    'Browser installation failed or timed out. Retry after checking network access.',
  );
process.exit(result.status ?? 1);
