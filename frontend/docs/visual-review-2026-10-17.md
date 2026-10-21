# Foreground reference review, October 17–18

**Owner:** Frontend visual review

CURRENT: this report records a fresh reference study and the initial local render. It does not establish final visual acceptance.
Background artwork remains DEFERRED under the owner's instruction.

## Controlling project correction, October 18

The latest instruction requires every project to remain visible together in its section on desktop.
This supersedes the earlier tall card treatment.
CURRENT: all six closed project summaries and actions fit within one desktop section, with three columns and two rows. The measured section is 726.56px high at 1440 × 900 in both themes. The [compact overview receipt](references/refinement-2026-10-17/projects-compact.json) retains the measurements and source identities.
Use compact media beside readable copy. Open deeper project briefs inline when requested.
Phones retain a natural vertical stack so readable text does not shrink to force six cards onto one screen.
The [final desktop capture](references/refinement-2026-10-17/projects-compact-desktop.png) shows all six full summaries and actions together. Tablet and phone captures retain reflow without horizontal overflow.

## Evidence read

All seven supplied clipboard images were recovered through their Linux `/mnt/c/Users/Debrato/AppData/Local/Temp/` paths and inspected.
The first two show complete Debrato compositions. The others show Anurag projects, Parth hackathons, Sakthi's scene, and Garvit's event wall and introduction.
These are reference inputs. Their sample employment, metrics, photographs, and events do not establish facts about Debrato.

The supplied 49.052-second recording first received a 25-frame sample.
The follow-up decoded all 1,343 video frames and generated 21 contact sheets, each with up to 64 numbered thumbnails.
All 1,343 thumbnails were inspected at 232 × 144. Selected project frames also received inspection at their original 2320 × 1440 size.
Full-resolution inspection covers those selected frames only.
The full sheets remain in `output/playwright/refinement-2026-10-17/video-all-frames/`.
The retained [component audit](video-component-analysis.md) contains earlier motion observations.
Fresh source reads also reached all four public websites and the component files below.
Those reads do not prove which source revision each deployed website runs.

The local comparison used the initial October 17 capture in `output/playwright/refinement-2026-10-17/before/`.
That render precedes the current refinement. Later screenshots must establish its outcome.

## Project density from the recording

[Anurag frame 245 at 8.8819 seconds](references/refinement-2026-10-17/video-anurag-projects-frame-245.png) shows two complete cards and two partial cards.
The fifth project appears later during the scroll. Approximate card dimensions are 460 × 670 source pixels.
The shared rails and two-column structure remain useful. That full card height conflicts with the latest complete-overview requirement.

[Parth frame 963 at 35.1552 seconds](references/refinement-2026-10-17/video-parth-projects-frame-963.png) shows all six complete cards together.
Its grid has three columns and two rows. Approximate grid bounds are x395–1904 and y296–1318 in the source image.
Individual cards measure about 480 × 500 source pixels, with heights that vary by content.
These are visual estimates in recording pixels, not CSS measurements.
Later frames crop the first row's media as the scroll continues, while all six titles and summaries remain visible.

The local implementation uses three columns and two compact rows with larger readable copy. Tablets use two columns; phones use one.
The key requirement is one complete overview of the projects, with optional depth inside that section.

## Complete sequence and frame differences

The [measurement receipt](references/refinement-2026-10-17/video-frame-analysis.json) records the analysis of all 1,343 full-frame hashes and all 1,342 adjacent frame comparisons.
Every decoded frame had a distinct hash. No duplicate frames were skipped.
The comparison used 464 × 288 images and mean absolute luma differences on a 0–255 scale.
Its median difference was 0.0699. A total of 764 adjacent pairs measured below 0.1, and 225 measured above 1.
Low-change pairs can contain cursor motion, compression noise, or small animation. They are not exact duplicates.
Tab changes, scroll, and background effects contribute to larger differences.
These metrics describe the recording. They do not establish website frame rate or input latency.

The following groups describe the visible component states across the full sequence. Times are approximate except the retained project frames.

| Recording interval | Visible state and structural lesson                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 0.06–6.35s         | Anurag's hero, about copy, and contact remain together. Content edges stay fixed.                                               |
| 6.35–8.30s         | Scroll connects about, contact, and projects through continuous rails.                                                          |
| 8.30–11.12s        | The two-column project grid moves through its first two rows and final fifth card. Full cards occupy substantial height.        |
| 11.12–14.95s       | Experience, open source, skills, writing, and activity follow the same reading column.                                          |
| 14.95–17.66s       | The footer stays stable while its quote fades and changes.                                                                      |
| 17.66–23.64s       | Sakthi's color trail moves through the day illustration. The foreground copy retains its position.                              |
| 23.64–24.19s       | A circular dark-theme wipe expands from the lower dock. Scene geometry remains aligned.                                         |
| 24.19–29.98s       | The same pointer treatment operates within the night scene.                                                                     |
| 29.98–30.26s       | A tab change briefly removes the page content. This is not a component transition.                                              |
| 30.26–34.95s       | Parth's event wall, hero, calendar, and experience appear through repeated vertical navigation. Five event cards share one row. |
| 34.95–35.19s       | The projects enter. Frame 963 contains the complete six-card overview.                                                          |
| 35.19–36.99s       | Continued scroll crops the top media. Project names and summaries remain grouped. Hover changes media previews locally.         |
| 36.99–40.32s       | Navigation returns through experience and the event wall, then changes tabs.                                                    |
| 40.32–42.72s       | Garvit's introduction and experience share the central column, surrounded by decorative rails.                                  |
| 42.72–44.35s       | Some introduction copy loses visibility while the portrait remains. Essential local copy must stay available.                   |
| 44.35–46.74s       | Achievement cards, activity matrices, and a progress chart repeat contained panel geometry.                                     |
| 46.74–49.03s       | Writing leads into the quote and contact panel. The closing composition stays stable.                                           |

