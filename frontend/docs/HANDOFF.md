# Current handoff

**Owner:** Continuation checkpoint

## Narrow column and hatched bands, October 20

CURRENT: the owner asked for the homepage structure of the supplied Anurag reference and chose the narrow-column option. The centered column now caps at 760px with 1px dashed rails at both edges; the header and footer share that column, while the hero artwork keeps its full-bleed background. Each section opens with a 58px hatched band that spans the viewport, carries a 1px border top and bottom and a 315-degree line pattern, and crosses both gutters behind the section label, rule, action, and project filters. The band replaces the old section top border and breaks the side rails. The INDEX is now a borderless list at 26vh: fixed in the gutter once the side gutter reaches 15rem (a 1240px viewport at the default root, with gaps of 74px at 1440, 138px at 1697, and 194px at 1920), a hero grid column between 880 and 1240px on a translucent paper wash, and the jump selector below 880px or with enlarged text. Project cards reflow to two 375px columns and three rows at desktop and one column at 639px and below; the expanded brief still spans the full row. `overflow-x: clip` keeps the 100vw bands from producing horizontal scroll.

| Check               | Observed result                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`     | Exit 0 on the final source: strict TypeScript, ESLint, Prettier, 23 unit and contract tests, production build, document checks, and 19 skill bundles.                                                                                                                                                                                                                                                             |
| Journey suite       | The full 91-check suite passes on Chromium, Firefox, and WebKit: 273 of 273, including the hatched-band borders, dashed rails, 760px centering, the 26vh gutter index with a 0px top delta, the 375px two-column cards, and the 941px hero index.                                                                                                                                                                 |
| Production journeys | 36 of 36 across the three engines on the production build, including both background pixel tests.                                                                                                                                                                                                                                                                                                                 |
| Rendered evidence   | Eleven captures with reduced motion and blocked external services: 1697px dark viewport and full page (replacing the stale 1697×500 capture), 1920px dark top and full page, 1440px light and dark top and full page, 941px light, and 390px light and dark. The receipt records a 760px content width, nine 58px bands, dashed rails, index placement, no horizontal overflow, and no page error in every state. |
| Measured geometry   | At 941px the content is 760px at x=90.5; about 211, projects 480, experience 232, hackathons 219, GitHub 260, skills 151, thoughts 163, photography 242, contact 120. Project cards are 375×129. Document height is 2650px at 941, 2654px at 1440/1697/1920, and 5591px at 390.                                                                                                                                   |
| Bounded review      | The detector reports only the pre-existing Inter-family note. `git diff --check` is clean. Scope is frontend styles, the journey tests, this handoff, the compact review follow-up, and the new capture folder. Work remains uncommitted.                                                                                                                                                                         |

The [narrow-column captures](references/narrow-column-2026-10-20/narrow-1697-dark.png) and their [receipt](references/narrow-column-2026-10-20/verification.json) record the rendered result; the full set also includes [1920 dark](references/narrow-column-2026-10-20/narrow-1920-dark.png) and its [top view](references/narrow-column-2026-10-20/narrow-1920-top-dark.png), [1440 light](references/narrow-column-2026-10-20/narrow-1440-light.png) and its [top view](references/narrow-column-2026-10-20/narrow-1440-top-light.png), [1440 dark](references/narrow-column-2026-10-20/narrow-1440-dark.png) and its [top view](references/narrow-column-2026-10-20/narrow-1440-top-dark.png), [941 light](references/narrow-column-2026-10-20/narrow-941-light.png), and [390 light](references/narrow-column-2026-10-20/narrow-390-light.png) and [dark](references/narrow-column-2026-10-20/narrow-390-dark.png). FE-012 remains PARTIAL for owner visual acceptance.

## Compact mockup convergence, October 19

CURRENT: the owner's newest mockup pass compacted the homepage toward the supplied 941px compositions. The content cap is now 1152px, so wide screens show real side gutters around the centered column. The header is 52px. Every section opens with a full-width rule and a small uppercase tracked label; the number stays muted on the rule line, and section notes moved into a 15 percent left rail as Caveat handwriting. The old hero handwriting note and its orange scribble underline were removed on the owner's request, so the hero is now only the copy and the index. The dead `--hero-inset` surplus and the old short title rules are gone.

Projects keep all six cards together with an 86 by 95 pixel cover, a 600 weight title with the repository arrow, two-line clamped summaries, and inline accent tag text. Expanded briefs were rebuilt with taste: an uppercase tracked meta row (field and period), an ink overview, tiny uppercase tracked group labels, dash list markers, and hairline group dividers. Contact is one segmented five-cell bar with divider borders that unwraps to chips below 640px. Skills now span the full column. Thoughts, Photography (76 pixel filmstrip covers), GitHub, and the footer keep their features with tighter paddings. Hackathons changed from a single-polaroid carousel to a five-polaroid clothesline with a drawn rope, clips, fan tilts, and rope-sag offsets.

The clothesline records are owner-supplied from the mockup: SVASTH (kept resume-reported), NASA Space Apps, HackCBS, Smart India Hackathon 2023, and Build with GenAI. Only SVASTH has resume evidence in this repository; the other four are presented as owner records without independent evidence, and earlier pending-evidence labels were replaced by that single qualifier.

The INDEX panel now detaches from the hero once a side gutter of at least 15rem exists beside the 1152px column (from 1632px at the default root size). At those widths it is `position: fixed` at 26vh from the top, in the right gutter and 96px clear of the content edge at 1920px, so it sits beside the hero and stays visible while scrolling. Between 880 and 1632px it remains the hero grid column whose right edge sits flush with the section rules, and below 880px, or with text enlarged beyond 128 percent, it stays the compact jump selector. The theme control is a two-state light/dark switch; the system option was removed from both the header control and the command palette, which now lists 24 commands.

| Check                    | Observed result                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`          | Exit 0 on the final source: strict TypeScript after a CatCompanion sprite-index fix, ESLint, Prettier, 23 unit and contract tests, production build, document checks, and 19 skill bundles.                                                                                                                                                                                |
| Rendered evidence        | Fourteen captures on the loopback preview with reduced motion and blocked external services: the original five at 941/1440/1697/390px plus nine follow-up captures covering the 1920px fixed index at the top and scrolled, 1440px in both themes, 941px, and expanded briefs at 1440px in both themes and at 390px. No state reports horizontal overflow or a page error. |
| Journey suite            | The full 91-check journey suite passes on Chromium, Firefox, and WebKit: 273 of 273 checks, including the 941px gutters, the fixed-index geometry at 1920px, the enlarged-text jump selector fallback, and the two-state theme persistence.                                                                                                                                |
| Section heights at 941px | About 179, Projects 333, Experience 178, Hackathons 175, GitHub 244, Skills 119, Thoughts 139, Photography 193, Contact 88. Project card 273 by 133 at 941px; 575px open at 1440px. GitHub and Photography stay above the mockup boards because they keep the live heatmap, legend, controls, and cover note.                                                              |
| Bounded review           | `git diff --check` clean. The changed scope is frontend styles, the portfolio feature components and content, the journey tests, plus this review and its captures. Background, Skills bundles, and dependencies were untouched.                                                                                                                                           |

The [compact convergence review](compact-convergence-2026-10-19.md), its [capture receipt](references/compact-convergence-2026-10-19/verification.json), and the [follow-up receipt](references/compact-convergence-2026-10-19/followup-verification.json) retain the rendered evidence. Work remains uncommitted and unpublished. FE-012 remains PARTIAL for owner visual acceptance, including confirmation that the four non-SVASTH hackathon records are correct owner claims.

