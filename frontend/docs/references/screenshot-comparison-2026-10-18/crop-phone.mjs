import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
process.env.PLAYWRIGHT_BROWSERS_PATH = `${process.cwd()}/.local/browsers`;
const dir = 'output/playwright/side-by-side-2026-10-18';
const v = JSON.parse(await readFile(`${dir}/verification.json`));
const c = v.cases.find((c) => c.width === 320);
const img = `data:image/png;base64,${(await readFile(`${dir}/site-320-dark-200.png`)).toString('base64')}`;
const browser = await chromium.launch();
try {
  for (const [name, box] of [
    ['navigation', { y: 0, height: c.hero.y }],
    ['first-project', c.projects[0]],
    ['contact', c.sections.find((s) => s.id === 'contact')],
  ]) {
    const page = await browser.newPage({
      viewport: { width: 320, height: Math.ceil(box.height) },
    });
    await page.setContent(
      `<body style="margin:0;overflow:hidden"><img src="${img}" style="display:block;transform:translateY(-${box.y}px)"></body>`,
    );
    await page.locator('img').evaluate((e) => e.decode());
    await page.screenshot({ path: `${dir}/phone-${name}.png` });
    await page.close();
  }
} finally {
  await browser.close();
}
