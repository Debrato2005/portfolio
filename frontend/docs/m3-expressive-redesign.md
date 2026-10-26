# Material 3 Expressive redesign

**Owner:** Design direction record (October 26, 2026)

The owner asked for a Material 3 Expressive frontend that is beautiful, intuitive, interactive and fun, with motion design. A later request asked for it to feel "awestruck" and named the four reference portfolios and the supplied mockups as component references. This record supersedes the JetBrains Mono editorial direction in [DESIGN.md](../DESIGN.md).

## System

- **Color.** Roles come from `@material/material-color-utilities` 0.4.0 `SchemeVibrant`. Light uses the 2025 spec's bright containers. Dark uses the 2021 spec's deep containers. Four "sky" seeds are pregenerated in `src/styles/tokens.css`: Twilight `#4a5bd8` (default), Aurora `#0f9d7a`, Nebula `#b03a8c` and Golden hour `#d98a00`. A custom seed from the palette menu is computed in the browser by a lazily loaded chunk.
- **Type.** Roboto Flex Latin (weight 100–1000, width 25–151%) is self-hosted in `public/fonts/`. Width and weight carry the expression: the hero name, section titles and numbers use wide, heavy settings, and body text stays at 100% width.
- **Shape.** `src/features/portfolio/shapes.ts` builds 13 M3 shapes (cookies, clovers, sunny, flower, pentagon, triangle, squircle) as 72-point polygons. Because the vertex counts match, CSS can morph `clip-path` between any two of them.
- **Motion.** M3 Expressive springs (spatial 0.6/800, 0.8/380, 0.8/200; effects 1/3800, 1/1600, 1/800) are sampled into CSS `linear()` easing tokens. Reduced motion swaps the spatial springs for emphasized easing and stops the loops.

## Signature interactions

- The hero name's variable axes arrive in a wave, then swell toward a fine pointer.
- The hero banner holds a pencil sketch. Dragging across it leaves an ink-smoke trail that reveals the painted version. Animated noise warps the trail and breaks it into wisps. A hand-written note invites visitors to paint, and stays hidden when the static fallback is showing.
- The GitHub portrait sits in a morphing shape inside About, with the text wrapping around it. Each press advances it to the next shape. The wordmark carries the same photo in a shape that morphs on hover.
- Theme and sky changes use a circular view-transition reveal from the control that was pressed.
- Project filter chips animate their check icon. A view transition reflows the cards, covers morph on hover, and briefs expand with `::details-content`.
- Hackathon cards hang from a sagging line and swing on a damped spring when pointed at, focused or tapped.
- GitHub activity uses M3 tabs with a sliding pill indicator. Calendar levels use tones of the current primary color.
- Delegated press ripples, a wavy scroll-progress indicator, a springing section rail (wide screens) and a floating toolbar (narrow screens).

## Content

New facts come from the public GitHub profile README (`profile` in `content.ts`): internship status, focus areas, daily tools, spoken languages and off-screen interests. The portrait is the public GitHub avatar, saved as `public/images/debrato-avatar.jpg`. The experience timeline ends with a "What's next?" card that restates the internship status.

## Reference components

The owner asked for component ideas from Anurag, Sakthi, Parth and Garvit's sites and repositories. On October 26 the repository trees were listed through the GitHub API. Two ideas were adapted as original M3 implementations, because `nodeanurag/my-portfolio` declares no license and no code was copied:

- **Live clock:** Anurag's live clock became an IST clock chip in the hero meta row.
- **Easter egg:** Anurag's Konami easter egg became a burst of morphing M3 shapes in the current sky colors. The Konami code or every sixth portrait press triggers it, and reduced motion skips it (`celebrate.ts`).

Garvit's `AchievementsHanging` matches the existing hanging hackathon cards. Sakthi's WebGL distortion, shutter and burn transitions were left out: the hero already owns one WebGL effect.

## Hero revision after owner review

The owner called the boxed hero "empty", then asked for the ink flow of [Sakthi's portfolio](https://sakthi-portfolio-mauve.vercel.app/) and for work that looks considered rather than generated, without losing creativity. The hero changed accordingly:

- **Kept:** the reveal effect. Its tuning moved toward the reference: brush radius 110px, stronger drifting warp, wisps, persistence 0.7s, fade 1.4s. The shader was rewritten in the project's own code because that repository has no license.
- **Removed:** generic fillers — highlighter marks on single words, a big-number stat strip, a skills marquee, and confetti-like floating shapes.
- **Kept as considered creative moments:** the hand-written notes, live clock, morphing portrait and wordmark, swinging hackathon cards and the shape celebration.

## Banner hero, editorial framing and botanicals

After seeing the full-bleed version, the owner asked for a contained hero again, inspired by [Anurag](https://anuragdotdev.vercel.app/) and [Garvit](https://www.garvitsingla.in/). The owner also asked for the framing and twigs of the supplied mockups.

- **Hero (`ProfileHero.tsx`):**
  - Anurag's structure: a rounded banner holding the ink-reveal sketch, with the shape portrait overlapping its edge. A profile row carries the name, role, location, IST clock and page views, plus status, "Let's talk" and the resume.
  - Garvit's personality: an introduction with tonal keyword chips and a hand-written "socials ➔" row. A small taped collage links to photography, writing and the current role.
- **Framing:** each section is a ruled row. A 10rem gutter holds a numbered label and a hand-written note, the content fills the second column, and "View" links sit at the top right. Contact keeps its tonal block. On phones the row stacks.
- **Botanicals (`Botanicals.tsx`):** original, seeded SVG sprigs sway on the page edges on wide screens. A meadow above the footer gathers flowers toward its corners. Reduced motion stops the sway.
- **Photography:** the homepage strip is a length of film with sprocket holes.