## Section rhythm and border structure, October 19

CURRENT: the homepage section rhythm now follows the supplied Anurag-led structure more closely. Each section uses one title rule. Page-height vertical rails and duplicate top borders are removed. Row sections use short rules beside their labels, while full-width headings extend the rule to their action. Skills and the writing entry use the same quiet outlined-card treatment as the other compact content groups.

The final captures cover both themes at 941 and 1705 pixels, a 390-pixel phone, and a 320-pixel phone at 200 percent text size. All six projects remain together at desktop widths. No capture has horizontal document overflow or a page exception. External services were blocked, so the captures sent no page-view increment.

The complete readability file passed 54 of 54 checks across Chromium, Firefox, and WebKit. The final `npm run check` passed strict TypeScript, ESLint, formatting, 23 unit and contract checks, the production build, document checks, and 19 skill bundles. The mechanical detector returned no findings. The background, content records, generated covers, dependencies, and imported skills remain unchanged in this pass.

The [section rhythm review](section-rhythm-2026-10-19.md), [light comparison](references/section-rhythm-2026-10-19/comparison-light.png), [dark comparison](references/section-rhythm-2026-10-19/comparison-dark.png), and [capture receipt](references/section-rhythm-2026-10-19/verification.json) retain the final evidence. Current preview: http://127.0.0.1:5173/. Work remains uncommitted and unpublished. FE-012 remains PARTIAL for owner visual acceptance.

## Homepage width and generated covers, October 18

CURRENT: the owner's latest 1705px screenshot exposed an excessive inward offset that the preceding outer-centering checks missed. The homepage/header/footer cap is now 1520px instead of 1120px; archives keep a separate 1120px reading cap. At that viewport the content starts at 97px instead of 286px, hero copy at 145px instead of 334px, and the About body at 362px instead of 482px. The hero index ends at the shared content edge. The 941px reference proportions remain intact. This supersedes the earlier alignment conclusion below.

The owner explicitly authorized generated images. Four original graphite/watercolor covers now illustrate the three photography collections, existing writing entry and existing event. Local originals, WebP exports, exact prompts and hashes are retained. These are labeled illustrations; all personal photo arrays remain empty, no generated cover opens a photograph viewer, and the event keeps its resume-reported/pending-evidence state. The background is unchanged.

Image frames and labels occupy separate rows. Review found and corrected label overlap, a doubled-phone-text overflow from screen-reader labels lacking a nearby containing block, and a caption crossed by filmstrip decoration. Independent final review confirmed the corrected border and alignment. No external component, dependency or personal record was added.

| Check                      | Observed result                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`            | Exit 0 on final application/test source: strict TypeScript, ESLint, formatting, 23 unit/contract checks, production build, docs and 19 skill bundles. It caught an optional-prop typing error, corrected before the green run. Older capture-helper dead code was also removed while preserving provider blocking.                              |
| Related development matrix | 114/114 passed across Chromium, Firefox and WebKit before the final caption/optional-prop corrections. The earlier 96/114 attempt included obsolete layout expectations and real phone overflow; these were corrected before the green run.                                                                                                     |
| Final focused confirmation | 12/12 passed in 21.6s across all three engines after those final corrections: illustration loading, phone cover labels, doubled-text reflow and desktop alignment.                                                                                                                                                                              |
| Final production journeys  | 6/6 passed in 13.8s across all three engines on the final build: direct routes, automated Axe, PDF and development-asset boundaries. Background pixel tests were not rerun.                                                                                                                                                                     |
| Final rendered evidence    | Ten homepage and six archive states on the owner's 5173 preview, light/dark, desktop/phone, enlarged text and reduced motion. No document overflow or captured page exception. At 941px the full page is 2255px with a 338.56px project section; at 1705px it is 2161px with a 327px project section. All six desktop projects remain together. |
| Source/preservation        | All 15 captured application/asset hashes match. Five background sources match the turn baseline; four original and four exported illustration hashes match the asset manifest. Ten existing application files, one new illustration mapping, two browser tests and supporting docs/assets form this pass.                                       |
| Design and bounded review  | Changed-target detector returned no findings. Independent rendered review confirmed the one final caption fix. Bounded source diff and `git diff --check` passed.                                                                                                                                                                               |

The [width and cover review](width-covers-2026-10-18.md), [1705px before/after](references/width-covers-2026-10-18/comparison-1705.png), [light reference comparison](references/width-covers-2026-10-18/comparison-light.png), [dark reference comparison](references/width-covers-2026-10-18/comparison-dark.png), [capture receipt](references/width-covers-2026-10-18/verification.json) and [preservation receipt](references/width-covers-2026-10-18/preservation.json) retain evidence. Check logs are linked in the review. Original PNG files are in `assets/editorial/`, WebP exports in `public/images/editorial/`, and the built-in generation prompts in `assets/editorial/prompts.json`.

Visual captures block external providers and send no real page-view increment. Tests use controlled providers. This pass makes no live-provider acceptance, physical-device, complete accessibility or field-performance claim. The preceding unresolved WebKit light GPU-reveal check remains open; scene code and existing background assets were not changed. Original personal photographs, official event evidence and owner visual acceptance remain open under FE-012.

Current preview: http://127.0.0.1:5173/. Work remains uncommitted and unpublished. Existing dirty work and protected roots are preserved. The turn baseline is `/tmp/portfolio-width-covers-20261018-baseline/`; intermediate captures and the bounded diff are in `output/playwright/width-covers-2026-10-18/`. All earlier snapshots below are historical.

## Compact Mono foreground and wide-screen alignment, October 18

CURRENT: the latest owner request selects JetBrains Mono-led typography and then explicitly asks to compact the first paired comparison like its left reference. The implemented foreground now uses local Mono for interface roles and Inter regular for longer paragraphs, transparent surfaces, shared type/control/tag primitives and consolidated project-card styles. Desktop density is smaller; phone reading sizes and 44px touch controls remain. All six closed projects share three desktop columns and two rows with complete summaries, statuses and technologies, without browser zoom or clamps.

At 941px, both themes measure 2152px for the full page versus 2902px in the rejected Mono pass; the project section measures 338.56px versus 492.58px. At 1440px the final page is 2049px and the projects occupy 327px. The one real event record remains labeled as resume-reported with official evidence pending. No personal content, photo, metric or external component source was invented or copied.

The owner subsequently reported a tiny column pushed left on `http://127.0.0.1:5173/`. Fresh measurements on that exact URL and on 5187 showed centered content with no document overflow from 941 through 4272px; the exact reported left placement was not reproduced. A confirmed wide-screen inset defect was fixed: header and hero padding previously grew indefinitely with viewport width, reaching about 141px at 4272px. They now share a bounded 48px maximum, and the name stays on one line. A footer note that created a surplus grid row is hidden in the two-column closing layout. The compact sections also required moving the index activation line nearer the top of the viewport, so it no longer skips Projects when its short overview reaches the top.

Observed verification:

