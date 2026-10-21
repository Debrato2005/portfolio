import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
process.env.PLAYWRIGHT_BROWSERS_PATH = `${process.cwd()}/.local/browsers`;
const browser = await chromium.launch();
const cases = [];
const dir = 'output/playwright/mono-2026-10-18/final';
try {
  for (const route of ['blogs', 'photography'])
    for (const [width, theme, text] of [
      [1440, 'dark', 100],
      [390, 'light', 100],
      [320, 'dark', 200],
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
      page.on('pageerror', (e) => errors.push(e.message));
      await page.route('https://**/*', (r) => r.abort());
      await page.goto(`http://127.0.0.1:5187/${route}`);
      await page.evaluate(() => document.fonts.ready);
      if (text !== 100)
        await page.addStyleTag({ content: `html{font-size:${text}%}` });
      const result = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        titleFont: getComputedStyle(document.querySelector('main h1'))
          .fontFamily,
        bodyFont: getComputedStyle(document.querySelector('main .intro'))
          .fontFamily,
        titleSize: getComputedStyle(document.querySelector('main h1')).fontSize,
        bodySize: getComputedStyle(document.querySelector('main .intro'))
          .fontSize,
      }));
      await page.screenshot({
        path: `${dir}/${route}-${width}-${theme}-${text}.png`,
        fullPage: true,
      });
      cases.push({ route, width, theme, text, errors, ...result });
      await context.close();
    }
} finally {
  await browser.close();
}
await writeFile(
  `${dir}/archive-verification.json`,
  JSON.stringify({ capturedAt: new Date().toISOString(), cases }, null, 2),
);
console.log(cases);
