# Reported layout correction, October 15

The owner rejected the foreground and supplied two screenshots. Both Windows clipboard files were recovered through `/mnt/c/Users/Debrato/AppData/Local/Temp/` and inspected.
The earlier review missed visible composition defects despite passing page-overflow checks. Overall visual acceptance is reopened.

## Reproduced defects and corrections

| Defect                                                      | Cause                                              | Correction                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| Dashed guides cross headings and cards                      | Guides were inset inside the content box           | Place guides outside the content box                                       |
| Five skill columns crowd the right edge                     | An empty margin-note gutter consumes section width | Remove the empty gutter; retain responsive groups and larger text          |
| Index labels wrap and the panel can exceed a short viewport | Narrow fixed width and no height bound             | Widen the index, show it only when it fits, and contain vertical scrolling |
| Phone collection labels fall below thumbnails               | Wrapping flex layout with a fixed label basis      | Use thumbnail, flexible label and arrow grid columns                       |

The first two layout checks failed before correction. A later phone-card check also failed before its correction.
All three regressions passed with the existing readability and photography journeys across Chromium, Firefox and WebKit: 54 passed.
`npm run check` passed with reviewed loopback access: typecheck, lint, formatting, 23 unit/contract checks, production build, document checks and skill integrity.
The full development and production browser suites were not rerun for this bounded CSS correction.

## Before and after

[Desktop before](references/reported-layout/before-user-photography.png) · [Desktop after](references/reported-layout/after-user-photography.png)

[Skills before](references/reported-layout/before-skills-1760.png) · [Skills after](references/reported-layout/after-skills-1760.png)

[Phone card before](references/reported-layout/before-photography-320.png) · [Phone card after](references/reported-layout/after-photography-320.png)

Additional captures cover both themes, a 1515px viewport near the supplied screenshot proportions, and enlarged root text. Device scale is recorded separately; native browser zoom was not inferred from the attachment.
Ten viewport captures from 320px through 1760px had no document overflow or measured skill-group escape. Five theme/text states had no listed automated Axe violations or captured page errors.
These measurements do not establish complete accessibility conformance or visual acceptance.

[Source hashes and check limits](references/reported-layout/verification.json) · [Theme and text-state receipt](references/reported-layout/states-receipt.json)

The captures block the page-view service and calendar relay. The layout sweep supplies controlled profile numbers; the theme sweep blocks profile requests too.
No live provider acceptance or added personal page view is claimed. Photography still uses labeled empty collections because original personal photos are missing.
The larger text scale, factual content and deferred background boundary are preserved. Work remains uncommitted and unpublished.
