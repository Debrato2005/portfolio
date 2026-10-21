import { expect, test } from './fixtures';

test('reduced motion starts with the supplied sketch and preserves saved themes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() =>
    localStorage.setItem('portfolio-theme', 'light'),
  );
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene.locator('img[data-theme="light"]')).toBeVisible();
  await expect(scene.locator('img[data-theme="light"]')).toHaveJSProperty(
    'naturalWidth',
    1672,
  );
  await expect(scene.locator('img[data-theme="light"]')).toHaveAttribute(
    'src',
    /Graphite/,
  );
  await expect(scene.locator('canvas')).toHaveCount(0);
  await page.getByRole('button', { name: /^Theme: Light$/i }).click();
  await expect(scene.locator('img[data-theme="dark"]')).toBeVisible();
  await expect(scene.locator('img[data-theme="dark"]')).toHaveAttribute(
    'src',
    /Solitude/,
  );
  expect(
    await page.evaluate(() => localStorage.getItem('portfolio-theme')),
  ).toBe('dark');
  await expect(page.getByRole('heading', { name: /Debrato/i })).toBeVisible();
});

// Read actual GPU output immediately after a real draw (the drawing buffer need not
// be preserved in production). Instrumentation lives only in the browser test.
async function observeGpu(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    const draws = WebGLRenderingContext.prototype.drawArrays;
    const metrics = {
      draws: 0,
      pixels: [] as number[],
      textures: 0,
      deleted: 0,
    };
    Object.assign(window, { sceneGpu: metrics });
    WebGLRenderingContext.prototype.drawArrays = function (...args) {
      draws.apply(this, args);
      const pixels = new Uint8Array(4);
      this.readPixels(
        Math.floor(this.drawingBufferWidth * 0.62),
        Math.floor(this.drawingBufferHeight * 0.5),
        1,
        1,
        this.RGBA,
        this.UNSIGNED_BYTE,
        pixels,
      );
      metrics.pixels = Array.from(pixels);
      metrics.draws++;
    };
    const create = WebGLRenderingContext.prototype.createTexture;
    WebGLRenderingContext.prototype.createTexture = function () {
      metrics.textures++;
      return create.call(this);
    };
    const remove = WebGLRenderingContext.prototype.deleteTexture;
    WebGLRenderingContext.prototype.deleteTexture = function (value) {
      metrics.deleted++;
      remove.call(this, value);
    };
  });
}
const gpu = (page: import('@playwright/test').Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          sceneGpu: {
            draws: number;
            pixels: number[];
            textures: number;
            deleted: number;
          };
        }
      ).sceneGpu,
  );

async function artworkPixel(
  page: import('@playwright/test').Page,
  theme: 'light' | 'dark',
  color: boolean,
) {
  return page.evaluate(
    async ({ theme, color }) => {
      const host = document.querySelector<HTMLDivElement>('.hero-scene')!;
      const fallback = host.querySelector<HTMLImageElement>(
        `img[data-theme="${theme}"]`,
      )!;
      const image = new Image();
      const colorName =
        theme === 'light'
          ? 'Watercolor Valley Vista with Laptop Traveler'
          : 'Moonlit Mountain Lake Stargazer';
      const colorUrl = performance
        .getEntriesByType('resource')
        .find(
          (entry) =>
            (entry as PerformanceResourceTiming).initiatorType === 'img' &&
            decodeURIComponent(entry.name).includes(colorName),
        )?.name;
      if (color && !colorUrl)
        throw new Error('The corresponding color artwork was not loaded');
      image.src = color ? colorUrl! : fallback.src;
      await image.decode();
      const style = getComputedStyle(host);
      const { width, height } = host.getBoundingClientRect();
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const x = parseFloat(style.getPropertyValue('--scene-x')) / 100;
      const y = parseFloat(style.getPropertyValue('--scene-y')) / 100;
      const canvas = host.querySelector('canvas')!;
      const px =
        ((Math.floor(canvas.width * 0.62) + 0.5) / canvas.width) * width;
      const py =
        ((canvas.height - Math.floor(canvas.height * 0.5) - 0.5) /
          canvas.height) *
        height;
      const out = document.createElement('canvas');
      out.width = 1;
      out.height = 1;
      const ctx = out.getContext('2d')!;
      ctx.drawImage(
        image,
        (width - image.naturalWidth * scale) * x - px + 0.5,
        (height - image.naturalHeight * scale) * y - py + 0.5,
        image.naturalWidth * scale,
        image.naturalHeight * scale,
      );
      return Array.from(ctx.getImageData(0, 0, 1, 1).data);
    },
    { theme, color },
  );
}

