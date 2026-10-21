import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH = `${process.cwd()}/.local/browsers`;
const folder = 'output/playwright/side-by-side-2026-10-18';
await mkdir(folder, { recursive: true });
const references = {
  light:
    '/mnt/c/Users/Debrato/AppData/Local/Temp/codex-clipboard-11d6b050-53c7-4fc1-a421-e513bc41b4fd.png',
  dark: '/mnt/c/Users/Debrato/AppData/Local/Temp/codex-clipboard-2bcba890-2eba-43fe-a518-6198ed9d0317.png',
};
const sourceFiles = [
  'src/main.tsx',
  'src/app/App.tsx',
  'src/routes/HomePage.tsx',
  'src/features/portfolio/Name.tsx',
  'src/features/portfolio/Projects.tsx',
  'src/features/portfolio/Photography.tsx',
  'src/features/portfolio/SectionIndex.tsx',
  'src/features/portfolio/ContributionSection.tsx',
  'src/styles/reference-refinement.css',
  'src/styles/project-cards.css',
  'src/styles/tokens.css',
  'src/styles/contributions.css',
  'src/styles/achievements.css',
];
const sources = {};
for (const file of sourceFiles)
  sources[file] = createHash('sha256')
    .update(await readFile(file))
    .digest('hex');
const browser = await chromium.launch();
const cases = [];
try {
  for (const [width, theme, text] of [
    [941, 'light', 100],
    [941, 'dark', 100],
    [1440, 'light', 100],
    [1440, 'dark', 100],
    [390, 'light', 100],
    [320, 'dark', 200],
    [941, 'light', 150],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    await context.addInitScript(
      (theme) => localStorage.setItem('portfolio-theme', theme),
      theme,
    );
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route(
      'https://countapi.mileshilliard.com/api/v1/**',
      async (route) => {
        if (width < 880 || text !== 100) return route.abort();
        try {
          await route.fulfill({
            response: await route.fetch({
              url: route.request().url().replace('/hit/', '/get/'),
              timeout: 8000,
            }),
          });
        } catch {
          await route.abort();
        }
      },
    );
    if (width < 880 || text !== 100) {
      await page.route('https://api.github.com/**', (r) => r.abort());
      await page.route('https://github-contributions-api.jogruber.de/**', (r) =>
        r.abort(),
      );
    }
    await page.goto('http://127.0.0.1:5187/');
    await page.evaluate(() => document.fonts.ready);
    if (text !== 100)
      await page.addStyleTag({ content: `html {font-size:${text}%}` });
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.evaluate(() =>
      Promise.all(
        [...document.querySelectorAll('.project-image')].map((img) =>
          img.complete
            ? undefined
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              }),
        ),
      ),
    );
    await page.waitForFunction(
      () =>
        !document
          .querySelector('.calendar-note')
          ?.textContent?.includes('Loading') &&
        !document
          .querySelector('[aria-label="GitHub profile status"]')
          ?.textContent?.includes('Loading') &&
        document.querySelector('.view-counter')?.dataset.provider !== 'loading',
      { timeout: 12000 },
    );
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const geometry = await page.evaluate(() => {
      const box = (e) => {
        const b = e.getBoundingClientRect();
        return { x: b.x, y: b.y + scrollY, width: b.width, height: b.height };
      };
      return {
        documentHeight: document.documentElement.scrollHeight,
        documentWidth: document.documentElement.scrollWidth,
        content: box(document.querySelector('.portfolio-content')),
        hero: box(document.querySelector('.hero')),
        index: box(document.querySelector('.section-index')),
        indexPlacement:
          document.querySelector('.section-index').dataset.placement,
        sections: [...document.querySelectorAll('.portfolio-section')].map(
          (e) => ({ id: e.id, ...box(e) }),
        ),
        projects: [...document.querySelectorAll('.project-card')].map((e) => ({
          name: e.querySelector('h3').textContent,
          ...box(e),
        })),
        profile: document.querySelector('.profile-status')?.textContent,
        calendar: document.querySelector('.contribution-layout')?.dataset
          .source,
        counter: document.querySelector('.view-counter')?.dataset.provider,
      };
    });
    const name = `${width}-${theme}-${text}`;
    await page.screenshot({
      path: `${folder}/site-${name}.png`,
      fullPage: true,
    });
    await page
      .locator('#projects')
      .screenshot({ path: `${folder}/projects-${name}.png` });
    cases.push({ width, theme, text, errors, ...geometry });
    await context.close();
  }
  for (const theme of ['light', 'dark']) {
    const reference = await readFile(references[theme]);
    const current = await readFile(`${folder}/site-941-${theme}-100.png`);

    const data = (buffer) =>
      `data:image/png;base64,${buffer.toString('base64')}`;
    const geometry = cases.find(
      (c) => c.width === 941 && c.theme === theme && c.text === 100,
    );
    const cropPage = await browser.newPage();
    for (const id of [
      'hero',
      'about',
      'experience',
      'github',
      'skills',
      'photography',
      'contact',
    ]) {
      const section =
        id === 'hero'
          ? { y: 0, height: geometry.sections[0].y }
          : geometry.sections.find((s) => s.id === id);
      await cropPage.setViewportSize({
        width: 941,
        height: Math.ceil(section.height),
      });
      await cropPage.setContent(
        `<html><body style="margin:0;height:${section.height}px;overflow:hidden"><img src="${data(current)}" style="display:block;width:941px;transform:translateY(-${section.y}px)"></body></html>`,
      );
      await cropPage.locator('img').evaluate((img) => img.decode());
      await cropPage.screenshot({ path: `${folder}/${id}-${theme}.png` });
    }
    await cropPage.close();
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#ddd;color:#111;font:18px Arial}main{display:grid;grid-template-columns:repeat(2,941px);gap:16px;padding:16px;align-items:start}figure{margin:0;background:white}figcaption{height:72px;padding:16px;font-weight:bold;line-height:1.4}img{display:block;width:941px;height:auto}</style></head><body><main><figure><figcaption>SUPPLIED ${theme.toUpperCase()} REFERENCE · 941 px<br>Background excluded from this task</figcaption><img src="${data(reference)}"></figure><figure><figcaption>UPDATED · SAME 941 px VIEWPORT<br>Real portfolio content · six projects</figcaption><img src="${data(current)}"></figure></main></body></html>`;
    await writeFile(`${folder}/comparison-${theme}.html`, html);
    const page = await browser.newPage({
      viewport: { width: 1930, height: 1000 },
    });
    await page.setContent(html);
    await page
      .locator('img')
      .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
    await page.screenshot({
      path: `${folder}/comparison-${theme}.png`,
      fullPage: true,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  `${folder}/verification.json`,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      sources,
      providerBoundary:
        'Desktop reads public profile/calendar and rewrites every counter hit to get. Phone/enlarged captures abort external providers. No fixture counts or personal media and no counter increment are forwarded.',
      cases,
    },
    null,
    2,
  ),
);
console.log(
  cases.map((c) => ({
    width: c.width,
    theme: c.theme,
    text: c.text,
    height: c.documentHeight,
    overflow: c.documentWidth > c.width,
    index: c.indexPlacement,
    projects: c.sections.find((s) => s.id === 'projects').height,
    calendar: c.calendar,
    counter: c.counter,
    errors: c.errors,
  })),
);