| Check                              | Result                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                    | Exit 0 on the final application/test source: strict TypeScript, ESLint, formatting, 23 unit/contract checks, production build, docs and 19 skill bundles. The first sandbox attempt could not bind the HTTP test server; the authorized loopback run completed.                                                                                                                                               |
| Related development matrix         | 125/132 passed before the final index/test corrections. Failures were the old archive-size expectation and the two section-position checks.                                                                                                                                                                                                                                                                   |
| Final typography/photography run   | 75/78 passed. The remaining three cases expected Photography to become current even when the compact page had already reached its bottom. The rail test now uses the middle Projects section to test an unambiguous reading position.                                                                                                                                                                         |
| Final focused navigation/archives  | 6/6 passed across Chromium, Firefox and WebKit after the compact activation-line change and updated reading scale.                                                                                                                                                                                                                                                                                            |
| Final wide-screen/index regression | 6/6 passed across all three engines, including 1920px/4272px centered geometry, a bounded matching wordmark/name inset, one-line name and enlarged-text rail accuracy. No single aggregate development invocation was fully green.                                                                                                                                                                            |
| Final production matrix            | 35/36 passed across all three engines. The light-theme WebKit GPU sample did not change after pointer input; the isolated rerun also failed. Other 29 background checks and all six production route/Axe checks passed. This unresolved pixel-reveal check is recorded rather than attributed to a timing issue. Background renderer, shaders, settings and artwork were not changed in this foreground pass. |
| Rendered evidence                  | Ten homepage captures cover light/dark, 941–4272px desktops, a phone and enlarged text; six archive captures cover desktop, phone and doubled text. No captured document overflow or page exception. Reference/current boards use the same 941px viewport.                                                                                                                                                    |
| Type review                        | The detector reports one explained Inter-family warning. The measured paragraph trial and rendered reading role justify retaining Inter for longer prose; the interface identity is Mono. Independent review caught the orphan separator and surplus footer row, both corrected.                                                                                                                              |
| Preservation                       | All 23 captured source fingerprints match. All five scene source files match the turn baseline. Fourteen existing source files, two new shared stylesheets, the font entrypoint/assets, two browser test files and supporting docs form this turn's change scope. Dependency manifests, lockfile, imported skills and root files remain preserved.                                                            |

The [foreground review](mono-refinement-2026-10-18.md), [selected identity](../DESIGN.md), [light comparison](references/mono-2026-10-18/comparison-light.png), [dark comparison](references/mono-2026-10-18/comparison-dark.png), [actual 5173 wide capture](references/mono-2026-10-18/alignment-5173-1920.png), [capture receipt](references/mono-2026-10-18/verification.json), [alignment measurements](references/mono-2026-10-18/alignment-final.json) and [preservation receipt](references/mono-2026-10-18/preservation.json) retain the review evidence. Check logs live alongside them. Providers were aborted in visual captures to keep unavailable states honest and avoid real counter increments; browser tests use explicit fixtures.

FE-012 remains PARTIAL for owner visual acceptance, including confirmation of the reported outer displacement in the owner's active browser. The WebKit light GPU check, original photographs and official event evidence remain open. Current preview: http://127.0.0.1:5173/; the separate 5187 preview serves the same current source. Work is uncommitted and unpublished. The turn baseline is `/tmp/portfolio-mono-20261018-baseline/`; intermediate captures and the bounded source diff remain in `output/playwright/mono-2026-10-18/`. Earlier snapshots below are historical.

## Interactive sketch-to-color hero, October 18

CURRENT: FE-007 implements the owner's later background brief. The existing hero now carries a single dependency-free WebGL reveal, with accumulated soft cursor/touch strokes, animated fBm mask deformation and a temporary color trail. Foreground section geometry, content, navigation, saved theme logic and name scramble remain in their existing owners. Only the scene's placement moved into the hero.

All four supplied originals are 1672 × 941 RGB PNG and retain their exact filenames and hashes. Light maps Graphite Mountain Lake Overlook to Watercolor Valley Vista with Laptop Traveler; dark maps Moonlit Mountain Solitude to Moonlit Mountain Lake Stargazer. The main mountain, traveler, laptop, cliff and moon match within each pair. Fine clouds, flowers and watercolor detail differ. Identical cover coordinates and a narrow organic boundary preserve structural registration without modifying source images; exact correspondence of every illustrated detail is not claimed.

`sceneArtwork.ts` centralizes artwork and settings: 115px reveal radius, 0.38 edge softness, 0.65 noise intensity, 0.45s trail persistence and 1.8s fade. GPU resolution caps at 1.5× and 1.5 million pixels; the mask's longest dimension is 640px. Both sketches remain independent DOM fallbacks. Reduced motion skips renderer allocation; loss/failure retains the correct sketch. Rendering stops after settling and resets offscreen/hidden. Theme changes clear the field, invalidate stale decodes and switch the image pair together. Passive input preserves clicks and native scrolling.

Independent source review found a context-loss/decode race that could re-expose the invalid canvas after a theme switch. A failing browser regression reproduced it. Context loss is now terminal for that renderer, invalidates pending loads and blocks post-decode success. Six focused regression checks passed across three engines; the reviewer found no remaining blocking issue in the fix.

Observed final verification:

