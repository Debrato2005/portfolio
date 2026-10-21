import { expect, test } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/users/Debrato2005', (route) =>
    route.abort(),
  );
});

test('the interface loads one local JetBrains Mono face and keeps prose readable', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const typography = await page.evaluate(() => {
    const roles = [
      '.site-header nav a',
      '.hero h1',
      '.section-heading h2',
      '.project-card h3',
      '.quiet-button',
      '.tag-list li',
      '.project-status',
    ];
    return {
      faces: [...document.fonts]
        .filter((face) => face.status === 'loaded')
        .map((face) => face.family.replaceAll('"', '')),
      roles: roles.map((selector) => ({
        selector,
        family: getComputedStyle(document.querySelector(selector)!).fontFamily,
      })),
      prose: getComputedStyle(document.querySelector('.about-layout .prose')!)
        .fontFamily,
      fontRequests: performance
        .getEntriesByType('resource')
        .map((entry) => entry.name)
        .filter((name) => /\.(woff2?|ttf)(\?|$)/.test(name)),
    };
  });
  expect(typography.faces).toContain('JetBrains Mono');
  expect(typography.faces).toContain('Inter');
  expect(typography.faces).toContain('Caveat');
  for (const role of typography.roles)
    expect(role.family, role.selector).toContain('JetBrains Mono');
  expect(typography.prose).toContain('Inter');
  // WebKit can report preload and CSS entries for the same font URL.
  expect(new Set(typography.fontRequests).size).toBe(3);
  expect(
    typography.fontRequests.every((url) =>
      new URL(url).pathname.startsWith('/fonts/'),
    ),
  ).toBe(true);
  const font = await page.request.get(
    '/fonts/jetbrains-mono-latin-variable.woff2',
  );
  expect(font.status()).toBe(200);
  expect((await font.body()).subarray(0, 4).toString()).toBe('wOF2');
});

test('each section uses one hatched title band and the desktop index labels fit', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1760, height: 800 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const rules = await page
    .locator('.portfolio-section')
    .evaluateAll((sections) =>
      sections.map((section) => {
        const heading = section.querySelector('h2')!.getBoundingClientRect();
        const rule = section
          .querySelector('.section-line')!
          .getBoundingClientRect();
        const band = section.querySelector('.section-heading')!;
        const pseudo = getComputedStyle(band, '::before');
        const bandBox = band.getBoundingClientRect();
        return {
          borderTop: parseFloat(pseudo.borderTopWidth),
          borderBottom: parseFloat(pseudo.borderBottomWidth),
          bandWidth: bandBox.width,
          hatched: pseudo.backgroundImage.includes('repeating-linear-gradient'),
          gap: rule.left - heading.right,
          width: rule.width,
          verticalOffset:
            rule.top + rule.height / 2 - (heading.top + heading.height / 2),
        };
      }),
    );
  expect(rules.every((rule) => rule.borderTop === 1)).toBe(true);
  expect(rules.every((rule) => rule.borderBottom === 1)).toBe(true);
  expect(rules.every((rule) => rule.bandWidth >= 740)).toBe(true);
  expect(rules.every((rule) => rule.hatched)).toBe(true);
  expect(rules.every((rule) => rule.gap >= 7 && rule.width >= 24)).toBe(true);
  expect(rules.every((rule) => Math.abs(rule.verticalOffset) < 3)).toBe(true);
  const index = page.getByRole('navigation', { name: 'Section index' });
  await expect(index).toBeVisible();
  const links = await index.locator('a').evaluateAll((elements) =>
    elements.map((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getClientRects().length;
    }),
  );
  expect(links.every((lines) => lines === 1)).toBe(true);
  await page.setViewportSize({ width: 1760, height: 500 });
  const bounds = await index.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(500);
});

