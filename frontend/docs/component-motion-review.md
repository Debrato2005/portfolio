# Portfolio component and motion review

**Owner:** Reference research and rendered evidence

**Status:** CURRENT reference audit and approved sketch-ledger implementation. October 15, 2026.

## Approved sketch-ledger refinement, October 15

CURRENT: the owner approved the sketch-ledger design in chat. The larger reading scale and failure-state fixes are implemented.
The prior audit below retains its original observations. Within that audit, Current portfolio refers to the pre-refinement snapshot.

The foreground now uses larger shared body, secondary and label styles. Section titles have a clear serif hierarchy with smaller sequence numbers.
Project cards have larger padding, gaps and image frames. Event copy follows the same reading scale.
The calendar uses larger hatched day cells, visible month labels and a contained horizontal scroller.
The scroller remains keyboard accessible when data is loading, ready or unavailable.
Profile failures describe unavailable profile data without asserting a rate limit or a working calendar.
Retry, navigation, collection-arrow and section-index controls use the shared interaction size.

Populated photography collections can rotate every six seconds while visible. Hover, focus, manual input, hidden-page state and reduced motion stop automatic rotation.
Automatic changes do not announce every collection through a live region. Manual changes retain the status announcement.
The Play/Pause control reserves its width, so the arrows stay in place when focus pauses rotation.
Empty collections remain still. The shipped personal collections remain empty because original photographs are missing.
Tests inject temporary browser-only images to exercise rotation. These images are not published as personal photographs.

Fresh rendered evidence is under `output/playwright/sketch-refinement/` and [the durable receipt](references/sketch-ledger/receipt.json).
The capture reads the real public contribution relay but blocks the profile and page-view providers for controlled error states.
It records no added page views and no claim of unique visitors.
Five viewport checks show no horizontal document overflow or listed automated A/AA violations.
Home, project archive/detail, event detail, article detail and photography also fit 320px with doubled root text.
The recording remains visual evidence. Neither its cadence nor these screenshots establish website frame pacing or field performance.

The mechanical design detector returned no findings across the changed source targets.
The combined three-engine rotation check passed after fixing the mobile control-width shift.
The final full browser and production runs supply the acceptance counts in the handoff.
No dependency, imported skill, personal-content record or final background changed.

## Prior audit: outcome and evidence

Use Anurag's document structure, Parth's event storytelling, Garvit's grouped activity panels, and Debrato's own content and identity.
Increase the reading scale across home, archives, detail pages, dialogs and failure states.
Keep the final background outside this revision.
The brief asks for a combined design. It does not ask for a complete copy of any one portfolio.

This run inspected the supplied 49.05-second recording through 98 sampled frames in five contact sheets and 13 full-resolution stills.
Fresh browser captures cover all four reference websites and the existing portfolio at 1440px and 390px.
Additional portfolio checks cover 941px, 768px and 320px, keyboard focus, quote changes and photography navigation.
The browser was headless Chromium. These results do not establish Firefox, WebKit or physical-device behavior in this run.

Evidence lives in [the capture folder](references/review-2026-10-15/).
The [capture receipt](references/review-2026-10-15/capture-receipt.json) records source revisions, viewports and page errors.
The [motion receipt](references/review-2026-10-15/motion-receipt.json) contains sampled geometry, measured targets, keyboard results and Axe findings.
The earlier [timestamped analysis](video-component-analysis.md) supplies further component and source context. Its checks remain historical.

## 1. Structure and section rhythm

**Observed:** Anurag repeats one reading column, dashed outer rails, section bands and a separate desktop index.
The repeated edges give the eye a stable position during scroll. The structure does more work than the decorative background.
Parth and Garvit repeat card materials and caption positions for the same reason.

**Current portfolio:** Nine numbered sections use shared edges and separators. Archives and details retain the same identity.
At 1440px, the foreground has a 1024px content width and a separate index. No document overflow appeared in the tested widths.

**Refinement:** Preserve the reading column and section order. Let larger text increase page height.
Use one shared spacing scale for headings, paragraphs, cards and controls. Do not compensate with tighter line spacing.
Keep the index outside the reading column only where both fit.

