import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  symlinkSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
if (
  process.platform !== 'linux' ||
  !readFileSync('/etc/os-release', 'utf8').includes('VERSION_ID="24.04"')
) {
  throw new Error(
    'This local library helper supports Ubuntu 24.04. Use Playwright host guidance for other systems.',
  );
}
const packages = [
  'libevent-2.1-7t64=2.1.12-stable-9ubuntu2.2',
  'libgstreamer-plugins-bad1.0-0=1.24.2-1ubuntu4',
];
const downloads = fileURLToPath(
  new URL('../.local/system-debs', import.meta.url),
);
const destination = fileURLToPath(
  new URL('../.local/system-libs', import.meta.url),
);
mkdirSync(downloads, { recursive: true });
mkdirSync(destination, { recursive: true });
if (
  !packages.every((name) =>
    readdirSync(downloads).some(
      (file) =>
        file.startsWith(name.replace('=', '_') + '_') && file.endsWith('.deb'),
    ),
  )
) {
  const download = spawnSync('apt-get', ['download', ...packages], {
    cwd: downloads,
    stdio: 'inherit',
    timeout: 120_000,
  });
  if (download.status !== 0) process.exit(download.status ?? 1);
}
for (const file of readdirSync(downloads).filter((name) =>
  name.endsWith('.deb'),
)) {
  const extracted = spawnSync(
    'dpkg-deb',
    ['--extract', join(downloads, file), destination],
    { stdio: 'inherit' },
  );
  if (extracted.status !== 0) process.exit(extracted.status ?? 1);
}
const browserRoot = fileURLToPath(
  new URL('../.local/browsers', import.meta.url),
);
const libraryRoot = join(destination, 'usr/lib/x86_64-linux-gnu');
const metadata = JSON.parse(
  readFileSync('node_modules/playwright-core/browsers.json', 'utf8'),
);
const revision = metadata.browsers.find(
  (browser) => browser.name === 'webkit',
).revision;
for (const flavor of ['minibrowser-wpe', 'minibrowser-gtk']) {
  const bundledLibraries = join(
    browserRoot,
    `webkit-${revision}`,
    flavor,
    'sys/lib',
  );
  if (!existsSync(bundledLibraries))
    throw new Error('Install the pinned browsers before local library setup.');
  for (const library of readdirSync(libraryRoot).filter((name) =>
    name.includes('.so'),
  )) {
    const link = join(bundledLibraries, library);
    if (!existsSync(link))
      symlinkSync(relative(bundledLibraries, join(libraryRoot, library)), link);
  }
}
console.log(
  'Browser libraries extracted and linked locally. No system packages installed.',
);