| Check                         | Result                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`               | Exit 0 on the final application and test source: strict TypeScript, ESLint, formatting, 23 unit/contract checks, build, docs and 19 skill bundles.                                                                                                                                                                                                                            |
| Focused development           | 30/30 passed across Chromium, Firefox and WebKit. Command: `PORTFOLIO_E2E_PORT=5198 npm run test:e2e -- tests/e2e/background-scene.spec.ts --workers=1 --output=test-results/scene-final`.                                                                                                                                                                                    |
| Expanded production           | 36/36 passed across all three engines via `npm run test:e2e:production -- --workers=1`, including all 30 scene cases and the existing six production journeys/Axe checks.                                                                                                                                                                                                     |
| Broad serial development      | 255/261 passed. Four failures selected Vite JavaScript URL wrappers in the image-test helper; it now selects actual image initiators. One WebKit touch case timed out and passed in both final feature suites. One existing WebKit synthetic-editor test raced modal focus restoration.                                                                                       |
| Keyboard recovery             | The editor test now waits for closed dialog and restored invoker focus before inserting/focusing the editor. Original shortcut assertions remain. All 3/3 engine cases passed; no palette application logic changed.                                                                                                                                                          |
| Combined development boundary | Every case was observed passing across broad and final focused runs. No single aggregate development invocation was fully green.                                                                                                                                                                                                                                              |
| Visual and timing receipt     | Sixteen captures cover both sketches, reveals, multiple-position trails, fully faded states, 320–1920px layouts, reduced motion and context loss. No captured overflow or page/rendering error. Median local Chromium frame spacing was about 16.7ms, p95 17.1–17.3ms, with zero idle draws after settling. Both themes' initial/faded screenshots had zero differing pixels. |
| Preservation and review       | All 13 capture/test source fingerprints match. All four original image hashes match the turn baseline. The 602 baseline-covered files outside the explicit scope allowlist remain unchanged. The mechanical scan returned no findings; bounded diff and whitespace checks passed.                                                                                             |

The [background review](sketch-to-color-background.md) records the complete file list, image mapping, crop/registration findings, lifecycle and configuration. The [comparison board](references/sketch-to-color/comparison.png), [capture receipt](references/sketch-to-color/verification.json), [preservation receipt](references/sketch-to-color/preservation.json), [development scene log](references/sketch-to-color/development-scene.log), [broad run log](references/sketch-to-color/development-full.log), [production log](references/sketch-to-color/production.log), [keyboard recovery](references/sketch-to-color/keyboard-recovery.log) and [quality log](references/sketch-to-color/quality.log) retain the evidence. The capture script is preserved alongside them. Earlier snapshots below remain historical.

Limits: unchanged originals total 12,394,517 bytes, so warming both image pairs costs roughly 12.4MB. Browser caching and bounded GPU use do not remove that first-load cost. Phone evidence is browser viewport/touch emulation, not physical-device acceptance or field Core Web Vitals. Local timing is not a universal GPU guarantee. Context restoration remains a static fallback until remount or a motion-preference recreation. Axe does not prove full accessibility conformance. Overall foreground owner acceptance (FE-012), original photographs and official event evidence retain their prior boundaries.

Visual captures deliberately abort external profile/calendar providers and intercept the counter at 42. Two resulting provider network errors are separately recorded; no page/rendering exception was captured and no real counter increment was sent. The final production rerun followed completed builds; an earlier preview run saw a transient root 404 during overlapping local builds and is not the acceptance receipt.

The interactive preview is http://127.0.0.1:5187/. Work remains uncommitted and unpublished. Dependency manifests, imported skills, root files and unrelated application work remain preserved. Additional diagnostic logs and intermediate reference captures remain under `output/playwright/sketch-reveal/`; the turn baseline is `/tmp/portfolio-reveal-baseline/`.

## Smaller scale after owner feedback, October 18

CURRENT: the owner said the site felt too zoomed in. This instruction supersedes the preceding enlarged typography and size targets. The supplied section structure and all six visible desktop projects remain.

The desktop body now measures 16px instead of 20px, the name caps at 64px instead of 80px, controls measure 36px instead of 52px, and the document caps at 1120px instead of 1280px. Project titles, metadata, portraits and statistic numerals follow the smaller hierarchy. The intermediate desktop breakpoint no longer causes a body-size jump. Phones and coarse pointers retain larger controls.

At 1440px, the six-project section measures 429.17px in both themes, down from 612.09px. The full page measures 2670px, down from 3275px. At 941px, the project section measures 497.33px and the full page measures 2840px. Summaries and technologies remain complete in three columns and two rows. No browser zoom, transform or content clamp simulates this density.

The first rendered pass caught a small index overlap at 941px and a decoration touching enlarged phone snapshot text. The final pass clears the index above About and hides that phone decoration. Independent visual review found the new scale balanced and recommended no further size reduction in this pass.

Observed verification:

- `npm run check`: exit 0, including strict TypeScript, ESLint, formatting, 23 unit/contract checks, production build, document validation and 19 skill bundles.
- The related three-engine matrix passed 116/120 checks in 4.3 minutes. Three expectations still assumed the wider canvas could not fit an enlarged-text rail. One real-time quote check missed its short fade state.
- The updated rail expectations and controlled animation clock passed six of six checks across all three engines in 28.9 seconds. Fade state, changed quote and stable footer assertions remain. No application animation changed. No single aggregate development invocation was fully green.
- Final production checks passed six of six across all three engines in 19.7 seconds.
- Eight final captures cover both themes at 941px/1440px, 1920px, 390px, 320px with doubled text and 941px with 150 percent text. All use normal browser zoom and show no document overflow or captured page error.
- The mechanical scan returned no findings. All thirteen recorded source hashes and retained artifact hashes match. The bounded source diff and whitespace check passed.

The [scale review](scale-correction-2026-10-18.md) links both same-viewport before/after boards. The [current receipt](references/scale-correction-2026-10-18/verification.json) retains screenshots, geometry, source identity and check logs. Earlier receipts below are historical for their respective sources.

Only five stylesheets, two test files and supporting documentation changed in this pass. No personal-content record, application behavior, background, dependency or imported skill changed. Desktop captures read public GitHub data and convert counter increments to reads. Phone and enlarged-text captures abort providers for unavailable states. Tests intercept public services.

FE-012 remains PARTIAL for owner visual acceptance. Original photographs, official event evidence and final backgrounds retain their existing boundaries. Automated checks do not establish complete accessibility conformance or field performance.

The preview remains at http://127.0.0.1:5187/. The turn baseline is `/tmp/portfolio-scale-20261018-baseline/`. Scripts and intermediate captures remain under `output/playwright/scale-correction-2026-10-18/`. Work remains uncommitted and unpublished. Unrelated dirty work and protected roots remain preserved.

## Same-width screenshot correction, October 18

CURRENT: this snapshot supersedes the two earlier October 18 layout snapshots below. The owner rejected their fidelity and requested side-by-side comparison with both supplied screenshots, corrected structure/spacing/size/alignment, all projects visible together, and no background work.

Both supplied files are accessible through their Linux `/mnt/c/Users/Debrato/` paths. Fresh comparisons now use the exact 941px reference width in both columns. The previous layout measured 5,024px at that width and incorrectly triggered tablet stacking. The current page measures 3,100px in both themes. It preserves the reference's information structure but is not pixel-exact: six real projects, longer sourced records, larger text and pending owner media differ from the samples.

The hero retains its readable right index at 941px. About prose, experience, skills and the body rails share the reference reading edge. Experience keeps three columns, skills keep five groups, and Contact keeps one desktop action row. Hackathons, writing and photography now use full-width heading bands above their note/body layout. The gallery action shares its heading; photography controls occupy the left rail. One compact paper record preserves the one sourced event.

All six closed projects use three columns and two rows at 941px and 1440px. The complete section measures 647.22px and 612.09px respectively in both themes. All titles, full summaries and brief controls fit together in a 900px viewport. The title holds any supplied repository link, and the top-right native control opens complete engineering evidence. Compact desktop summaries use the full card width below the portrait/heading. Smaller tablets use two columns; phones use one.

The enlarged-text visual review caught a defect that zero-overflow checks missed: phone navigation and Contact labels formed vertical letter stacks. A new check reproduced Home occupying four lines before the CSS correction. Whole navigation labels now scroll within their container, Contact columns adapt to text size, and narrow project names move below the portrait. The unchanged one-line label assertions passed in all three engines.

A final motion check reproduced WebKit retaining a stale media-query object after a fresh query already reported reduced motion. Each active name-animation frame now reads a fresh query. The original start-scrambled and 20ms-settled assertions remain unchanged. The exact failing native/clock boundary now resolves correctly, followed by nine planned serial checks across three engines.

Observed verification:

| Check                               | Result                                                                                                                                                                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Final quality gates                 | `npm run check`: exit 0 on frozen application source; strict TypeScript, ESLint, formatting, 23 unit/contract checks, production build, document validation and 19 skill bundles. The initial sandboxed contract run hit loopback EPERM; the permitted rerun passed. |
| Initial complete development matrix | 221/228 passed in 5.8 minutes. Three old tablet assertions still expected two columns at 941px; one project font bound differed by 0.0032px; one motion timing assertion and two Firefox setup/navigation checks failed.                                             |
| Final focused matrix                | 128/129 passed serially in 5.7 minutes across Chromium, Firefox and WebKit. All layout, project, activity, focus, reflow and Axe checks passed. The remaining WebKit motion failure exposed the cached-query defect.                                                 |
| Final motion recovery               | Nine of nine planned serial checks passed in 16.6 seconds after the fresh-query correction. The original two assertions were not changed. No single aggregate development invocation was fully green.                                                                |
| Final production                    | Six of six checks passed in 28.6 seconds across all three engines on the final source build, including routes, public PDF, automated Axe and development-asset exclusion.                                                                                            |
| Final rendered review               | Seven final cases cover both themes at 941px/1440px, 390px, 320px with doubled text, and 941px with 150 percent text. No document overflow or captured page error. Independent review found no remaining structural or control-readability blocker in these states.  |
| Source and artifacts                | All thirteen recorded application-source hashes match. Durable image, script and check-log hashes match their receipt.                                                                                                                                               |
| Mechanical scan and bounded diff    | The final scan returned no findings. The bounded source diff and `git diff --check` passed.                                                                                                                                                                          |

The [same-width comparison review](screenshot-comparison-2026-10-18.md) records component changes and the remaining visual differences. The [current receipt](references/screenshot-comparison-2026-10-18/verification.json) retains both paired boards, full pages, component crops, phone controls, source identity and exact check boundaries. The motion receipt records the stale/fresh query observations. Earlier receipts below are historical for their respective sources.

All four final desktop captures read the public GitHub profile/calendar and show connected calendar/counter states. Every counter increment is intercepted and converted to a read. Phone/enlarged captures abort providers for unavailable states. Browser tests use controlled providers. No final screenshot uses fixture counts or invented personal media, and none forwards a counter increment.

Original photographs, official event evidence and final background artwork retain their existing missing/deferred status. No dependency, imported skill, personal-content record or background source changed in this pass. FE-012 remains PARTIAL for owner visual acceptance; screenshots and automated checks do not establish complete accessibility conformance or field performance.

The preview remains at http://127.0.0.1:5187/. The turn baseline is `/tmp/portfolio-comparison-20261018-baseline/`. Additional scripts/intermediate evidence remain under `output/playwright/side-by-side-2026-10-18/`. Work is uncommitted and unpublished. Protected roots and unrelated dirty work remain preserved.

## Supplied light/dark structure, October 18

CURRENT: the owner explicitly selected the first two supplied Debrato compositions as the homepage structure.
This supersedes the earlier large-heading composition. Small uppercase labels, shared left gutters and compact divided rows now organize the foreground.
The hero includes its index at ordinary desktop widths. Wider layouts use an outer rail when it fits. Smaller widths and enlarged text retain the native selector.
About prose and its snapshot stack on phones. The index stays within the hero and clears About.

All six closed projects form three desktop columns and two rows, with portrait covers, full summaries, visible technologies and native briefs.
The complete section measures 857px at 1440px in both themes. Closed card actions align. Tablets use two columns and phones use one.
One compact landscape hackathon record preserves the sourced result and pending media. Writing uses a quiet article row with one archive entry point.
Calendar and profile panels sit side by side on desktop. Each theme has increasing activity intensity and a readable hatched legend.

Two reproduced interaction defects are fixed. Pause or focus now cancels an in-flight quote fade without replacing the focused source.
Reopening command search during its exit cancels the pending action, clears the query and preserves keyboard use.
The new regressions failed before these fixes. The layout regression also caught the index crossing into About.

The independent reference agent revisited all 1,343 video thumbnails across 21 sheets and inspected selected larger component frames.
Fresh active-source reads checked Anurag, Sakthi and Garvit. The owner's supplied compositions control layout where their structure differs from Anurag's code.
No personal source or media was copied. No dependency was installed.
The [latest review](visual-review-2026-10-18.md) records the comparison and reuse decisions.

Observed verification:

| Check                       | Result                                                                                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Non-browser quality gates   | `npm run check`: exit 0, including typecheck, ESLint, formatting, 23 unit/contract checks, build, docs and 19 skill bundles                                                                           |
| Complete development matrix | 214/219 passed in 5.8 minutes. Three failures still used the removed duplicate archive-link selector. Two Firefox checks timed out during page setup/teardown.                                        |
| Focused recovery            | Updated the counter journey to use the visible article title. All 15 counter/cursor checks passed serially across three engines in 36.4 seconds. No application code changed after the full matrix.   |
| Combined browser evidence   | Every one of the 219 checks was observed passing across the full and focused runs. No single aggregate invocation was fully green.                                                                    |
| Production                  | Six checks passed across Chromium, Firefox and WebKit in 17.8 seconds, including routes, Axe, PDF and development-asset exclusion.                                                                    |
| Interaction and activity    | Earlier focused runs passed 36 interaction checks and 24 contribution checks across all three engines.                                                                                                |
| Rendered review             | Seven integrated cases cover both desktop themes, 1024px, 390px, 320px, 1760px and enlarged text. No document overflow or captured page errors. Independent final visual review found no new blocker. |
| Activity states             | Three fresh ready/error captures include 320px doubled text. Theme intensity is monotonic, panels align and labels remain complete.                                                                   |
| Mechanical design scan      | One completed scan returned no findings. The context loader noted an older product-context format. Optional `init` owns that separate refresh.                                                        |

The [current receipt](references/exact-mock-2026-10-18/verification.json) retains source hashes, screenshots, measurements and exact check boundaries.
All recorded source and screenshot hashes match. Screenshot providers are intercepted or aborted. Controlled calendar counts do not claim live personal activity or increment the public counter.
Additional captures and scripts remain under `output/playwright/exact-mock-2026-10-18/`.
The bounded root-file baseline is `/tmp/portfolio-20261018-structure-baseline/`.

Original photographs, official event evidence and final background artwork remain missing or deferred.
FE-012 remains PARTIAL for owner visual acceptance. Automated checks do not establish complete accessibility conformance or field performance.
The preview remains at http://127.0.0.1:5187/. Work remains uncommitted and unpublished. Protected roots and unrelated dirty work remain preserved.

## Video-driven compact overview and source reuse, October 18

CURRENT: the latest instruction controls project density: every closed project must remain visible together in the desktop section.
All six sourced projects now form three columns and two rows. At 1440 × 900, the complete section measures 726.56px in both themes.
Titles, full summaries, status and brief actions remain visible together. Summaries are not clamped. Tablets use two columns and phones use one.
Technology lists, engineering notes, limits and sources remain inside keyboard-operable native briefs. Filters preserve the section hash, scroll position and focus.

The shared reading scale, controls and content width grew together. The index now measures available space at the current text scale and retains the selector until it fits.
The hero reserves space for its margin note. Calendar expansion focuses the selected day; Escape restores its control. Phone profile statistics use complete label/value rows.
The palette preserves editor shortcuts, uses native external links and shrinks for filtered results. Name and quote animations honor preference changes without moving their containers.

The follow-up recording review decoded all 1,343 frames. All thumbnails were inspected across 21 sheets, and selected key frames received full-resolution inspection.
All 1,342 adjacent frame pairs were measured. These observations describe the recording, not website frame pacing.
The [video review](visual-review-2026-10-17.md) retains the component sequence and the distinction between Anurag's longer project scroll and Parth's complete six-card overview.
The [reuse review](component-reuse-review.md) traces active source imports, exact revisions, dependencies and local counterparts across the three supplied public repositories.
No personal-repository component or media was copied, and no dependency was installed.

The later component comparison removed the single-event carousel controls and repeated pending-media explanation.
Only the one sourced event remains. Mobile Polaroids stop transform transitions: resizing to 320px with doubled text previously caused temporary horizontal overflow while the desktop tilt unwound.
The existing calendar regression reproduced this whole-page defect. The immediate overflow assertion remains unchanged.

Observed final verification:

| Check                                 | Result                                                                                                                                                                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                       | Exit 0 on final application source: strict TypeScript, ESLint, formatting, 23 unit/contract checks, build, document structure and 19 skill bundles                                                                                |
| Final development matrix              | 206 of 207 passed. The sole miss was a Chromium shortcut-close timeout during high machine load. The exact journey then passed unchanged in an isolated three-engine run, 3 of 3. No single aggregate invocation was fully green. |
| Focused project/layout journeys       | 99 passed across Chromium, Firefox and WebKit before the final navigation-only filter and decorative ARIA corrections                                                                                                             |
| Filter navigation                     | Six checks passed across all three engines after the reproduced hash-loss defect was corrected                                                                                                                                    |
| Single-event presentation             | Three checks passed across all three engines after controls and repeated copy were removed                                                                                                                                        |
| Final production build/browser checks | Six passed across all three engines, including direct routes, public PDF, fixture exclusion and automated Axe                                                                                                                     |
| Final rendered evidence               | Both project themes at 1440 × 900, four full homepage cases at 1440/390/320px, current event crops, plus enlarged-text index, hero and status confirmation                                                                        |
| Source/evidence consistency           | Current project and homepage capture source hashes match the worktree. Captures block profile, contribution and counter providers and do not establish live-service availability.                                                 |
| Bounded review                        | Independent component/source review found no remaining compact-grid blockers. Its filter finding was reproduced and corrected. Whitespace check passed.                                                                           |

The [current-source project receipt](references/refinement-2026-10-17/final-validation.json), [home confirmation](references/refinement-2026-10-17/confirmation.json), [project geometry](references/refinement-2026-10-17/projects-compact.json) and [frame analysis](references/refinement-2026-10-17/video-frame-analysis.json) retain evidence and limits.
The selected final project images are `projects-final-light.png` and `projects-final-dark.png` in that directory.
The owned preview remains at http://127.0.0.1:5187/.

Original personal photography, official event media and final background artwork remain missing or deferred under their existing boundaries.
Automated Axe is not complete accessibility conformance. Local tests and recording analysis are not field performance evidence.
The initial baseline capture did not reliably isolate the counter; do not use its counter value as evidence. Final captures and browser journeys isolate providers.
The mechanical design scan returned no findings before the later compact-overview correction; it was not rerun as a substitute for final rendered review.
Impeccable also identified the existing legacy PRODUCT.md schema. Its `init` workflow owns that optional refresh; the requested frontend work did not change it.
FE-012 remains PARTIAL for owner visual acceptance. The compact-overview criterion is implemented and measured.
No commit, push, publication or deployment was performed. Pre-existing dirty work and protected roots were preserved.

## Single-page portfolio override, October 15

CURRENT: the controlling UX contract is implemented. The application route tree
contains `/`, `/blogs`, and `/photography`; unmatched addresses render the shared
not-found recovery. Project, case-study, hackathon, achievement, article-detail,
photography-collection, and development-toolkit routes are absent.

The homepage now carries all six sourced projects. Each card keeps its status,
summary, technology list, and verified repository action visible, with overview,
engineering detail, limitations, and sources in one native inline project brief.
Project hashes and command-palette commands scroll to the matching card, open its
brief, focus its title, and preserve browser history.

Experience, skills, GitHub activity, and contact remain direct homepage sections.
The SVASTH record is an inline keyboard-operable Polaroid carousel with honest
pending-media copy; its controls are disabled while only one verified record
exists. Writing previews lead to `/blogs`, where published work links to its
original publication. Homepage photography cards lead to collection anchors on
`/photography`; that route renders every collection and uses the existing
focus-managed lightbox for published images.

Observed verification:

| Check                            | Result                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New single-page browser contract | Five focused checks passed in Chromium, then the same project, route, hackathon, and lightbox journeys passed in Firefox and WebKit during the full matrix                                                                                                                                                                                                                                                  |
| `npm run check`                  | Exit 0 before the final evidence note: strict TypeScript, ESLint, formatting, 23 unit/contract checks, production build, documents, and 19 skill bundles                                                                                                                                                                                                                                                    |
| Production browser suite         | Six passed across Chromium, Firefox, and WebKit; all three approved routes reload and legacy detail paths recover as not found                                                                                                                                                                                                                                                                              |
| Development browser matrix       | Every one of the 174 checks was observed passing. The configured parallel run completed 172/174; both WebKit misses passed in isolation and in the later serial run. The serial run completed 173/174; its only miss was an unrelated Firefox reload timeout in the existing theme-persistence check, which passed immediately in an isolated Firefox rerun. No single aggregate invocation was fully green |
| Reflow and accessibility         | Home passed the existing 320px, 200 percent text, reduced-motion, keyboard, and automated Axe checks in all three engines; the new Polaroid contrast and narrow rotation overflow were corrected before the final matrix                                                                                                                                                                                    |
| Rendered review                  | Current full homepage captures were inspected at 1440px and 320px; `/blogs` and `/photography` were inspected at 390px. The shared cream/charcoal editorial system, six-project flow, inline event record, and complete gallery remained coherent without document overflow                                                                                                                                 |
| Mechanical design scan           | One generic existing `overused-font` warning pointed at the retained Instrument Serif declaration. No font or dependency was changed to suppress it                                                                                                                                                                                                                                                         |

The original photograph collections, official event media, and final background
artwork remain missing external inputs. Browser-only gallery images qualify the
lightbox behavior but are not published personal media. Automated Axe checks do
not establish full accessibility conformance, and local rendered checks do not
establish field performance or owner visual acceptance. FE-012 therefore remains
PARTIAL while FE-013 records the verified information-architecture override.

No dependency was installed. No commit, push, publication, or deployment was
performed. Work remains uncommitted.

## Latest reference-composition refinement, October 15

CURRENT: FE-012 remains PARTIAL for overall visual acceptance. The owner supplied seven target references and asked to keep improving. All seven images were recovered through WSL and inspected.
The [new composition review](reference-composition-review.md) supersedes the earlier narrow layout correction and its visual-completion claims.

The wider reading column preserves the approved larger text. Four existing projects now form a two-column desktop grid with aligned footers, real project states, native engineering disclosures and supplied repository links.
The home includes UniSpace from the existing archive. Its new original concept cover is imaginary architecture, not a personal campus photo or application screenshot.
The three earlier original PNGs now also supply sharp responsive WebP sources. The generated UniSpace source, prompt and exports are retained through the asset receipts.
Section spacing, experience alignment, grouped skills, the smaller hanging record and the photography footer follow the selected reference roles.
The article title opens its existing detail route. The calendar keeps seven rows and square compact cells. Populated photography uses larger image frames and retains its pause and reduced-motion behavior.

Observed final checks:

| Check                          | Result                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                | Exit 0: typecheck, lint, formatting, 23 unit/contract checks, production build, document checks and 19 skill bundles                              |
| Full development browser suite | 150 passed across Chromium, Firefox and WebKit on the final source and artwork                                                                    |
| Final production browser suite | Six passed across the same engines                                                                                                                |
| Batched rendered confirmation  | Both themes at 1760, 1440, 1024, 768, 390 and 320px; no document overflow, captured page errors or listed automated Axe violations in those cases |
| Enlarged text and motion       | Existing browser journeys passed for 200 percent text, quote/name geometry, section jumps, keyboard recovery and populated gallery rotation       |
| Live public-provider read      | GitHub profile and public calendar relay returned HTTP 200; the screenshot capture replaced counter hit requests with read-only get requests      |
| Asset/build consistency        | Every public project WebP hash matches the copy in the current production build                                                                   |
| Read-only source review        | No blocking or important findings. Reviewer did not run tests                                                                                     |
| Mechanical design scan         | One generic warning on the existing Instrument Serif font declaration; selected typography retained to match the approved references              |

The first project checks failed before the new grid and disclosure existed. The first larger run passed 102 of 108 checks.
It caught a real doubled-text photography action overflow and a test locator that incorrectly assumed the native summary used a standard button role.
The link now shrinks and wraps. The test uses its accessible label and verifies Enter activation. A targeted six-check run passed, followed by the clean final full suite.
The rendered comparison also caught unequal footer geometry and low-resolution covers, both corrected before the final confirmation.

[Durable receipts and screenshots](references/reference-composition/verification.json) retain final hashes and the separate controlled/live boundaries.
Additional captures are under `output/playwright/reference-composition/`. The source baseline is `/tmp/portfolio-reference-composition-baseline/` because the pre-existing frontend remains untracked.
The existing preview responds at http://127.0.0.1:5187/. No counter increment was forwarded during the captures.

Original gallery photographs, official event media and the final four background images are still missing. Those boundaries stay unchanged.
These checks establish the recorded journeys and states. They do not establish perfect visual acceptance, full accessibility conformance or field performance.
No dependency was installed. Protected roots and unrelated dirty work were preserved. Work remains uncommitted and unpublished.

## Prior narrow correction after owner report, October 15

CURRENT: FE-012 is PARTIAL. The owner reported a broken foreground and supplied two screenshots. Both attachments were recovered through their WSL paths and inspected.
The earlier passing checks missed guides crossing content, an empty skills gutter, cramped index labels and phone collection wrapping.
The [correction review](reported-layout-review.md) records their causes and before/after evidence. It supersedes earlier visual-completion claims.

The guides now sit outside the content. Skills use the full section width. The index fits its labels, appears only beside a wide enough reading column and scrolls within short windows.
Collection cards use grid columns for their thumbnail, label and arrow. Larger text and the current content remain intact.

Observed verification on the corrected source:

- Three new layout regressions failed before their respective fixes.
- Readability and photography browser files: 54 passed across Chromium, Firefox and WebKit, including section navigation, enlarged text, motion and gallery controls.
- `npm run check`: exit 0, including 23 unit/contract checks, production build, document structure and 19 skill bundles. The ordinary sandbox blocked loopback HTTP tests; reviewed loopback execution passed.
- Fresh before/after captures cover ten widths from 320px through 1760px. Five additional theme/text states report no document overflow, captured page errors or listed Axe violations.
- The full development and production browser suites were not rerun for this bounded CSS correction. Prior suite counts below are historical.

[Durable evidence](references/reported-layout/verification.json) retains source hashes and limits. Additional captures are in `output/playwright/reported-layout/`.
The captures block the counter and calendar relay; profile states are controlled. They do not prove live providers or add personal page views.
Personal photographs remain missing. Background work remains deferred. Overall visual acceptance remains open after the owner's rejection.
No dependency was installed, and work remains uncommitted and unpublished. The existing preview responds at http://127.0.0.1:5187/.

## Prior approved refinement, October 15

CURRENT: FE-012 is DONE_VERIFIED. The owner approved the sketch-ledger direction and larger reading scale in chat.
Shared body, secondary and label styles now enlarge the home, archives, details, calendar and dialogs.
Serif section titles establish a stronger hierarchy. Project frames, card padding and interaction targets grow with the text.
The calendar uses hatched daily cells, visible month labels and contained scrolling with keyboard access in every provider state.
Profile failures describe unavailable data without asserting a rate limit or a working calendar.
Retry controls, section navigation and photography arrows use the same larger interaction scale.

Populated photography collections rotate every six seconds while visible. Hover, focus, manual input, hidden-page state and reduced motion stop automatic movement.
The Play/Pause control reserves its width, so focus does not move the neighboring arrow before a click completes.
Empty personal collections remain still. Browser-only test images qualify rotation behavior without publishing invented personal media.
Original photographs, official event evidence and final backgrounds retain their existing external boundaries.

The [component review](component-motion-review.md) now separates the prior audit from the implemented refinement.
The [durable rendered receipt](references/sketch-ledger/receipt.json) retains current desktop, mobile, calendar, palette and failure-state evidence.
Additional full-page and intermediate-width captures remain in `output/playwright/sketch-refinement/`.
The source folder baseline in `/tmp/portfolio-sketch-refinement-baseline/` supported a bounded diff review because the existing frontend remains untracked.

### Latest observed checks

| Check                                            | Result                                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                                  | Exit 0: TypeScript, ESLint, formatting, 23 unit/contract checks, build, documents and 19 skill bundles                          |
| Full development browser suite                   | 138 passed across Chromium, Firefox and WebKit                                                                                  |
| Production browser suite against the final build | Six passed across the same engines                                                                                              |
| Rendered review                                  | 1440, 941, 768, 390 and 320px, including both themes, with no horizontal document overflow                                      |
| Automated Axe in the captured states             | No listed A/AA violations, including the unavailable calendar at 320px                                                          |
| Enlarged text                                    | Home and five archive/detail surfaces fit 320px with doubled root text                                                          |
| Visible controls in the rendered scan            | No measured visible target below 44px high. Closed engineering-note links were excluded from the visible scan                   |
| Live public calendar read                        | The public relay populated the hatched calendar. Profile and page-view providers were blocked for controlled error-state review |
| Mechanical design detector                       | No findings in its initial completed visual pass. The later playback-width correction passed the browser checks                 |

The initial four regression checks failed for the expected text-size, calendar-access, error-copy and retry-size defects.
The first full browser run passed 136 checks and exposed the new photography control shift in Firefox and WebKit.
An event trace showed that pausing on focus reduced the Play/Pause width and moved the arrow between pointer-down and pointer-up.
The fixed-width control passed the targeted three-engine check, followed by the clean full 138-check run.

The ordinary sandbox blocked the browser test server. Reviewed loopback and browser execution supported the verification.
No counter request added a personal page view during the captures or automated journeys.
These checks do not establish complete accessibility conformance, physical-device input acceptance, field performance or populated personal-gallery acceptance.
No dependency was installed. Imported bundles, source content, final artwork and protected root directories were preserved.
Work remains uncommitted and unpublished. The current owned preview runs at http://127.0.0.1:5187/.

A read-only review against the scoped baseline found no blocking issues. The reviewer did not rerun the reported suites.

Next: inspect the approved foreground at the preview. Add only supplied original photographs and event evidence through the existing content boundaries.
Final background work remains deferred until the four matching images arrive.

## Prior audit checkpoint, October 15

CURRENT: a fresh [component and motion review](component-motion-review.md) covers the recording, four reference sites and the current foreground.
FE-012 is IN_PROGRESS. The larger reading-scale design awaits the owner's choice in chat before application changes.
The proposed scale uses 18px body text, 15–16px secondary text, 13–14px labels and larger shared controls and padding.
Sketch ledger is the recommended calendar treatment. Ink stipple and dot matrix remain alternatives.

This run inspected 98 sampled video frames, 13 full-resolution stills, fresh desktop/mobile reference captures and current component states.
The video hash still matches the earlier recording receipt. The three selected public portfolio source revisions also match the earlier review.
The browser was headless Chromium. Source metadata was refreshed for nine public repositories.
The new [capture receipt](references/review-2026-10-15/capture-receipt.json) and [motion receipt](references/review-2026-10-15/motion-receipt.json) retain the observed evidence.

Fresh findings:

- No horizontal document overflow appeared at 1440, 941, 768, 390 or 320px.
- Eighty name samples recorded unchanged heading geometry. Three quote changes produced zero panel-height difference.
- Photography arrows changed collections without changing page scroll. The home strip remains manual and its collections remain empty.
- The palette opened through Ctrl+K, focused its query, closed through Escape and restored focus to the invoker.
- Axe found no listed A/AA violations at 1440, 941, 768 or 390px. At 320px it reported a keyboard-inaccessible unavailable-calendar scroller.
- Profile-error copy falsely claims the calendar remains live when both providers fail. The profile hook does not distinguish rate limits from other failures.
- Some index links, retry controls and desktop photography arrows remain below the proposed 44px interaction target.

Counter, profile and contribution requests were deliberately aborted to inspect unavailable states. No personal page views were added.
These browser observations do not qualify live services, complete accessibility, frame pacing, Firefox, WebKit or physical touch behavior.
Earlier successful receipts below remain historical. They do not supersede these newly inspected failure-state findings.

Proportional checks: document structure passed with 13 canonical owners and 12 unique tasks. Scoped Prettier and `git diff --check` passed.
The report's prose lint measured 0.62 findings per 100 words. Application code and imported bundles were unchanged, so build and full suites were not rerun.
The ordinary Linux preview attempt failed with loopback EPERM. Reviewed loopback/browser access then supported the captures.
The preview now runs at http://127.0.0.1:5187/. No dependency installation, publication, commit or push occurred.

Next: obtain the bounded design choice, then apply the larger scale and correct the three confirmed failure-state issues.
Recheck both themes, 320px, enlarged text, provider failure, keyboard access and reduced motion after implementation.
Original photographs, official event evidence and final background artwork retain their existing boundaries.

## Current objective

FE-012 is PARTIAL for overall visual acceptance. The latest reference-composition pass and its final checks are recorded above. Earlier checkpoints preserve their historical checks.

CURRENT: the selected references now shape the working portfolio rather than only its documentation.
Anurag guides the document rails, section rhythm, command search, quote behavior and running cat.
Garvit guides the grouped activity panel and hanging achievement treatment. Parth guides the event storytelling.
Sakthi guides the circular theme wipe and remains the source for the later paired-image reveal.
The supplied recording remains the motion and composition reference.

The larger readable type scale remains in place. Project cards now use image-first editorial frames.
The single sourced event appears as one hanging paper record with its resume qualifier and missing-evidence status intact.
The contribution panel displays validated live public calendar data with visible source attribution.
The page-view counter records persistent page loads, including repeats. It does not claim unique visitors.
The running cat follows fine mouse pointers, ignores clicks, saves its visibility choice and stops for reduced motion.
GitHub profile failures replace empty profile-stat cards with an accurate unavailable state, a retry control and the direct profile link. Calendar availability is independent.
Standalone navigation, project, source, quote and footer links now keep a 44px-high interaction target.

Background artwork remains DEFERRED. Original photographs and official event evidence remain external inputs.

## Verified checks

Observed on October 15, 2026 in Linux with Node 22.23.2:

| Check                                         | Observed result                                                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run check` with reviewed loopback access | Exit 0: TypeScript, ESLint, formatting, 23 unit/contract checks, production build, documents and skills               |
| Complete development browser run              | 126 passed across Chromium, Firefox and WebKit                                                                        |
| Production browser run                        | Six passed across the same engines: nested reloads, public PDF, Axe and development-route exclusion                   |
| Responsive rendered review                    | Initial broad review at 1440, 941, 768, 390 and 320px; final light 1440px and dark 390px confirmation had no overflow |
| Rendered Axe review                           | No automated A or AA violations in the final desktop or mobile confirmation                                           |
| Interaction-target review                     | All audited standalone links measured at least 44px high on desktop and mobile                                        |
| Command palette                               | Settled opacity 1 with an opaque surface and backdrop after its 300ms entrance                                        |
| GitHub rate-limit state                       | Empty metric cards removed; explanation, retry and profile link rendered while the live calendar stayed visible       |
| Live GitHub calendar                          | HTTP 200 without interception. Displayed 285 contributions and 95 active days for 2026 at the observed time           |
| Live page-view counter                        | Increment returned 2. A separate read returned the same persistent value                                              |
| Running cat                                   | Browser checks cover movement, pointer passthrough, saved hide/show state, route persistence and reduced motion       |
| Theme wipe                                    | Choice persists across immediate reloads in all three engines                                                         |
| `git diff --check`                            | Exit 0                                                                                                                |

