# Same-width screenshot comparison, October 18

**Owner:** Frontend visual review

HISTORICAL: the later [scale correction](scale-correction-2026-10-18.md) supersedes this snapshot's size targets and measurements after the owner rejected the enlarged layout.

CURRENT: this comparison supersedes the preceding October 18 layout snapshot. The owner's latest instruction is to compare both supplied screenshots at the same width, correct structure, spacing, size and alignment, keep every project visible together, and leave the background alone.

The [light comparison](references/screenshot-comparison-2026-10-18/comparison-light.png) and [dark comparison](references/screenshot-comparison-2026-10-18/comparison-dark.png) place the supplied reference on the left and the current homepage on the right. Both columns use the original 941px viewport. They are not differently scaled desktop layouts.

## What the comparison exposed

The previous page triggered tablet stacking at the supplied width. Its content started too far left, the hero index disappeared, experience and activity stacked, projects used two columns, and Contact used multiple rows. The page measured 5,024px at that width. A clipping check had not established fidelity to the references.

The current page measures 3,100px in both themes. It retains the reference's foreground information structure and shared edges. It is not a pixel-exact match: the references show three projects, several sample events and populated photography, while the actual portfolio has six projects, one sourced event and pending personal photographs. The larger reading scale also needs more space.

## Foreground corrections

| Area                   | Current behavior                                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header and hero        | Four centered navigation links, compact controls, left-aligned name and metadata, separate handwritten note and a right-side index at the reference width. Index labels remain on one line and clear About.                                                     |
| About                  | The label and note share the left gutter. Prose and snapshot sit beside each other. The main reading edge starts near the reference's 200px position. Phones stack the snapshot below the prose.                                                                |
| Projects               | All six closed cards share three columns and two rows at 941px and 1440px. Portrait covers, complete summaries and visible technologies remain. The title links to a repository when supplied; a top-right native control opens the full brief.                 |
| Project density        | The complete section measures 647.22px at 941px and 612.09px at 1440px in both themes. All six titles, summaries and brief controls fit together in a 900px viewport. No summary is line-clamped.                                                               |
| Experience and skills  | Three experience columns and five skill groups remain beside their section labels at the supplied width. Their content shares About's reading edge.                                                                                                             |
| Hackathons and writing | Full-width heading bands sit above the body. Notes occupy the left body rail. The one sourced event uses a compact paper record; the one sourced article retains its real publication link. No sample facts were added.                                         |
| Activity               | Calendar and profile panels stay adjacent. The year selector shares the total column, and the compact footer keeps the legend, exploration control and relay attribution together. Expanded daily exploration retains complete source and keyboard information. |
| Photography            | The heading contains the gallery action. The note and controls occupy the left rail; the filmstrip starts at the shared reading edge. A partial next card preserves a visible scroll cue and working arrows.                                                    |
| Contact and footer     | The label and invitation sit left of one desktop action row. The quote and page-view counter share the closing row. Phone action columns adapt to text size.                                                                                                    |

The reading scale follows the available column width. At the reference width, primary copy is 16px and secondary labels remain at least 15px. Wider desktop and phone primary copy remains 20px. This preserves readable text while restoring the desktop structure at 941px.

`reference-refinement.css` owns the shared composition. `project-cards.css` owns the complete project overview. No dependency, personal-content record, final background or imported skill changed in this pass.

## Reproduced defects and fixes

The new enlarged-text regression failed before the phone correction: Home occupied four lines at 320px with doubled text. Fresh image inspection also exposed vertical Contact labels and split project names. Navigation links now keep their whole labels in a contained scroller. Contact columns respond to text size, and narrow project names move below the portrait. The unchanged one-line label assertions then passed in all three browser engines.

The complete browser run exposed a native motion-preference timing defect. A fresh media query could report reduced motion while an existing query object and its queued change notification remained stale. The name animation now reads a fresh query in each active frame and stops on the first reduced-motion frame. The existing start-scrambled and 20ms-settled assertions remain unchanged. Nine planned serial checks passed across Chromium, Firefox and WebKit after the final correction. Geometry and quote-fade checks also passed.

The responsive grid regression still expected two project columns at 941px. Its tablet case now runs at 768px. Separate tests assert the requested three-column, two-row overview at 941px and 1440px, shared reading gutters, three experience columns, five skill groups, one contact row and index containment.

## Rendered evidence and service boundaries

The [receipt](references/screenshot-comparison-2026-10-18/verification.json) records thirteen application-source hashes, image hashes, original screenshot identities and seven final rendered cases:

- Both themes at 941px and 1440px.
- 390px light mode.
- 320px dark mode with doubled root text.
- 941px light mode with 150 percent root text.

All seven captures show no document overflow or captured page error. The final independent image review checked both paired boards and the corrected phone controls; it found no remaining structural or control-readability blocker in those states. That observation does not establish exact visual equality or final owner acceptance.

Desktop captures read the real public GitHub profile and contribution relay. Every page-counter increment is intercepted and converted to a read. All four final desktop cases show the public calendar and a connected counter. Phone and enlarged-text captures abort external providers to exercise unavailable states. No fixture count or invented personal photograph appears in these final comparisons.

The source scripts and additional intermediate evidence remain in `output/playwright/side-by-side-2026-10-18/`. The durable directory retains paired boards, complete pages, component crops, phone control crops and the mechanical scan. The scan returned no findings; it does not replace visual review.

The [handoff](HANDOFF.md) records final check results. FE-012 remains PARTIAL for owner visual acceptance. Original photographs, official event evidence and final background artwork retain their existing missing/deferred status. Automated checks do not establish complete accessibility conformance or field performance.