## Ranked differences from the initial render

1. **Reading width and rails.** The 1440px render compresses the document into a narrow strip. Larger copy needs a wider, stable reading column. The side index belongs outside that column when enough space exists. Shared header lines should meet the same content edges.
2. **Project imagery.** The first four cards establish an image-led pattern. The last two repeat giant cover titles above the same titles below. Give those honest project-note covers their own visual composition within the compact overview. Preserve actual project states and supplied repository links.
3. **Hackathon weight.** The oversized empty image and disabled one-item carousel give missing media too much space. Use one compact paper record until original event photographs arrive. Parth's real images explain much of his wall's strength.
4. **Action density.** Photography repeats a gallery action in its heading and footer. One clear gallery action plus collection controls gives the strip a calmer ending.
5. **Shared scale.** Grow body text, labels, targets, and card padding together. Reserve handwriting for short margin notes. Keep dates and technical labels subordinate to project and section titles.

## Fresh component review and decisions

| Source component                                                                                                                                    | Useful pattern                                                                  | Decision for this portfolio                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Anurag: `src/components/Layout.tsx`](https://github.com/nodeanurag/my-portfolio/blob/main/src/components/Layout.tsx)                               | Shared 760px shell, continuous dashed rails, repeated section and gap geometry  | Adopt alignment and continuity. Use the larger local reading scale.                                                                                            |
| [Anurag: `src/sections/ProjectCard.tsx`](https://github.com/nodeanurag/my-portfolio/blob/main/src/sections/ProjectCard.tsx)                         | Image-first card, 4px lift over 300ms, 200ms details transition, grouped footer | Adopt restrained feedback and grouped actions within the compact overview. Keep native disclosure. Omit decorative REC/ISO labels and perpetual status pulses. |
| [Anurag: `src/components/command-palette.tsx`](https://github.com/nodeanurag/my-portfolio/blob/main/src/components/command-palette.tsx)             | Searches titles, descriptions, and categories. Small 200ms panel entrance       | Adopt grouped search and a quiet entrance. Retain existing Base UI focus containment, recovery, and empty-result handling.                                     |
| [Sakthi: `components/common/ThemeToggle.tsx`](https://github.com/sakthii05/portfolio/blob/main/components/common/ThemeToggle.tsx)                   | Native View Transition circle over 700ms, with a browser fallback               | Keep the theme geometry stable. Defer scene treatment. Do not enlarge the toggle's layout on hover.                                                            |
| [Garvit: `components/AchievementsHanging.tsx`](https://github.com/garvittsingla/portfolio/blob/main/components/AchievementsHanging.tsx)             | Reusable photo/body/footer frame, modest tilt, separate mobile arrangement      | Adopt repeated framing and restrained tilt. Avoid the elaborate rope and light system while only one event exists.                                             |
| [Garvit: `components/GithubContributionsSticky.tsx`](https://github.com/garvittsingla/portfolio/blob/main/components/GithubContributionsSticky.tsx) | Hatched cells, level selection, daily detail, public relay                      | Keep independent CSS hatching and explicit failure states. Reject its bundled-data fallback for a failed live request.                                         |

Parth's [live hackathon wall](https://mittalparth.dev/) confirms image-led paper cards with result, event, short story, and evidence links.
Its current source identity remains unverified. The old public template does not establish that wall's implementation.

## Other component research

The [React GitHub Calendar repository](https://github.com/grubersjoe/react-github-calendar) confirms a separation between calendar presentation and contribution retrieval.
The [cmdk repository](https://github.com/pacocoursey/cmdk) supplies a useful command-menu reference.
The [Embla accessibility documentation](https://www.embla-carousel.com/docs/plugins/accessibility) explains slide labels, live announcements, and reduced-motion behavior.
These are pattern references. The existing components already cover the needed interactions, so this review recommends no new dependency.
Circular gallery examples remain reference-only while original personal photographs are missing. Preserve drag, snap, pause, and open-gallery behavior without unnecessary WebGL.

## Creative GitHub directions

These are design options, not implementation claims.

| Rank | Direction                         | Benefit and data boundary                                                                                                 |
| ---- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1    | Calendar with an editorial total  | One accurate annual total, seven-row grid, selected-day detail, and quiet profile statistics. Best fit for the document.  |
| 2    | Calendar with a project chronicle | Sourced project periods below the matrix add a narrative. Do not assign daily contributions to projects without evidence. |
| 3    | Monthly summary                   | Derive monthly totals from the same validated daily records. Offer this as an optional view.                              |
| 4    | Repository shelf                  | Link real repositories beside the calendar. Keep repository facts separate from daily contribution claims.                |

## Smoothness criteria

The recording's stable edges and repeated geometry matter more than the number of animations.
Use small local transforms, short fades, and reserved quote and media dimensions.
Keep section copy available during motion. A collection change must move only the photography strip.
Honor reduced motion, pause automatic rotation, and retain keyboard access.
A still image does not establish frame pacing, scroll latency, or full accessibility.