The [live service receipt](references/live-services-verification.json) records the exact observed providers, values and limits.
The initial defect screenshots and machine-readable review are under `output/playwright/broken-audit/`.
Final desktop, mobile, palette and GitHub-limit screenshots plus measured review data are under `output/playwright/fixed-audit/`.
The earlier reference implementation evidence remains under `output/playwright/reference-fix/`.
The [design QA](../design-qa.md) records the composition and responsive findings.

Routine browser journeys intercept the contribution and page-view providers. This prevents test runs from adding views or depending on the network.
The separate live Chromium journey used both public providers without interception and added one authorized page view.
Provider values can change after this receipt. The contribution relay can lag GitHub by up to one hour.

The first complete run passed 122 of 123 checks. WebKit found that an immediate reload could occur before theme storage updated.
The preference now saves before the visual wipe starts. The affected three-engine check passed, followed by the clean 123-check run.

Automated Axe checks do not establish complete Web Content Accessibility Guidelines conformance or manual screen-reader acceptance.
The live calendar uses a public relay rather than GitHub's official GraphQL endpoint.
The page-view service is public and does not establish unique visitors or analytics accuracy.
GitHub REST profile statistics received a 403 during the live check. The interface now explains the limit, keeps the contribution calendar, and lets the visitor retry without displaying false zero or dash metrics.

