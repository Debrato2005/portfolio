# Frontend document index

**Owner:** Document ownership

## Canonical owners

| Document                                             | Authority                      | Read trigger                  |
| ---------------------------------------------------- | ------------------------------ | ----------------------------- |
| [AGENTS.md](../AGENTS.md)                            | Frontend workflow and scope    | Every frontend task           |
| [README.md](../README.md)                            | Setup and commands             | Setup or continuation         |
| [PRODUCT.md](../PRODUCT.md)                          | Portfolio purpose              | Product scope                 |
| [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md) | Architecture contracts         | Module and API changes        |
| [WORKFLOW.md](WORKFLOW.md)                           | Routes and journeys            | Route or state changes        |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                 | Visual and accessibility rules | Visual and control changes    |
| [TESTING_AND_QUALITY.md](TESTING_AND_QUALITY.md)     | Quality gates and limits       | Test or verification changes  |
| [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md)             | Task status                    | Task selection and evidence   |
| [SOURCE_LEDGER.md](SOURCE_LEDGER.md)                 | Sources and licenses           | Dependency or source adoption |
| [TOOLING.md](TOOLING.md)                             | Skill and plugin states        | Tool availability changes     |
| [HANDOFF.md](HANDOFF.md)                             | Current continuation           | Every continuation            |
| [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)  | Attribution                    | External assets and code      |
| [design-qa.md](../design-qa.md)                      | Rendered review evidence       | Visual acceptance             |

## Design proposal

The [heatmap research](heatmap-research.md) records the owner's calendar requirement and source-backed renderer comparison.

The [design review](design-decisions.md) collects the requested A–H proposal.
Its [requirements](requirements.md), [reference analysis](reference-analysis.md), and [content inventory](content-inventory.md) retain source distinctions.
The [proposed design system](design-system.md), [page architecture](page-architecture.md), and [interaction specification](interaction-spec.md) retain proposal history. Canonical owners above and the latest master brief describe the implemented foreground and current boundaries.
The supplied screenshots authorize the current layout implementation. The [artwork contract](artwork-contract.md) records the four supplied landscape files. The [background review](sketch-to-color-background.md) records their alignment, rendering, configuration and verification.
Canonical runtime owners distinguish implemented behavior from remaining proposal contracts.
Canonical owners above retain authority for current behavior. Concept images and recording frames are review evidence only.

The later [recording audit](video-component-analysis.md) contains timestamped component analysis and full-resolution screenshots.
The latest [component and motion review](component-motion-review.md) adds fresh reference captures, measured failure states and the pending readability choice.
The [GitHub source review](github-source-review.md) traces public implementation details to fixed commits and records source limits.
The [October 17 reference review](visual-review-2026-10-17.md) adds fresh component reads, recording samples and the current refinement decisions.
The [component reuse review](component-reuse-review.md) maps active source files to local components and records dependencies, source identities and reuse limits.
The [October 18 layout review](visual-review-2026-10-18.md) records the owner's explicit light/dark structure, compact ledger rows and final rendered evidence.
The later [same-width screenshot comparison](screenshot-comparison-2026-10-18.md) supersedes that layout snapshot with paired reference/current images, corrected desktop breakpoints and enlarged-text control checks.
The subsequent [scale correction](scale-correction-2026-10-18.md) supersedes those size targets after the owner rejected the enlarged layout.
The [live service receipt](references/live-services-verification.json) records the connected calendar and page-view observations.
The later [width and cover review](width-covers-2026-10-18.md) corrects the desktop inward offset and records the owner-authorized generated illustrations. The preceding [Mono refinement](mono-refinement-2026-10-18.md) follows the owner's explicit JetBrains Mono direction with shared type primitives and restrained surfaces. It preserves compact proportions and the existing hero background. [DESIGN.md](../DESIGN.md) records the selected identity; [design QA](../design-qa.md) links the rendered evidence.
The [section rhythm review](section-rhythm-2026-10-19.md) records the later spacing and border correction against the same supplied light and dark compositions.
The [compact convergence review](compact-convergence-2026-10-19.md) followed the owner's latest mockup: a 1152px centered column, uppercase section labels, Caveat margin notes, the hackathon clothesline, and compacted project, contact, photography, and footer geometry. Its narrow-column follow-up replaces the cap with 760px, dashed rails, full-viewport hatched section bands, and a borderless gutter index.

## Startup routing

Read the rules, entrypoint, handoff, queue task, then the relevant stable owner.
Inspect source after relationship discovery. Do not read every owner for a small change.
Keep token values in CSS, volatile receipts in handoff, and task acceptance in the queue.

## Structural validation

`npm run docs:check` checks required owners, sections, local links, anchors, and task status.
It does not prove semantic truth, live integration, or browser acceptance.