test('skills use the available section width without crowding adjacent groups', async ({
  page,
}) => {
  for (const width of [1760, 1515, 1120, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.locator('.skills-grid').evaluate((grid) => {
      const bounds = grid.getBoundingClientRect();
      const groups = [...grid.children];
      return {
        gutter: groups[0]!.getBoundingClientRect().left - bounds.left,
        crowded: groups.some((group) => {
          const box = group.getBoundingClientRect();
          return [...group.querySelectorAll('li,h3')].some((item) => {
            const rect = item.getBoundingClientRect();
            return rect.left < box.left - 1 || rect.right > box.right + 1;
          });
        }),
      };
    });
    expect(geometry.gutter, `${width}px empty skills gutter`).toBeLessThan(2);
    expect(geometry.crowded, `${width}px skill group containment`).toBe(false);
  }
});

test('the supplied ledger structure keeps the gutter index and phone about content separate', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const shell = await page.locator('.portfolio-content').boundingBox();
  const index = await page
    .getByRole('navigation', { name: 'Section index' })
    .boundingBox();
  expect(index!.x - (shell!.x + shell!.width)).toBeGreaterThanOrEqual(24);
  expect(Math.abs(index!.y - 900 * 0.26)).toBeLessThanOrEqual(2);
  const note = await page
    .locator('#about .section-annotation .margin-note')
    .boundingBox();
  const content = await page.locator('#about .about-layout').boundingBox();
  expect(content!.x).toBeGreaterThan(note!.x + note!.width);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const phone = await page.locator('.about-layout').evaluate((layout) => {
    const copy = layout.querySelector('div')!.getBoundingClientRect();
    const snapshot = layout.querySelector('.snapshot')!.getBoundingClientRect();
    return {
      copyBottom: copy.bottom,
      copyWidth: copy.width,
      snapshotTop: snapshot.top,
    };
  });
  expect(phone.snapshotTop).toBeGreaterThanOrEqual(phone.copyBottom);
  expect(phone.copyWidth).toBeGreaterThanOrEqual(340);
});

test('phone collection covers have a separate readable label and arrow row', async ({
  page,
}) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const card = page.locator('.collection-card').first();
    const thumbnail = await card.locator('.collection-slot').boundingBox();
    const title = await card.locator('strong').boundingBox();
    const arrow = await card.locator(':scope > .icon').boundingBox();
    expect(title!.y).toBeGreaterThanOrEqual(thumbnail!.y + thumbnail!.height);
    expect(arrow!.x).toBeGreaterThan(title!.x + title!.width);
  }
});