## Current preview and environment

The owned development preview remains at http://127.0.0.1:5187/.
Development journeys used port 5199. Production checks used their configured preview.
Browser checks and HTTP contracts needed reviewed network or loopback execution. Ordinary repository commands ran directly in Linux.

The default contribution source is the public GitHub Contributions API relay.
Set `VITE_GITHUB_CONTRIBUTIONS_SOURCE=github-graphql` only when the hosting server runs the same-origin gateway and supplies `GITHUB_TOKEN`.
No secret enters the browser bundle.

The cat sprite is MIT-licensed oneko artwork with its license retained under `public/licenses/`.
No npm dependency or system package was added. No source or artwork from the selected portfolio references was copied.
The production build excludes the development toolkit, QR fixture and server-only GitHub code.

## Blockers and cross-boundary dependencies

- DEFERRED: four owner-selected landscape images and the later sketch/color reveal.
- BLOCKED_EXTERNAL: original photographs and captions. Empty collections are intentional.
- BLOCKED_EXTERNAL: official event date, result evidence, team/project details and photographs. The result remains resume-reported.
- OPTIONAL_EXTERNAL: a server GitHub token for the official GraphQL calendar path. The connected public relay needs no token.
- UNKNOWN: article date, category and full text. The original publication link remains available.

## Exact next task

Review the approved sketch-ledger foreground at the preview. FE-012 is complete, and its fresh acceptance evidence appears above.
When the four matching landscape images arrive, follow [the paired-image contract](artwork-contract.md) and check registration in both themes before adding the shader.
Insert only approved original photographs. Then check image loading, captions and viewer behavior with those files.
Publishing remains DEFERRED and requires explicit authorization.

## Scope protections

Implementation and documentation writes stayed in `frontend/`. Temporary public-source research used `/tmp/`.
Protected root directories and imported skill bundles were preserved. Nineteen local bundle checks passed.
The existing dirty root files remain. Work is uncommitted.
No push, reset, stash, clean, private-repository access or publication occurred.
