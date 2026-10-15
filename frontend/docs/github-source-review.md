# Public GitHub source review

Reviewed on October 15, 2026. This review supplements the [recording audit](video-component-analysis.md).
Source files establish implementation details at the listed commits. They do not establish the exact code deployed during the recording.
Only public, unauthenticated source reads ran. No source or artwork from the reviewed portfolio repositories entered this portfolio.

## Source identity

| Reference | Public source                                                                         | Inspected revision                         | Confidence                                                                                             |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Anurag    | [nodeanurag/my-portfolio](https://github.com/nodeanurag/my-portfolio)                 | `4951388c547b8a4c3d4fbcef43d2d851e40bd6e4` | His profile links the supplied website. Active imports were traced.                                    |
| Sakthi    | [sakthii05/portfolio](https://github.com/sakthii05/portfolio)                         | `f65dfaa95b24c88345626bd189fefd257e4f7741` | Source supplied by the owner. Current deployment identity remains unverified.                          |
| Garvit    | [garvittsingla/portfolio](https://github.com/garvittsingla/portfolio)                 | `b44decb295f3d9883844064015e58f865ead51e7` | Live website links this owner. Repository homepage matches the supplied domain.                        |
| Parth     | [mittal-parth/personal-portfolio](https://github.com/mittal-parth/personal-portfolio) | `50f8aa9590752072632069449d08f8c48991418e` | Older public template. Its README names the Netlify deployment. Current site's source remains UNKNOWN. |

The inspected trees contain no LICENSE file. Reuse rights remain unclear. These sources guide independent implementation choices.
GitHub rate limiting prevented some secondary Sakthi project/playground reads. Core home, layout, theme and shader files were inspected.

## Anurag: a compact document with a stable rhythm

The active entry imports `src/sections/*`. Duplicate and older components are misleading without import tracing.
The [entry](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/App.tsx#L8-L51) and [alias](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/vite.config.ts#L8-L11) establish the active path.

The [layout](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/Layout.tsx#L11-L49) uses a 760px reading column, dashed rails and repeated horizontal bands.
Small intersection marks and repeated padding make the sections feel connected. The structure works without large animated containers.
[Typography](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/index.css#L99-L125) assigns Instrument Serif to display, Amiamie to body, and JetBrains Mono to metadata.

The [hero](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/sections/Hero.tsx#L26-L109) uses a 30/38px name, 13px role and 11px metadata.
Roles rotate every 3.2 seconds through sequential 300ms movement and opacity transitions.
The name uses a [static chromatic shadow](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/index.css#L165-L168), not the requested text scramble.
[About copy](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/sections/About.tsx#L9-L17) uses 14.5px text and a restrained reveal.

[Project cards](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/sections/ProjectCard.tsx#L16-L108) lift four pixels over 300ms. Details expand over 200ms.
The small hover distance and fixed surrounding grid make the feedback coherent.
Our revision keeps stable cards and shared color transitions, while increasing copy and control sizes.

The [palette](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/command-palette.tsx#L194-L318) filters across titles, subtitles and categories.
Its panel enters over 200ms through small scale, movement and opacity changes.
Our existing Base UI dialog supplies keyboard navigation, focus containment and recovery. Its larger text remains readable at narrow widths.

[Quotes](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/footer.tsx#L52-L99) change every six seconds through sequential 500ms exits and entries.
A minimum height limits page movement. Our revision separates fade-out from fade-in and reserves space for every quote.
The [index](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/SideIndex.tsx#L19-L60) sits outside the reading column on wide screens.
Our enlarged index appears only where it fits beside the content. Other widths use the section selector.

Anurag also loads a cursor-following pixel cat. Our implementation uses the original MIT-licensed [oneko.js](https://github.com/adryd325/oneko.js) sprite directly, with local React motion, a visibility control and reduced-motion behavior.

## Sakthi: three distinct motion systems

Sakthi's [font setup](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/app/layout.tsx#L14-L35) uses Sora, Instrument Serif, Courier Prime and Caveat.
The variable named `font-mono` maps to Instrument Serif. Class names alone therefore do not establish the visible typeface.
The [foreground](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/home/FrontLayerContent.tsx#L22-L38) uses a 30px heading and 14/16px description over the scene.

The [theme wipe](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/common/ThemeToggle.tsx#L19-L62) uses the native View Transition API.
It expands a circle from the toggle over 700ms. This transition is separate from the background shader.
The [route transition](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/common/PageTransitionWrapper.tsx#L25-L68) uses a GSAP spiral overlay.
Its longer interruption serves page changes. It is not needed for each foreground interaction in our single-page composition.

The [shader](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/home/FluidDistortionEffect.tsx#L105-L190) blends matching sketch and color images through a painted mask.
A 256 × 256 texture records the pointer trail. Procedural noise adds irregular edges.
The [frame loop](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/home/FluidDistortionEffect.tsx#L434-L475) fades the mask, so color recedes after the pointer moves.
Mouse hover works directly. Touch and pen require contact.
This confirms the paired-image plan. Final scene work remains DEFERRED until the owner supplies four matching images.

## Garvit: custom calendar texture and repeated panels

Garvit's [GitHub data flow](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/GithubContributionsSticky.tsx#L87-L132) starts with bundled fallback data and then requests the public jogruber service.
A failed request preserves that fallback. Our calendar keeps unknown days explicit and does not copy this data policy.

The [heatmap](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/GithubContributionsSticky.tsx#L217-L257) draws seeded Rough.js SVG cells with cross-hatching.
Hover shows daily counts. [Legend controls](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/GithubContributionsSticky.tsx#L767-L815) dim other levels.
The hand-drawn cells and repeated panel shapes explain the visual connection to the notebook theme.
Our required seven-row matrix retains its accessible daily explorer and exact counts. A new drawing library is unnecessary for this readability pass.

The orange problem-solving calendar and rating chart form a separate dataset.
The [chart](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/LeetCodeStats.tsx#L63-L82) spaces contests by index rather than elapsed time.
Its [server route](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/app/api/leetcode/route.ts#L1-L110) queries LeetCode GraphQL.
Those metrics should not become invented activity in our portfolio.

The [achievement layout](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/AchievementsHanging.tsx#L441-L478) has three fixed desktop columns.
Mobile uses a vertical chain. It is not a carousel.
The [cards](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/AchievementsHanging.tsx#L207-L298) repeat paper texture, image, badge and dashed footer.
The repeated frame creates coherence more directly than the decorative rope.

[Scroll reveals](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/ScrollReveal.tsx#L23-L64) use IntersectionObserver and a 700ms fade with small movement and scale.
The [navbar](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/FloatingNavbar.tsx#L28-L60) changes shape at different scroll thresholds, which prevents threshold flicker.
Its [dependencies](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/package.json#L11-L26) do not include Lenis, GSAP, Framer Motion or a chart library.
Visual smoothness does not require one shared animation framework.

## Parth: preserve the source boundary

The live site links to [mittal-parth](https://github.com/mittal-parth), but the inspected public template documents an older site.
Its [README](https://github.com/mittal-parth/personal-portfolio/blob/50f8aa9590752072632069449d08f8c48991418e/readme.md#L1-L5) names Netlify.
Its [package](https://github.com/mittal-parth/personal-portfolio/blob/50f8aa9590752072632069449d08f8c48991418e/package.json#L6-L20) uses Vite.
The current site uses Next.js. The public template cannot prove how its current event wall or transitions work.
Our Parth-inspired event treatment therefore remains based on the recorded visual evidence. Its implementation is independent.

## Decisions for this revision

- Increase the shared text scale, spacing and controls across the home, archives and detail pages.
- Preserve the scramble's geometry and accessible final name throughout its animation.
- Sequence quote fades and preserve footer geometry.
- Use restrained palette and hover transitions, with reduced-motion behavior.
- Move only the photography track when its arrows change collection.
- Keep scene work deferred, public data failures explicit and reference source separate from application source.

Source behavior explains the observed design, but it does not prove real frame pacing, keyboard access or mobile quality.
Our own browser checks establish the tested behavior of the revised portfolio.