for (const theme of ['light', 'dark'] as const) {
  test(`${theme} GPU pixels reveal color, trail, fade back exactly, and stop drawing`, async ({
    page,
  }, testInfo) => {
    await observeGpu(page);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript(
      (value) => localStorage.setItem('portfolio-theme', value),
      theme,
    );
    await page.goto('/');
    const scene = page.locator('.hero-scene');
    await expect(scene).toHaveAttribute('data-renderer', 'webgl');
    const initial = (await gpu(page)).pixels;
    const sketchPixel = await artworkPixel(page, theme, false);
    expect(
      initial.reduce(
        (sum, channel, i) => sum + Math.abs(channel - sketchPixel[i]!),
        0,
      ),
    ).toBeLessThan(10);
    await page.screenshot({ path: testInfo.outputPath(`${theme}-sketch.png`) });
    const box = (await scene.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.62, box.y + box.height * 0.5);
    await expect(scene).toHaveAttribute('data-animating', 'true');
    await expect
      .poll(async () =>
        (await gpu(page)).pixels.reduce(
          (sum, channel, i) => sum + Math.abs(channel - initial[i]!),
          0,
        ),
      )
      .toBeGreaterThan(12);
    const colorPixel = await artworkPixel(page, theme, true);
    const baseDistance = initial.reduce(
      (sum, c, i) => sum + Math.abs(c - colorPixel[i]!),
      0,
    );
    expect(
      (await gpu(page)).pixels.reduce(
        (sum, c, i) => sum + Math.abs(c - colorPixel[i]!),
        0,
      ),
    ).toBeLessThan(baseDistance * 0.35 + 12);
    await page.screenshot({ path: testInfo.outputPath(`${theme}-reveal.png`) });
    // A rapid multi-position stroke should leave a continuous trail, then settle.
    await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.6, {
      steps: 8,
    });
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.38, {
      steps: 8,
    });
    await page.screenshot({ path: testInfo.outputPath(`${theme}-trail.png`) });
    await expect(scene).toHaveAttribute('data-animating', 'false', {
      timeout: 7000,
    });
    expect((await gpu(page)).pixels).toEqual(initial);
    const settled = (await gpu(page)).draws;
    await page.waitForTimeout(180);
    expect((await gpu(page)).draws).toBe(settled);
  });
}

test('WebGL failure keeps the correct static artwork and usable controls', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.startsWith('webgl')) return null;
      return getContext.apply(this, [type, ...args] as Parameters<
        typeof getContext
      >);
    } as typeof getContext;
    localStorage.setItem('portfolio-theme', 'dark');
  });
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'static');
  await expect(scene.locator('img[data-theme="dark"]')).toHaveJSProperty(
    'naturalWidth',
    1672,
  );
  await expect(scene.locator('canvas')).toHaveCount(0);
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
});

test('preference changes and route unmount release all textures and restore cleanly', async ({
  page,
}) => {
  await observeGpu(page);
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(scene.locator('canvas')).toHaveCount(0);
  expect((await gpu(page)).textures).toBe((await gpu(page)).deleted);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  await page.getByRole('link', { name: 'View writing', exact: true }).click();
  await expect(scene).toHaveCount(0);
  expect((await gpu(page)).textures).toBe((await gpu(page)).deleted);
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
});

test('theme switching resets trails and keeps foreground keyboard controls available', async ({
  page,
}) => {
  await observeGpu(page);
  await page.addInitScript(() =>
    localStorage.setItem('portfolio-theme', 'light'),
  );
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  const box = (await scene.boundingBox())!;
  await page.mouse.move(box.width * 0.76, box.y + box.height * 0.45);
  await expect(scene).toHaveAttribute('data-animating', 'true');
  const toggle = page.getByRole('button', {
    name: 'Theme: Light',
    exact: true,
  });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(scene).toHaveAttribute('data-animating', 'false');
  await expect(scene.locator('canvas')).toHaveCSS('opacity', '1');
  await expect(
    page.getByRole('button', { name: 'Theme: Dark', exact: true }),
  ).toBeFocused();
  const expected = await artworkPixel(page, 'dark', false);
  expect(
    (await gpu(page)).pixels.reduce(
      (sum, c, i) => sum + Math.abs(c - expected[i]!),
      0,
    ),
  ).toBeLessThan(10);
  await expect(page.locator('[data-scramble]')).toHaveText('DEBRATO GHOSH');
});