Evidence: [Anurag desktop](references/review-2026-10-15/anurag-desktop-full.png), [portfolio desktop](references/review-2026-10-15/portfolio-desktop-full.png).

## 2. Header and navigation

**Observed:** Anurag keeps its compact navigation aligned to the document rails. Sakthi uses a small dock within a full scene.
Parth uses one persistent rounded group. Each repeats one clear control language.

**Current portfolio:** The header exposes projects, experience, contact, search and theme. Narrow layouts retain these controls through reflow.
The side index has 12px text and 40px-high links. Those measurements fall below the proposed reading and interaction sizes.

**Refinement:** Use 15–16px navigation, readable shortcut labels, and at least 44px targets.
Preserve current route names and section links. Enlarge the index row spacing with its text.
Do not add a second floating dock merely because a reference uses one.

## 3. Name scramble and introduction

**Observed:** Anurag's reference identity has a chromatic shadow and a rotating role. It does not establish a text-scramble requirement.
The requested name scramble is a separate design choice.

**Current portfolio:** The name resolves left to right over about one second. Its final text stays available to assistive technology.
A reserved text layer keeps the word dimensions stable. Eighty browser samples recorded the same heading position and size.
The measured heading was 576 × 88.19px. This checks geometry during that run, not display frame pacing.

**Refinement:** Retain the stable scramble. Increase ordinary supporting text before increasing an already large name.
Keep the final heading visible immediately with reduced motion. Avoid repeated scrambling on scroll or route return.
The introduction should explain Debrato's work before decorative notes receive attention.

Evidence: [introduction](references/review-2026-10-15/portfolio-desktop-top.png), [name samples](references/review-2026-10-15/motion-receipt.json).

## 4. Typography and readability

Fresh computed styles show these differences:

| Surface                         | Observed size               | Proposed treatment                                               |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| Anurag about copy               | 14.5px                      | Borrow the hierarchy at a larger reading scale                   |
| Anurag project copy             | 13px                        | Preserve image, title, summary and metadata order                |
| Parth event descriptions        | 10px                        | Preserve event composition with 16–18px descriptions             |
| Garvit introductory copy        | 13px                        | Borrow grouped emphasis without shrinking body text              |
| Portfolio body and project copy | 16px                        | Increase to 18px                                                 |
| Portfolio introduction          | 18px                        | Increase to about 20px                                           |
| Portfolio secondary text        | 14px                        | Increase to 15–16px                                              |
| Portfolio labels and tags       | 12px                        | Increase to 13–14px                                              |
| Portfolio section labels        | Compact monospaced headings | Give section names more visual weight and keep numbers secondary |

These are target design values. They do not describe changes implemented in this run.
The CSS tokens remain the authority for adopted values.
Retain the selected serif, sans-serif and limited handwritten roles. Do not introduce another font family for each reference.
Enlarge card padding and gaps with text. Keep readable line lengths instead of scaling the whole page with transforms.

## 5. About and experience

**Observed:** Anurag places a compact developer snapshot beside its main narrative. Garvit groups experience in one repeated panel.
Parth connects roles and education with a timeline, clear organization marks and repeated date positions.

**Current portfolio:** The about section combines prose, a margin note and a snapshot. Experience and education use dated records.
On narrow screens these records stack. The composition remains readable without the index or decorative note.

**Refinement:** Use the same body and metadata scale in every record. Keep organization, role and dates in predictable positions.
Preserve the actual employment and education facts. Do not add unsupported impact statistics to imitate another person's profile.
Use a timeline only if the supplied chronology benefits from it.

Evidence: [experience](references/review-2026-10-15/portfolio-section-experience.png), [Parth recording at 34.5s](references/review-2026-10-15/video/parth-experience.jpg).

## 6. Projects

**Observed:** Anurag uses repeated image-first cards with status, title, summary and stack. Its small hover lift preserves the surrounding grid.
Parth applies one paper frame to project screenshots, captions and external actions.

**Current portfolio:** Three project cards use independent illustrations, status labels, summaries and stack tags.
Category controls and archive/detail routes already exist. The projects remain Debrato's own sourced work.