test('content, labels and controls stay readable at desktop and phone widths', async ({
  page,
}) => {
  for (const width of [1440, 941, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (const selector of [
      '.about-layout > div > p',
      '.project-copy > p:not(.project-status)',
      '.thought-card > p:not(.eyebrow)',
    ]) {
      const sizes = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) =>
            parseFloat(getComputedStyle(element).fontSize),
          ),
        );
      expect(
        Math.min(...sizes),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(width < 880 ? 14 : 12);
      expect(
        Math.max(...sizes),
        `${selector} at ${width}px`,
      ).toBeLessThanOrEqual(17);
    }
    for (const selector of [
      '.tag-list li',
      '.project-status',
      '.snapshot ul',
      '.calendar-note',
      '.quote-position',
      '.site-footer',
      '.experience-grid article > p',
    ]) {
      const sizes = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) =>
            parseFloat(getComputedStyle(element).fontSize),
          ),
        );
      expect(
        Math.min(...sizes),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(width < 880 ? 12 : 10);
    }
    for (const selector of [
      '.theme-control',
      '.search-trigger',
      '.project-filters button',
      '.photo-strip-controls button',
      '.calendar-note button',
    ]) {
      const heights = await page
        .locator(selector)
        .evaluateAll((elements) =>
          elements.map((element) => element.getBoundingClientRect().height),
        );
      expect(
        Math.min(...heights),
        `${selector} at ${width}px`,
      ).toBeGreaterThanOrEqual(width < 880 ? 44 : 28);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

for (const width of [941, 1440]) {
  test(`the complete project overview fits one ${width}px section without clipped copy`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#projects');
    const cards = section.locator('.project-card');
    await expect(cards.locator('h3')).toHaveText([
      'OncoSyn',
      'Cryptalis',
      'Smolink',
      'UniSpace',
      'OrbitOps',
      'StaySync',
    ]);
    await expect(cards.locator('details[open]')).toHaveCount(0);
    const bounds = await section.boundingBox();
    expect(bounds!.height).toBeLessThanOrEqual(500);
    await section.evaluate((element) =>
      window.scrollTo({
        top: element.getBoundingClientRect().top + scrollY,
        behavior: 'instant',
      }),
    );
    for (const card of await cards.all()) {
      await expect(card.locator('h3')).toBeInViewport({ ratio: 1 });
      await expect(card.locator('summary')).toBeInViewport({ ratio: 1 });
      const copy = await card.evaluate((element) =>
        [...element.querySelectorAll('h3, .project-status, summary')].map(
          (item) => {
            const style = getComputedStyle(item);
            const range = document.createRange();
            range.selectNodeContents(item);
            const text = range.getBoundingClientRect();
            const box = element.getBoundingClientRect();
            const clippedOverflow = ['hidden', 'clip', 'scroll', 'auto'];
            return {
              text: item.textContent,
              clipped:
                (clippedOverflow.includes(style.overflowY) &&
                  item.scrollHeight > item.clientHeight + 1) ||
                (clippedOverflow.includes(style.overflowX) &&
                  item.scrollWidth > item.clientWidth + 1) ||
                text.left < box.left - 1 ||
                text.right > box.right + 1 ||
                text.top < box.top - 1 ||
                text.bottom > box.bottom + 1,
              lineClamp: style.getPropertyValue('-webkit-line-clamp'),
            };
          },
        ),
      );
      for (const item of copy) {
        expect(item.clipped, `${item.text} must remain complete`).toBe(false);
        expect(item.lineClamp, `${item.text} must not be line-clamped`).toMatch(
          /^(none|)$/,
        );
      }
      const description = await card.evaluate((element) => {
        const item = element.querySelector(
          '.project-copy > p:not(.project-status)',
        )!;
        const box = item.getBoundingClientRect();
        const cardBox = element.getBoundingClientRect();
        const style = getComputedStyle(item);
        return {
          clamp: style.getPropertyValue('-webkit-line-clamp'),
          overflowY: style.overflowY,
          lines: Math.round(box.height / parseFloat(style.lineHeight)),
          inside:
            box.left >= cardBox.left - 1 && box.right <= cardBox.right + 1,
        };
      });
      expect(description.clamp, 'description clamp').toBe('2');
      expect(description.overflowY, 'description clip').toBe('hidden');
      expect(description.lines, 'description lines').toBeGreaterThanOrEqual(1);
      expect(description.lines, 'description lines').toBeLessThanOrEqual(2);
      expect(description.inside, 'description inside card').toBe(true);
    }
  });
}

