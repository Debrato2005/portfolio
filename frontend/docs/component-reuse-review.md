# Component reuse review, October 18

**Owner:** Frontend component research

CURRENT: the [complete video review](visual-review-2026-10-17.md) selected the component roles before this source review.
The inspected files are active imports, rather than similarly named older components in the repositories.
These are independent implementation decisions. No personal-repository component, photograph, or runtime dependency was copied into this project.

## Inspected source identities

| Repository                                           | Inspected main revision                    | Reuse boundary                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Anurag](https://github.com/nodeanurag/my-portfolio) | `4951388c547b8a4c3d4fbcef43d2d851e40bd6e4` | Complete tree contains no LICENSE/COPYING file; repository metadata reports no declared license.                                            |
| [Sakthi](https://github.com/sakthii05/portfolio)     | `f65dfaa95b24c88345626bd189fefd257e4f7741` | Complete recursive tree contains no license, copying, or notice file. Its Next.js setup is not a direct fit for Vite.                       |
| [Garvit](https://github.com/garvittsingla/portfolio) | `4ee6aea1579dbbc4ca90c421554617ce3999b814` | Complete recursive tree contains 137 entries and no license, copying, or notice file. This revision postdates the earlier recording review. |

The inspected trees were not truncated. Their source revisions do not establish the exact code deployed in the recording.
Direct-copy permission remains unconfirmed. The decisions below retain independently written local components.

## Useful components and local counterparts

| Active source                                                                                                                                                         | Useful part                                                         | Dependency or content boundary                                 | Local decision                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Anurag Layout](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/Layout.tsx)                                   | Continuous rails and consistent section bands                       | React, Tailwind and site theme variables                       | Keep the shared shell in `portfolio.css` and `reference-refinement.css`, with the larger local reading scale.                                               |
| [Anurag ProjectCard](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/sections/ProjectCard.tsx)                           | Restrained hover feedback and grouped actions                       | Framer Motion, Lucide and site configuration                   | Keep native `Projects.tsx` briefs. The latest instruction requires all six complete summaries together, so the tall media and clamped text are unsuitable.  |
| [Anurag command palette](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/command-palette.tsx)                 | Grouped title, description and category search                      | Router, theme provider, motion and icon dependencies           | Keep the search pattern in `CommandPalette.tsx`. Retain Base UI focus containment, native external links and editor shortcut handling.                      |
| [Anurag footer](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/footer.tsx)                                   | Sequential fading quotes                                            | Six-second timer, Framer Motion, Layout and site configuration | Use this as the quote reference for `Quotes.tsx`. Retain local playback controls, reserved geometry and reduced-motion behavior.                            |
| [Anurag SideIndex](https://github.com/nodeanurag/my-portfolio/blob/4951388c547b8a4c3d4fbcef43d2d851e40bd6e4/src/components/SideIndex.tsx)                             | Active section marker                                               | React, Router and Tailwind                                     | Keep `SectionIndex.tsx` and its text-scale-aware fit calculation. The selector remains available when the index cannot fit.                                 |
| [Sakthi ThemeToggle](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/common/ThemeToggle.tsx)                          | Native circular View Transition from the control                    | `next-themes`, React Icons and React `flushSync`               | Keep the native technique in `Theme.tsx`. Preserve the fixed control size, browser fallback and reduced-motion support.                                     |
| [Garvit AchievementsHanging](https://github.com/garvittsingla/portfolio/blob/4ee6aea1579dbbc4ca90c421554617ce3999b814/components/AchievementsHanging.tsx)             | Repeated photo, event and story frame through `AchievementCardItem` | Personal event records and photographs                         | Keep `Achievements.tsx` as one verified paper record. Hide controls for a single item. Do not copy personal event data or media.                            |
| [Garvit GithubContributionsSticky](https://github.com/garvittsingla/portfolio/blob/4ee6aea1579dbbc4ca90c421554617ce3999b814/components/GithubContributionsSticky.tsx) | Textured cells and daily detail                                     | Drawing setup and contribution-provider integration            | Keep independent CSS hatching in `ContributionSection.tsx`. Retain exact seven-row placement, validated counts, explicit failures and keyboard exploration. |
| [Garvit FooterSection](https://github.com/garvittsingla/portfolio/blob/4ee6aea1579dbbc4ca90c421554617ce3999b814/components/FooterSection.tsx)                         | Quiet footer composition                                            | Static quote and site-specific links                           | Treat it as composition guidance. It is not the fading quote rotator shown by Anurag.                                                                       |

## Active import checks

Anurag's application imports `src/sections/ProjectCard.tsx` and the components listed above. Similar root-level components are inactive.
Sakthi's active chain is `app/layout.tsx` → `components/common/Layout.tsx` → `FloatingNavBar.tsx` → `ThemeToggle.tsx`.
Its floating navigation also depends on Next Link and pathname hooks, so copying it would require unnecessary route and dependency changes.
Garvit's current `app/page.tsx` imports ProjectsSection, ExperienceSection, AchievementsHanging, LeetCodeStats, GithubContributionsSticky, WritingsSection and FooterSection through ScrollReveal.

## Photography and background boundaries

The complete Anurag and Garvit trees do not supply a reusable photography gallery.
The inspected Sakthi components supply scene and navigation behavior. They do not establish a drop-in photography collection for this portfolio.
Keep the independent `Photography.tsx` filmstrip, pause controls and gallery navigation. Original personal photographs remain missing.
The [React Bits circular gallery](https://reactbits.dev/components/circular-gallery) is an additional interaction reference, not an installed component.
Its curved presentation does not justify a new rendering dependency while the personal collections remain empty.

The scene remains deferred. Sakthi's background assets and GPU stack are separate from the reusable native theme-transition technique.

## Implemented result

The [October 18 refinement](visual-review-2026-10-18.md) follows the later explicit instruction to use the two supplied Debrato compositions.
The [current project overview](references/exact-mock-2026-10-18/projects-1440-light-100.png) shows all six full summaries, portrait covers and visible technologies in three columns and two rows.
The measured section is 857px high at 1440px. Native briefs retain full engineering context.
The [current-source receipt](references/exact-mock-2026-10-18/verification.json) separates rendered behavior from provider availability.
