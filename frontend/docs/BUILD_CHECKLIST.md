# Build checklist

**Owner:** Task queue

## Status contract

Use TODO, IN_PROGRESS, PARTIAL, BLOCKED_EXTERNAL, DEFERRED, or DONE_VERIFIED.
DONE_VERIFIED needs acceptance evidence. A blocked task must name its blocker.

## Implementation queue

| ID     | Task                                   | Dependencies   | Boundary                      | Acceptance                                                               | Evidence                        | Status           | Blocker                                            |
| ------ | -------------------------------------- | -------------- | ----------------------------- | ------------------------------------------------------------------------ | ------------------------------- | ---------------- | -------------------------------------------------- |
| FE-001 | Frontend foundation                    | None           | frontend                      | Configured quality gates pass                                            | HANDOFF.md                      | DONE_VERIFIED    | None                                               |
| FE-002 | Verified portfolio content             | FE-001         | typed content and sources     | Public facts, statuses and source distinctions                           | content-inventory.md            | PARTIAL          | Original media and official event evidence missing |
| FE-003 | Foreground layout and journeys         | FE-002, FE-005 | frontend                      | Both themes, routes, keyboard, responsive rendered review                | ../design-qa.md                 | DONE_VERIFIED    | None                                               |
| FE-004 | Publishing choice                      | FE-003         | deployment decision           | Explicit hosting and publication authorization                           | ../PRODUCT.md                   | DEFERRED         | None                                               |
| FE-005 | Reference research                     | FE-001         | frontend docs                 | Four live sites, recording and selected mockups inspected                | reference-analysis.md           | DONE_VERIFIED    | None                                               |
| FE-006 | Live contribution acceptance           | FE-003         | validated public relay        | Live daily counts, totals, attribution and failure behavior              | ../README.md                    | DONE_VERIFIED    | None                                               |
| FE-007 | Final landscape and reveal             | FE-003         | scene integration             | Four owner-selected paired images and registration review                | artwork-contract.md             | DEFERRED         | None                                               |
| FE-008 | Publish original photo collections     | FE-003         | typed media                   | Owner originals, captions and image loading review                       | content-inventory.md            | BLOCKED_EXTERNAL | Original photographs not supplied                  |
| FE-009 | Real page-view count                   | FE-003         | counter service               | Persistent real source with accurate terminology                         | HANDOFF.md                      | DONE_VERIFIED    | None                                               |
| FE-010 | Readability and motion refinement      | FE-003, FE-005 | frontend and reference docs   | Larger readable scale, stable motion, reflow and browser checks          | ../design-qa.md                 | DONE_VERIFIED    | None                                               |
| FE-011 | Reference integration                  | FE-003, FE-005 | foreground interactions       | Running cat, hanging event record, activity panel and theme wipe         | ../design-qa.md                 | DONE_VERIFIED    | None                                               |
| FE-012 | Component and motion review refinement | FE-010, FE-011 | foreground and failure states | Approved larger scale, coherent composition and corrected audit findings | reference-composition-review.md | PARTIAL          | None                                               |

## Next task

FE-012 is PARTIAL after the owner rejected the rendered foreground. The [reference-composition review](reference-composition-review.md) now covers the broader refinement after all seven new target images. Overall visual acceptance remains open.
Populated photography rotation passed with browser-only images. Original personal photographs remain missing.

The selected reference integration, live calendar and page-view counter passed their bounded browser checks. Continue with the external inputs below when available.
The calendar renderer, public relay, optional official gateway and image viewer are implemented. The gallery tests do not prove a populated personal gallery.
After the missing external inputs arrive, use their existing boundaries. Do not generate personal photographs, invent totals, access private repositories or publish without authorization.