**Refinement:** Increase summaries, tags, internal padding and control sizes together.
Keep images aligned, titles at the same level, and stack tags near the bottom.
Use a restrained border change and a small hover lift. Essential project information must remain available without hover.
The landscape illustrations are visual covers. Real project screenshots would communicate the software more directly when available.
Do not describe an illustration as a screenshot of a working product.

Evidence: [current cards](references/review-2026-10-15/portfolio-section-projects.png), [Anurag recording at 9.5s](references/review-2026-10-15/video/anurag-projects.jpg).

## 7. Hackathons and achievements

**Observed:** Parth's event wall works through photographs, clips, paper frames, result labels and short event stories.
Garvit repeats hanging paper records with the same image and caption hierarchy.
The restrained rotations create a physical metaphor while the text remains steady.

**Current portfolio:** One hanging record presents SVASTH. Its first-place claim remains explicitly resume-reported.
Official event evidence, photographs and full project/team details remain missing.

**Refinement:** Preserve one honest record until more events exist. Increase its supporting copy and action sizes.
Use an actual event photograph when supplied. Keep the result, event name, short story and detail link visible without interaction.
With multiple sourced events, use a bounded strip with manual arrows and native touch scrolling.
Avoid automatic movement through achievement text.

Evidence: [current event](references/review-2026-10-15/portfolio-section-hackathons.png), [Parth wall at 31.5s](references/review-2026-10-15/video/parth-events.jpg).

## 8. GitHub calendar and data

**Observed:** Garvit's repeated panel and textured day cells connect activity data to its notebook design.
Parth places its calendar in a light paper panel with clear month labels.

**Current portfolio:** A custom hook reads validated daily counts. The default provider is the public GitHub Contributions API relay.
The optional official GitHub GraphQL gateway requires a server token. A static Vite preview does not run that gateway.
The year selector, seven weekday rows, level legend and expandable daily explorer already exist.
No generated contribution values appeared after the controlled provider failure.

**Confirmed defects:** At 320px, the unavailable calendar has 255px of content inside a 254px viewport and no keyboard tab stop.
Axe reports `scrollable-region-focusable`. Small month labels produce this overflow even when daily cells are unavailable.
The profile fallback also claims that the calendar remains live when both providers fail.
The profile hook groups different failures as unavailable, so the message must not assert a rate limit without that evidence.

**Refinement:** Make actual horizontal overflow keyboard accessible in every data state, or eliminate the overflow through fitting labels.
Describe profile and calendar availability independently. Retain exact counts and explicit unknown cells.
Do not replace the calendar with an unrelated visualization.

Evidence: [unavailable state](references/review-2026-10-15/portfolio-section-github.png), [320px audit](references/review-2026-10-15/motion-receipt.json).

### Creative calendar choices

All choices retain a seven-row calendar, year navigation, themes, daily values and keyboard access.