test('mobile touch reveals without taking over scrolling or adding overflow', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  const box = (await scene.boundingBox())!;
  await page.locator('body').dispatchEvent('pointerdown', {
    clientX: 310,
    clientY: box.y + 150,
    pointerId: 3,
    pointerType: 'touch',
    isPrimary: true,
    buttons: 1,
  });
  await expect(scene).toHaveAttribute('data-animating', 'true');
  await page.locator('body').dispatchEvent('pointerup', {
    pointerId: 3,
    pointerType: 'touch',
    isPrimary: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('mobile-touch.png') });
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(scene).toHaveAttribute('data-animating', 'false');
});

test('context loss exposes the static sketch without page errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() =>
    localStorage.setItem('portfolio-theme', 'light'),
  );
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  await scene
    .locator('canvas')
    .evaluate((c) =>
      (c as HTMLCanvasElement)
        .getContext('webgl')
        ?.getExtension('WEBGL_lose_context')
        ?.loseContext(),
    );
  await expect(scene).toHaveAttribute('data-renderer', 'static');
  await expect(scene.locator('canvas')).toHaveCSS('opacity', '0');
  await expect(scene.locator('img[data-theme="light"]')).toHaveJSProperty(
    'naturalWidth',
    1672,
  );
  await page.getByRole('button', { name: 'Theme: Light', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(scene).toHaveAttribute('data-renderer', 'static');
  await expect(scene.locator('canvas')).toHaveCSS('opacity', '0');
  await expect(scene.locator('img[data-theme="dark"]')).toHaveJSProperty(
    'naturalWidth',
    1672,
  );
  expect(errors).toEqual([]);
});

test('a hidden document cancels its trail and resumes without stale color', async ({
  page,
}) => {
  await observeGpu(page);
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect(scene).toHaveAttribute('data-renderer', 'webgl');
  const box = (await scene.boundingBox())!;
  await page.mouse.move(box.width * 0.76, box.y + box.height * 0.45);
  await expect(scene).toHaveAttribute('data-animating', 'true');
  // Exercise Page Visibility's event contract deterministically in every engine.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(scene).toHaveAttribute('data-animating', 'false');
  const count = (await gpu(page)).draws;
  await page.waitForTimeout(150);
  expect((await gpu(page)).draws).toBe(count);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.mouse.move(box.width * 0.77, box.y + box.height * 0.45);
  await expect(scene).toHaveAttribute('data-animating', 'true');
});

test('context loss during image decoding cannot cover the static fallback', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const decode = HTMLImageElement.prototype.decode;
    const pending: (() => void)[] = [];
    Object.assign(window, {
      scenePendingDecodes: pending,
      releaseSceneImages: () =>
        pending.splice(0).forEach((release) => release()),
    });
    HTMLImageElement.prototype.decode = function () {
      return decode
        .call(this)
        .then(() => new Promise<void>((resolve) => pending.push(resolve)));
    };
  });
  await page.goto('/');
  const scene = page.locator('.hero-scene');
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { scenePendingDecodes: unknown[] })
            .scenePendingDecodes.length,
      ),
    )
    .toBe(2);
  await scene.locator('canvas').evaluate(
    (c) =>
      new Promise<void>((resolve) => {
        c.addEventListener('webglcontextlost', () => resolve(), { once: true });
        (c as HTMLCanvasElement)
          .getContext('webgl')!
          .getExtension('WEBGL_lose_context')!
          .loseContext();
      }),
  );
  await page.evaluate(async () => {
    (
      window as unknown as { releaseSceneImages: () => void }
    ).releaseSceneImages();
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await expect(scene).toHaveAttribute('data-renderer', 'static');
  await expect(scene.locator('canvas')).toHaveCSS('opacity', '0');
});
