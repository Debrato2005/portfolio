import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH = new URL(
  '../../../.local/browsers',
  import.meta.url,
).pathname;
const folder = 'docs/references/sketch-to-color';
await mkdir(folder, { recursive: true });
const browser = await chromium.launch();
const report = {
  browser: browser.version(),
  node: process.version,
  baseURL: 'http://127.0.0.1:5187',
  providerMode:
    'Counter intercepted at 42; profile/calendar requests deliberately unavailable. No public mutations.',
  cases: [],
  timing: [],
  errors: [],
  networkErrors: [],
};
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (e) => report.errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') {
    if (m.text().includes('Failed to load resource'))
      report.networkErrors.push(m.text());
    else report.errors.push(m.text());
  }
});
await page.route('https://countapi.mileshilliard.com/**', (r) =>
  r.fulfill({ json: { key: 'debrato2005-portfolio-page-views', value: 42 } }),
);
await page.route('https://api.github.com/**', (r) => r.abort());
await page.route('https://github-contributions-api.jogruber.de/**', (r) =>
  r.abort(),
);
await page.addInitScript(() => {
  localStorage.setItem('portfolio-theme', 'light');
  localStorage.setItem('portfolio-cat', 'hidden');
  const draw = WebGLRenderingContext.prototype.drawArrays;
  window.sceneFrames = [];
  WebGLRenderingContext.prototype.drawArrays = function (...args) {
    draw.apply(this, args);
    window.sceneFrames.push(performance.now());
  };
});
await page.goto(report.baseURL);
await expect(page.locator('.hero-scene')).toHaveAttribute(
  'data-renderer',
  'webgl',
);
await expect(page.locator('[data-scramble]')).toHaveText('DEBRATO GHOSH');
async function capture(name) {
  const geometry = await page.evaluate(() => ({
    viewport: [innerWidth, innerHeight],
    scrollWidth: document.documentElement.scrollWidth,
    hero: document.querySelector('.hero').getBoundingClientRect().toJSON(),
    canvas: [
      document.querySelector('.hero-scene canvas')?.width,
      document.querySelector('.hero-scene canvas')?.height,
    ],
    renderer: document.querySelector('.hero-scene').dataset.renderer,
  }));
  await page.screenshot({ path: `${folder}/${name}.png` });
  report.cases.push({ name, ...geometry });
}
async function choose(theme) {
  for (
    let i = 0;
    i < 3 && (await page.locator('html').getAttribute('data-theme')) !== theme;
    i++
  ) {
    await page.locator('.theme-control').click();
    await page.waitForTimeout(550);
  }
  await expect(page.locator('.hero-scene canvas')).toHaveCSS('opacity', '1');
  await page.waitForTimeout(320);
}
for (const theme of ['light', 'dark']) {
  await choose(theme);
  await capture(`${theme}-sketch`);
  const box = await page.locator('.hero-scene').boundingBox();
  await page.mouse.move(1090, box.y + box.height * 0.45);
  await page.waitForTimeout(100);
  await capture(`${theme}-reveal`);
  await page.mouse.move(850, box.y + box.height * 0.55, { steps: 20 });
  await page.mouse.move(1180, box.y + box.height * 0.3, { steps: 20 });
  await capture(`${theme}-trail`);
  await expect(page.locator('.hero-scene')).toHaveAttribute(
    'data-animating',
    'false',
    { timeout: 8000 },
  );
  await capture(`${theme}-faded`);
  await page.evaluate(() => (window.sceneFrames = []));
  await page.mouse.move(1095, box.y + box.height * 0.46);
  await expect(page.locator('.hero-scene')).toHaveAttribute(
    'data-animating',
    'false',
    { timeout: 8000 },
  );
  const frames = await page.evaluate(() => window.sceneFrames);
  const intervals = frames
    .slice(1)
    .map((t, i) => t - frames[i])
    .filter((t) => t > 0 && t < 200)
    .sort((a, b) => a - b);
  const idleBefore = frames.length;
  await page.waitForTimeout(180);
  const idleAfter = await page.evaluate(() => window.sceneFrames.length);
  report.timing.push({
    theme,
    draws: frames.length,
    medianFrameIntervalMs: intervals[Math.floor(intervals.length * 0.5)],
    p95FrameIntervalMs: intervals[Math.floor(intervals.length * 0.95)],
    idleExtraDraws: idleAfter - idleBefore,
    limit:
      'Local headless software/GPU scheduling, not a field or physical-device frame rate',
  });
}
for (const [width, height, theme] of [
  [941, 1000, 'light'],
  [1920, 1080, 'dark'],
  [768, 1024, 'light'],
  [390, 844, 'light'],
  [390, 844, 'dark'],
  [320, 844, 'dark'],
]) {
  await page.setViewportSize({ width, height });
  await choose(theme);
  await capture(`${theme}-${width}`);
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.emulateMedia({ reducedMotion: 'reduce' });
await expect(page.locator('.hero-scene canvas')).toHaveCount(0);
await capture('reduced-motion');
await page.emulateMedia({ reducedMotion: 'no-preference' });
await expect(page.locator('.hero-scene')).toHaveAttribute(
  'data-renderer',
  'webgl',
);
await page
  .locator('.hero-scene canvas')
  .evaluate((c) =>
    c.getContext('webgl').getExtension('WEBGL_lose_context').loseContext(),
  );
await expect(page.locator('.hero-scene')).toHaveAttribute(
  'data-renderer',
  'static',
);
await capture('context-loss');
report.sourceHashes = {};
for (const path of [
  'src/features/portfolio/BackgroundScene.tsx',
  'src/features/portfolio/sceneArtwork.ts',
  'src/features/portfolio/sceneRenderer.ts',
  'src/features/portfolio/sceneShaders.ts',
  'src/styles/background-scene.css',
  'src/routes/HomePage.tsx',
  'bg/Graphite Mountain Lake Overlook.png',
  'bg/Watercolor Valley Vista with Laptop Traveler.png',
  'bg/Moonlit Mountain Solitude.png',
  'bg/Moonlit Mountain Lake Stargazer.png',
])
  report.sourceHashes[path] = createHash('sha256')
    .update(await readFile(path))
    .digest('hex');
await writeFile(
  `${folder}/verification.json`,
  JSON.stringify(report, null, 2) + '\n',
);
console.log(
  JSON.stringify({
    cases: report.cases.length,
    timing: report.timing,
    errors: report.errors,
    expectedUnavailableProviderErrors: report.networkErrors.length,
  }),
);
await browser.close();