test('the reference width retains shared gutters, desktop rows and a clear hero index', async ({
  page,
}) => {
  await page.setViewportSize({ width: 941, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const geometry = await page.evaluate(() => {
    const rect = (selector: string) =>
      document.querySelector(selector)!.getBoundingClientRect();
    const rows = (selector: string) =>
      [...document.querySelectorAll(selector)].map((element) => {
        const box = element.getBoundingClientRect();
        return { x: box.x, y: box.y };
      });
    return {
      contentX: rect('.portfolio-content').x,
      heroBottom: rect('.hero').bottom,
      indexBottom: rect('.section-index').bottom,
      aboutX: rect('#about .about-layout > div > p').x,
      experienceX: rect('.experience-grid').x,
      skillsX: rect('.skills-grid').x,
      eventHeadingX: rect('#hackathons .section-heading').x,
      eventX: rect('#hackathons .achievement-paper').x,
      experience: rows('.experience-grid article'),
      skills: rows('.skills-grid > div'),
      projects: rows('.project-card'),
      contact: rows('.contact-links a'),
      indexTextLines: [...document.querySelectorAll('.section-index a')].map(
        (element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getClientRects().length;
        },
      ),
    };
  });
  expect(geometry.contentX).toBeGreaterThan(89);
  expect(geometry.contentX).toBeLessThan(92);
  expect(geometry.indexBottom).toBeLessThanOrEqual(geometry.heroBottom);
  expect(geometry.indexTextLines.every((lines) => lines === 1)).toBe(true);
  expect(Math.abs(geometry.experienceX - geometry.aboutX)).toBeLessThan(3);
  expect(Math.abs(geometry.skillsX - geometry.contentX)).toBeLessThan(3);
  expect(Math.abs(geometry.eventX - geometry.aboutX)).toBeLessThan(8);
  expect(
    Math.abs(geometry.eventHeadingX - geometry.contentX),
  ).toBeLessThanOrEqual(1);
  for (const [name, items, count] of [
    ['experience', geometry.experience, 3],
    ['skills', geometry.skills, 5],
    ['contact', geometry.contact, 5],
  ] as const) {
    expect(items, name).toHaveLength(count);
    expect(
      new Set(items.map((item) => Math.round(item.y))).size,
      `${name} rows`,
    ).toBe(1);
  }
  expect(
    new Set(geometry.projects.map((item) => Math.round(item.x))).size,
  ).toBe(2);
  expect(
    new Set(geometry.projects.map((item) => Math.round(item.y))).size,
  ).toBe(3);
});

test('homepage uses a restrained scale at normal desktop and phone widths', async ({
  page,
}) => {
  const expectations = [
    {
      width: 1440,
      content: { min: 758, max: 762 },
      hero: { min: 48, max: 51 },
      section: { min: 10, max: 12 },
      project: { min: 14, max: 16 },
      header: { min: 52, max: 60 },
    },
    {
      width: 941,
      content: { min: 758, max: 762 },
      hero: { min: 40, max: 43 },
      section: { min: 10, max: 12 },
      project: { min: 14, max: 16 },
      header: { min: 52, max: 60 },
    },
    {
      width: 390,
      content: { min: 342, max: 362 },
      hero: { min: 28, max: 32 },
      section: { min: 10, max: 12 },
      project: { min: 18, max: 20 },
      header: { min: 96, max: 136 },
    },
  ];

  for (const target of expectations) {
    await page.setViewportSize({ width: target.width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const scale = await page.evaluate(() => {
      const content = document.querySelector('.portfolio-content')!;
      const hero = document.querySelector('.hero h1')!;
      const section = document.querySelector('.section-heading h2')!;
      const project = document.querySelector('.project-copy h3')!;
      const bodyCopy = document.querySelector('.project-copy > p')!;
      const header = document.querySelector('.site-header')!;
      return {
        content: content.getBoundingClientRect().width,
        hero: parseFloat(getComputedStyle(hero).fontSize),
        section: parseFloat(getComputedStyle(section).fontSize),
        project: parseFloat(getComputedStyle(project).fontSize),
        body: parseFloat(getComputedStyle(bodyCopy).fontSize),
        header: header.getBoundingClientRect().height,
      };
    });

    expect(
      scale.content,
      `${target.width}px content width`,
    ).toBeGreaterThanOrEqual(target.content.min);
    expect(
      scale.content,
      `${target.width}px content width`,
    ).toBeLessThanOrEqual(target.content.max);
    expect(scale.hero, `${target.width}px hero scale`).toBeGreaterThanOrEqual(
      target.hero.min,
    );
    expect(scale.hero, `${target.width}px hero scale`).toBeLessThanOrEqual(
      target.hero.max,
    );
    expect(
      scale.section,
      `${target.width}px section scale`,
    ).toBeGreaterThanOrEqual(target.section.min);
    expect(
      scale.section,
      `${target.width}px section scale`,
    ).toBeLessThanOrEqual(target.section.max);
    expect(
      scale.project,
      `${target.width}px project scale`,
    ).toBeGreaterThanOrEqual(target.project.min);
    expect(
      scale.project,
      `${target.width}px project scale`,
    ).toBeLessThanOrEqual(target.project.max);
    expect(scale.body, `${target.width}px body scale`).toBeGreaterThanOrEqual(
      target.width < 880 ? 14 : 12,
    );
    expect(scale.body, `${target.width}px body scale`).toBeLessThanOrEqual(16);
    expect(
      scale.header,
      `${target.width}px header height`,
    ).toBeGreaterThanOrEqual(target.header.min);
    expect(scale.header, `${target.width}px header height`).toBeLessThanOrEqual(
      target.header.max,
    );
  }
});

test('desktop resizing preserves the supplied composition instead of pushing content inward', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const measurements = [];
  for (const width of [941, 1705]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    measurements.push(
      await page.evaluate(() => {
        const content = document
          .querySelector('.portfolio-content')!
          .getBoundingClientRect();
        const body = document
          .querySelector('#about .about-layout')!
          .getBoundingClientRect();
        const title = document
          .querySelector('.hero h1')!
          .getBoundingClientRect();
        const index = document
          .querySelector('.section-index')!
          .getBoundingClientRect();
        return {
          centered: Math.abs(content.x - (innerWidth - content.width) / 2),
          titleInset: title.x - content.x,
          bodyRatio: (body.x - content.x) / content.width,
          indexLeft: index.left,
          indexRight: index.right,
          contentRight: content.right,
        };
      }),
    );
  }
  const [reference, wide] = measurements;
  for (const measured of measurements) {
    expect(measured!.centered, 'content centering').toBeLessThan(1);
    expect(
      measured!.titleInset,
      'title flush with content',
    ).toBeLessThanOrEqual(1);
    expect(measured!.bodyRatio, 'body gutter').toBeGreaterThan(0.14);
    expect(measured!.bodyRatio, 'body gutter').toBeLessThan(0.22);
  }
  expect(
    Math.abs(reference!.indexRight - reference!.contentRight),
  ).toBeLessThanOrEqual(1);
  expect(wide!.indexLeft - wide!.contentRight).toBeGreaterThanOrEqual(24);
});

test('wide screens keep the page centered and bound the header and hero inset', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1920, 4272]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const alignment = await page.evaluate(() => {
      const rect = (selector: string) =>
        document.querySelector(selector)!.getBoundingClientRect();
      const content = rect('.portfolio-content');
      const header = rect('.site-header');
      const footer = rect('.site-footer');
      const name = rect('.hero h1');
      return {
        center: content.x + content.width / 2,
        contentX: content.x,
        headerX: header.x,
        footerX: footer.x,
        wordmarkInset: rect('.wordmark').x - content.x,
        nameInset: name.x - content.x,
        nameHeight: name.height,
        nameSize: parseFloat(
          getComputedStyle(document.querySelector('.hero h1')!).fontSize,
        ),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(Math.abs(alignment.center - width / 2)).toBeLessThan(1);
    expect(Math.abs(alignment.headerX - alignment.contentX)).toBeLessThan(1);
    expect(Math.abs(alignment.footerX - alignment.contentX)).toBeLessThan(1);
    expect(alignment.nameInset).toBeLessThanOrEqual(48);
    expect(
      Math.abs(alignment.wordmarkInset - alignment.nameInset),
    ).toBeLessThanOrEqual(1);
    expect(alignment.nameHeight).toBeLessThan(alignment.nameSize * 1.5);
    expect(alignment.overflow).toBe(false);
  }
});

test('narrow doubled text keeps navigation, contact labels and project names whole', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  for (const selector of [
    '.site-header nav a',
    '.contact-links a',
    '.project-card h3',
  ]) {
    const labels = await page.locator(selector).evaluateAll((elements) =>
      elements.map((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const lines = new Set<number>();
        let textNode;
        while ((textNode = walker.nextNode())) {
          if (!textNode.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(textNode);
          for (const rect of range.getClientRects())
            lines.add(Math.round(rect.y));
        }
        return { text: element.textContent, lines: lines.size };
      }),
    );
    for (const label of labels)
      expect(label.lines, `${selector}: ${label.text}`).toBe(1);
  }
  const contact = page.locator('.contact-links a');
  for (const link of await contact.all()) {
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});

test('archive copy and metadata use the same readable scale', async ({
  page,
}) => {
  for (const path of ['/blogs', '/photography']) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(path);
    const copy = await page
      .locator(
        'main p:not(.eyebrow):not(.content-status):not(.publication-status):not(.project-status):not(.sr-only)',
      )
      .evaluateAll((elements) =>
        elements.map((element) =>
          parseFloat(getComputedStyle(element).fontSize),
        ),
      );
    expect(Math.min(...copy), path).toBeGreaterThanOrEqual(14);
    await page.setViewportSize({ width: 320, height: 720 });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${path} at 320px with doubled text`,
    ).toBeLessThanOrEqual(320);
  }
});

test('section jumps animate only with motion enabled and finish at the right heading', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Contact', exact: true })
    .click();
  await expect(page.locator('#contact h2')).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          Math.abs(
            document.querySelector('#contact')!.getBoundingClientRect().top,
          ) < 100 ||
          scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
      ),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});

test('name scramble preserves word geometry and quote fade keeps the footer still', async ({
  page,
}) => {
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 100));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const widths: number[][] = [];
  for (let index = 0; index < 5; index++) {
    widths.push(
      await page
        .locator('.name-word')
        .evaluateAll((words) =>
          words.map((word) => word.getBoundingClientRect().width),
        ),
    );
    await page.clock.runFor(220);
  }
  expect(
    Math.max(...widths.map((item) => item[0]!)) -
      Math.min(...widths.map((item) => item[0]!)),
  ).toBeLessThan(1);
  const quote = page.locator('.quote-text');
  const before = await quote.textContent();
  const footer = await page.locator('.site-footer').boundingBox();
  await page.getByRole('button', { name: 'Next quote' }).click();
  await expect(page.locator('.quote-text')).toHaveAttribute(
    'data-fading',
    'true',
  );
  await page.clock.runFor(240);
  await expect(page.locator('.quote-text')).not.toHaveText(before!);
  const after = await page.locator('.site-footer').boundingBox();
  expect(Math.abs(footer!.height - after!.height)).toBeLessThan(1);
});

test('collection arrows move the filmstrip without moving the page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#photography').evaluate((section) =>
    window.scrollTo({
      top: section.getBoundingClientRect().top + scrollY - 100,
      behavior: 'instant',
    }),
  );
  const before = await page.evaluate(() => scrollY);
  await page.getByRole('button', { name: 'Next collection' }).click();
  await expect(page.locator('.photo-strip-controls')).toContainText(
    'Landscapes',
  );
  await expect
    .poll(() =>
      page.locator('.photo-strip-track').evaluate((track) => track.scrollLeft),
    )
    .toBeGreaterThan(10);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(
    2,
  );
});

test('enlarged text keeps navigation separate and complete project status visible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { font-size: 150%; }' });
  await expect(
    page.getByRole('navigation', { name: 'Section index' }),
  ).toBeHidden();
  await expect(
    page.getByRole('combobox', { name: 'Jump to section' }),
  ).toBeVisible();
  for (const width of [1760, 2240]) {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: 'html { font-size: 150%; }' });
    const enlarged = page.getByRole('navigation', { name: 'Section index' });
    await expect(enlarged).toBeVisible();
    const wideContent = await page.locator('.portfolio-content').boundingBox();
    const wideBounds = (await enlarged.boundingBox())!;
    expect(
      wideBounds.x - wideContent!.x - wideContent!.width,
    ).toBeGreaterThanOrEqual(24);
  }
  await page.setViewportSize({ width: 2240, height: 1080 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { font-size: 150%; }' });
  const index = page.getByRole('navigation', { name: 'Section index' });
  await expect(index).toBeVisible();
  const content = await page.locator('.portfolio-content').boundingBox();
  const fixedTop = (await page.evaluate(() => innerHeight)) * 0.26;
  let bounds = (await index.boundingBox())!;
  expect(bounds.x - content!.x - content!.width).toBeGreaterThanOrEqual(24);
  expect(Math.abs(bounds.y - fixedTop)).toBeLessThanOrEqual(2);
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  bounds = (await index.boundingBox())!;
  expect(Math.abs(bounds.y - fixedTop)).toBeLessThanOrEqual(2);
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  const status = page.locator('#project-oncosyn .project-status');
  await status.scrollIntoViewIfNeeded();
  const visible = await status.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const text = range.getBoundingClientRect();
    const card = element.closest('.project-card')!.getBoundingClientRect();
    return (
      text.top >= card.top - 1 &&
      text.left >= card.left - 1 &&
      text.bottom <= card.bottom + 1 &&
      text.right <= card.right + 1
    );
  });
  expect(visible).toBe(true);
});
