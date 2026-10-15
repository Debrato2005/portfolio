import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
for (const [source, entry] of Object.entries(manifest)) {
  if (/fixtures|toolkit|qrcode|day-picker/i.test(source + entry.file)) {
    throw new Error(`Development module in production: ${source}`);
  }
}
for (const file of await readdir('dist/assets')) {
  if (file.endsWith('.js')) {
    const content = await readFile(join('dist/assets', file), 'utf8');
    if (
      content.includes('PORTFOLIO_DEV_FIXTURE_ONLY') ||
      content.includes('Development toolkit') ||
      content.includes('GITHUB_TOKEN') ||
      content.includes('api.github.com/graphql')
    ) {
      throw new Error(
        `Development fixture or server-only code in production: ${file}`,
      );
    }
  }
}
console.log(
  'Production boundary passed: development toolkit and QR fixtures excluded.',
);