| Choice                     | Visual treatment                                       | Fit and trade-off                                                                                 | Component reference                                                                                                                                         |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sketch ledger, recommended | Thin outlines and hatched intensity inside day squares | Closest to Garvit. Works with the current renderer and restrained paper language                  | [Garvit calendar source](https://github.com/garvittsingla/portfolio/blob/b44decb295f3d9883844064015e58f865ead51e7/components/GithubContributionsSticky.tsx) |
| Ink stipple                | Dot density within square day cells                    | More distinct and suited to research and photography. Keep exact counts in the detail panel       | Independent treatment on the current validated renderer                                                                                                     |
| Dot matrix                 | Circular day cells with clear spacing                  | Quietest option. Very small cells need a separate enlarged explorer                               | [Heatmap UI](https://github.com/tb962/heatmap-ui)                                                                                                           |
| Monthly contact sheet      | Twelve calendar panels with small month captions       | Strong photography connection, but longer and less compact. Keep a continuous-year view available | [Cal-Heatmap](https://github.com/wa0x6e/cal-heatmap)                                                                                                        |
| Number ledger              | Larger day squares with printed counts                 | Most explicit detail. Needs contained scrolling rather than shrinking numbers on mobile           | [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar) as renderer reference                                                      |

Choose one primary treatment. Multiple competing visualization styles would weaken the page's coherence.
The [existing heatmap research](heatmap-research.md) records further source and data-policy limits.

## 9. Command palette

**Observed:** Anurag groups page, profile and theme destinations within one command surface.
The source uses short movement and opacity transitions, which preserve a clear relationship to the page beneath it.

**Current portfolio:** Ctrl+K opens the dialog. A fresh semantic-locator check confirms input focus, Escape closure and focus restoration.
The mobile dialog fits the viewport and uses a scrollable result list. It exposes 27 commands in the captured state.
The earlier probe used a nonexistent CSS selector and checked the exit too early. The corrected receipt supersedes those two probe results.

**Refinement:** Enlarge the query, result labels and footer guidance together. Preserve visible focus and ordinary link destinations.
Keep the installed Base UI dialog. [cmdk](https://github.com/dip/cmdk) is a useful filtering and grouping reference, not a required replacement.

Evidence: [desktop palette](references/review-2026-10-15/portfolio-palette.png), [mobile palette](references/review-2026-10-15/portfolio-mobile-palette.png).

## 10. Train of Thought

**Observed:** Anurag uses repeatable writing rows. Garvit groups essays inside an editor-like panel with a title, excerpt and metadata.
Both rely on a predictable reading hierarchy rather than large animation.

**Current portfolio:** One supplied publication links to Bear Blog. A writing archive and detail route exist.
The article date, category and full text remain unknown.

**Refinement:** Keep the section title and enlarge its reading scale. Use a clear title, supplied excerpt and direct reading action.
Add a list of posts when verified posts exist. Do not fabricate dates, reading times or categories to make the section look populated.

Evidence: [writing section](references/review-2026-10-15/portfolio-section-thoughts.png).

## 11. Photography

**Current portfolio:** A horizontal collection strip links to detail pages and supports arrows, keyboard input and native scrolling.
Its arrows changed the selected collection while page scroll stayed exactly at 5526px in the measured mobile check.
The home strip does not automatically rotate. A separate gallery slideshow exists for populated photo arrays.
All personal collections are currently empty and clearly labeled. There is no populated personal-gallery acceptance evidence.

**Refinement:** Use a filmstrip with one featured collection and enough of the next frame to show that it can move.
When original photographs exist, rotate every six seconds only while visible, with Pause/Play controls.
Pause on hover, focus, swipe, manual navigation and hidden-page state. Reduced motion keeps manual navigation.
Keep the detail route on each collection. Empty collections should remain still instead of rotating empty cards.

[Embla](https://github.com/davidjerleke/embla-carousel) offers a mature carousel reference if native scrolling proves insufficient.
[Yet Another React Lightbox](https://github.com/igordanchenko/yet-another-react-lightbox) offers image preloading and viewer features for a larger photo library.
The current Base UI viewer and native scroll strip already cover the existing content. No new package is required for this refinement.

Evidence: [collection strip](references/review-2026-10-15/portfolio-section-photography.png).

## 12. Quotes, counter and footer

**Observed:** Anurag closes with a restrained fading quote. Garvit places its quote and contact action within one grouped closing surface.
Both make the end of the page feel intentional by repeating the earlier typography and framing.

**Current portfolio:** Quotes rotate every eight seconds while visible, with manual controls and reduced-motion handling.
Three measured changes produced zero panel-height difference. The exit starts before the next text appears.
The counter reports page loads, including repeat visits. This review blocked counter requests, so screenshots show its failure state without adding views.

**Confirmed issue:** The counter retry control measures about 26px high on desktop and 33px on mobile.
Some photography arrows measure 40 × 40px. Retry and arrow controls need the same target sizing as successful controls.
Links inside collapsed engineering notes are not currently visible and should not be counted as visible target failures.

**Refinement:** Enlarge footer labels and quote controls. Preserve the reserved quote geometry and source links.
Use one shared control treatment for loading, success and failure. Do not label page views as unique visitors.

Evidence: [footer](references/review-2026-10-15/portfolio-footer.png).

## 13. Themes and the deferred background

**Observed:** Sakthi's scene changes local color under the pointer while the illustrated geometry stays aligned.
The circular theme wipe is a separate transition from the pointer reveal.
The recording shows both the daylight and night composition with the same figure and hill positions.

**Current portfolio:** Light, Dark and System preferences exist. The circular View Transition wipe is already implemented.
The final artwork and pointer shader remain deferred. This revision does not select a substitute landscape.

**Later contract:** Use four registered images: sketch and color for each theme.
Keep the text region protected, preserve pointer passthrough, and provide static touch and reduced-motion fallbacks.
The [artwork contract](artwork-contract.md) remains the owner of that work.

Evidence: [reveal at 20s](references/review-2026-10-15/video/sakthi-reveal.jpg), [wipe at 23.8s](references/review-2026-10-15/video/sakthi-wipe.jpg), [night scene](references/review-2026-10-15/video/sakthi-dark.jpg).

## 14. Motion and coherence rules

Preserve geometry while color, opacity or a small transform changes.
Use one timing vocabulary for controls, one for panel entrances, and one for deliberate reading transitions.
The existing 160ms, 240ms and 420ms tokens form a suitable starting point.
Do not add an animation library for effects already covered by CSS, native scrolling and the View Transition API.

Keep the name scramble limited to entry. Let quotes wait long enough to read.
Keep project lifts small. Avoid automatic movement through event stories.
Pause repeating motion outside the viewport and while the page is hidden.
Use final static states for reduced motion, with visible state feedback.

The recording reports nominal 55fps but averages about 27.41fps.
Its cadence cannot establish website frame pacing, input latency, smooth-scroll libraries or GPU cost.
The browser samples establish stable heading and quote geometry only. They are not a performance benchmark.

## 15. Components and skills reviewed

Public repository metadata and latest revisions were refreshed for all nine repositories in the capture receipt.
The three selected portfolio repositories still match the previously inspected commits.
That confirms source freshness for the earlier review. It does not prove those commits match current deployments.

| Need                                    | Source examined                                                                                                                                    | Decision                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Structure, projects, palette and quotes | [Anurag source](https://github.com/nodeanurag/my-portfolio)                                                                                        | Use behavior and composition as reference. Preserve Debrato's content                    |
| Pointer reveal and theme continuity     | [Sakthi source](https://github.com/sakthii05/portfolio)                                                                                            | Keep the paired-image contract deferred                                                  |
| Activity and achievement panels         | [Garvit source](https://github.com/garvittsingla/portfolio)                                                                                        | Use grouped framing and repeatable captions                                              |
| Name decryption                         | [React Bits Decrypted Text](https://reactbits.dev/text-animations/decrypted-text)                                                                  | Existing stable scramble covers the requirement                                          |
| Search menu                             | [cmdk](https://github.com/dip/cmdk), [Base UI Dialog](https://base-ui.com/react/components/dialog)                                                 | Retain installed Base UI and tested keyboard behavior                                    |
| Calendar rendering                      | [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar), [Heatmap UI](https://github.com/tb962/heatmap-ui)                | Compare treatments. Preserve the existing validated data boundary                        |
| Photography strip and viewer            | [Embla](https://github.com/davidjerleke/embla-carousel), [Yet Another React Lightbox](https://github.com/igordanchenko/yet-another-react-lightbox) | Reference for later media requirements. Avoid a replacement before original media exists |

The three selected portfolio repositories returned no license identifier in the metadata response.
React Bits returned `NOASSERTION`, which is not a reuse grant. No reference code or artwork was imported.
The receipt records MIT identifiers for cmdk, React Activity Calendar, Heatmap UI, Embla and Yet Another React Lightbox.

Skills applied: Product Design audit for screenshot evidence, brainstorming for the bounded design choice, Impeccable for project context and technical audit, and design-taste-frontend for reference-led refinement.
Ponytail favors the existing controls and browser features. Systematic debugging traced the calendar, error copy and target-size findings to current source.
The writing guidance applies to this report. No skill bundle, dependency or root configuration changed.

## Acceptance and next decision

The research checkpoint completed before product changes. The owner then approved the sketch-ledger refinement in chat.
The implemented changes and current evidence appear above. The handoff records final acceptance and remaining external inputs.

Check both themes at desktop and mobile widths, 320px reflow, text scaling, keyboard recovery, reduced motion and provider failures.
Run the relevant browser journeys and non-browser gates. Capture the changed components again after the fixes.
Original photographs, official event evidence and final backgrounds remain separate external inputs.
No publication, commit, push, dependency installation or memory-file rewrite occurred during this audit.
