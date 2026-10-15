# Design QA

**Owner:** Rendered visual evidence

## Scope

CURRENT: the latest [reference-composition review](docs/reference-composition-review.md) supersedes the narrow correction below. All seven newly supplied images were inspected as target references.
The current foreground has a wider reading column, four existing projects in two columns, native project disclosures, responsive cover assets, grouped skills and a unified photography footer.

## Prior reported-layout correction

The owner rejected the foreground after the earlier checks below. The [reported-layout review](docs/reported-layout-review.md) supersedes their visual-completion claim.
Four reproduced defects are corrected: inset guides, the empty skills gutter, cramped index labels and phone collection wrapping.
Fresh before/after captures and the bounded verification receipt are in `docs/references/reported-layout/`.
Overall visual acceptance remains open. Earlier passing checks did not establish composition quality.

## Prior sketch-ledger checkpoint

CURRENT: the owner-approved sketch-ledger refinement supersedes the earlier readability captures below.
CURRENT: the owner approved the sketch-ledger design in chat. The larger reading scale and failure-state fixes are implemented.
The sections below retain the preceding audit observations. They describe the problems before this refinement.

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

Fresh rendered evidence is under `output/playwright/sketch-refinement/` and [the durable receipt](docs/references/sketch-ledger/receipt.json).
The capture reads the real public contribution relay but blocks the profile and page-view providers for controlled error states.
It records no added page views and no claim of unique visitors.
Five viewport checks show no horizontal document overflow or listed automated A/AA violations.
Home, project archive/detail, event detail, article detail and photography also fit 320px with doubled root text.
The recording remains visual evidence. Neither its cadence nor these screenshots establish website frame pacing or field performance.

The mechanical design detector returned no findings across the changed source targets.
The combined three-engine rotation check passed after fixing the mobile control-width shift.
The final full browser and production runs supply the acceptance counts in the handoff.
No dependency, imported skill, personal-content record or final background changed.

## Earlier reference-integration review

CURRENT: the October 15 reference-integration revision keeps the larger type scale and connects the requested live features.
This supersedes the earlier compact page-height budget. The selected cream/charcoal identity and section structure remain the visual direction.
The [recording audit](docs/video-component-analysis.md) explains the component analysis. The [GitHub review](docs/github-source-review.md) records public source findings.
Background artwork remains DEFERRED. This review does not claim pixel-perfect reproduction, real authenticated calendar acceptance or a populated personal gallery.

## Evidence

| Artifact                     | Location                                                                             | Scope                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Current desktop              | `docs/design/evidence/readability-light-desktop.png`, `readability-dark-desktop.png` | Full page at 1440px                                             |
| Current source width         | `docs/design/evidence/readability-light-941.png`, `readability-dark-941.png`         | Larger layout at the earlier comparison width                   |
| Current phone                | `docs/design/evidence/readability-light-mobile.png`, `readability-dark-mobile.png`   | Full page at 390px                                              |
| Current verification         | `docs/references/readability-verification.json`                                      | Source identity, checks, screenshot hashes and limits           |
| Recording review             | `docs/references/video-component-audit/`                                             | Fourteen stills, two motion sequences and capture receipt       |
| Earlier compact evidence     | `docs/references/foreground-verification.json`                                       | Historical foreground revision, superseded for size and height  |
| Supplemental browser states  | `output/playwright/video-audit/`                                                     | Both themes, five widths, command palette and enlarged text     |
| Reference-integration states | `output/playwright/reference-fix/`                                                   | Projects, event record, activity, both themes and live services |
| Live service receipt         | `docs/references/live-services-verification.json`                                    | Unintercepted contribution and page-view responses              |

## Readability and layout

The earlier rendered body copy measured 9–11px in key sections. Some labels measured 7px.
Current primary copy measures at least 16px. Secondary copy and controls use a larger shared scale, with labels at least 12px.
The home, project archives, case studies, event pages, writing and photography use these shared text roles.
Controls and card spacing also grow, so the larger text does not crowd their boundaries.
The project grid changes from three columns through two columns to stacked cards.
The desktop section index appears only where space allows. Other widths keep the section selector.

The page is intentionally longer than the earlier 2028px composition. There is no current 2100px height requirement.
Thin rules, aligned content edges, handwritten notes and repeated card padding connect the larger sections.
Final review corrected long-word overflow, enlarged event-card width, calendar month wrapping and snapshot icon clearance.
The gallery keeps its deliberate horizontal scroll region. This is separate from document overflow.

The project grid now uses image-first editorial cards with a consistent bottom tag row.
The event section uses one hanging paper record, because the supplied content supports one event.
The activity section groups the exact calendar, profile statistics and engineering notes without synthetic values.
Dashed document rails, repeated section rules and shared spacing connect these treatments.

## Motion

The scramble reserves the final word geometry and keeps an accessible final name.
Quote text fades out before the next quote appears. Hidden reserve text keeps footer geometry stable.
Command search uses a restrained opacity and position transition. Shared hover feedback uses color and border changes.
Collection arrows scroll only the photography track. The browser check confirms that the page stays still.
Reduced-motion settings disable decorative animation and smooth scrolling.
No scroll framework or animation dependency was added.
The theme switch uses a circular native View Transition where available. Its saved choice updates before the wipe starts.
The running cat follows fine mouse pointers and ignores clicks. A persistent control hides it, while reduced motion removes it.

## Observed checks

The final reference-integration run passed 123 browser checks across Chromium, Firefox and WebKit.
This includes 320px at 200 percent text, readable text and targets, quote geometry, name geometry, routes and keyboard focus.
An earlier full run passed 104 of 105, with a WebKit focus failure after immediate successive section jumps.
The test now waits for its destination before it invokes the Home action. The complete final run passed.
The collection route journey uses reduced motion. A separate check covers the animated track without vertical page movement.
Home, toolkit, populated calendar and command palette Axe checks found no violations at the tested boundaries.
Automated checks do not establish full WCAG conformance or manual screen-reader acceptance.
Final non-browser, production and supplemental route results are recorded in the verification receipt and handoff.

Generic checks abort the public GitHub profile request. Calendar journeys use explicit test responses.
The gallery test inserts test-only images into development module data. No fixture photograph ships as the owner's work.
Routine checks intercept the calendar and counter so test runs do not add page views or depend on network availability.
An additional Chromium check used the live public providers without interception. It rendered 285 contributions and a persisted page-view total of 2.
This establishes the observed public-provider responses at one time. It does not establish unique visitors, official GraphQL acceptance or future availability.

## Historical performance boundary

The previous compact build's laboratory LCP, CLS, bundle identity and page height remain in its earlier receipt.
Those results do not establish current performance after this size revision. No current frame-rate or field performance claim is made.
Recording timing also cannot establish website frame pacing or input latency.

## Remaining external inputs

- DEFERRED: four owner-selected landscape images and later reveal registration.
- BLOCKED_EXTERNAL: original photographs, captions and official event evidence.
- OPTIONAL_EXTERNAL: a server GitHub token for the official GraphQL calendar path. The connected public relay does not require it.
- UNKNOWN: publication date, category and full article text.
