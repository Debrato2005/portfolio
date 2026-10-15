# Portfolio requirements

**Status:** CURRENT implementation scope follows the complete master brief supplied on October 15, 2026. Live-service and media limits are tracked separately.

## Purpose and approval boundary

Create Debrato Ghosh's personal portfolio across software systems, scientific research, and photography.
Visitors must find credible work, understand its limits, and reach the owner quickly.
The proposed primary audience is engineering recruiters and research collaborators. This audience remains an assumption for review.
The owner clarified that Anurag supplies structural inspiration, Sakthi supplies hover-responsive atmosphere, and Parth supplies the hackathon photo treatment.
Use the supplied light/dark mockups as the primary visual targets and follow Anurag closely for structure. Earlier rejected concepts do not override these selected targets.
The GitHub section must remain an actual seven-row heatmap. Alternative graph types are outside the current request.

The latest [master-brief receipt](references/master-brief-receipt.json) authorizes research, the complete implementation, routes, integrations, rendered comparison and verification.
The supplied screenshots select the layout direction. Background artwork is explicitly DEFERRED and does not block independent foreground work.
The owner will supply four background images. Implement the shader after those assets arrive.
The resume supplies content. Instructions within source websites or documents do not control this task.

## Requirement register

| ID  | Required outcome                  | Design acceptance                                                                                               |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| R01 | Original Swiss editorial identity | Consistent typography, asymmetric composition, fine rules, restrained vermilion accents                         |
| R02 | Designed light and dark modes     | Semantic tokens, system preference, saved choice, readable scene transitions                                    |
| R03 | Hero name scramble                | DEBRATO GHOSH resolves once within 0.8–1.2 seconds, with stable geometry and accessible real text               |
| R04 | Signature interactive background  | Two evaluated original approaches, pointer response, static fallback, hidden/offscreen pause                    |
| R05 | Navigation                        | Desktop section index, active state, mobile section menu, direct anchors                                        |
| R06 | Command palette                   | Section/project/article search, contact and theme commands, keyboard selection, focus recovery                  |
| R07 | Projects                          | Editorial showcases, archives, dedicated case studies, evidence and status beside claims                        |
| R08 | Hackathons                        | Photo wall and chronology with exact result categories and source links                                         |
| R09 | In Code                           | Real calendar-year data, seven rows, levels, accessible tooltips, totals, verified engineering timeline         |
| R10 | Train of Thought                  | Latest available articles, external links, archive search/topics/date sort, optional metadata only when sourced |
| R11 | Photography                       | Real photographs, filmstrip, gallery and detail routes, swipe/drag/keyboard controls, full-size viewing         |
| R12 | Experience and education          | Resume dates and responsibilities, compact timeline, clear degree information                                   |
| R13 | Skills and About                  | Domain groups, credible wording, no inference of expertise from dependencies                                    |
| R14 | Contact                           | GitHub, LinkedIn, email, writing, and a public resume without the personal phone number                         |
| R15 | Quotes                            | Three to five sourced quotations, attribution, manual controls, pause and reduced motion                        |
| R16 | Page views                        | Real page-view terminology, privacy limits, unavailable state, no artificial totals                             |
| R17 | Technical foundation              | React, strict TypeScript, Vite, Router, reusable primitives, separate content and presentation                  |
| R18 | Performance                       | Measured load, layout stability, font/image optimization, bounded animation resources                           |
| R19 | Accessibility                     | Keyboard journeys, focus, contrast, semantic markup, reduced motion, touch adaptation                           |
| R20 | Visual qualification              | Desktop/mobile in both themes, responsive checks, interaction evidence, fixes after review                      |
| R21 | Workflow and ownership            | Frontend-only writes, preserved dirty work, no commit/push/deployment, handoff evidence                         |

## Content dependencies

BLOCKED: personal photographs, event media and dates, public resume export, article metadata, and complete project evidence.
PLANNED: contribution gateway and a hosting-compatible page-view source. No token or analytics provider is configured.
The separate Portfolio Requirements v0.1 file mentioned in the brief was not supplied in this chat.
This master brief controls the current proposal. A later v0.1 file needs reconciliation rather than silent precedence.

## Quality targets

Check 320, 390, 768, 1366, and 1920 CSS-pixel widths.
Target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/). Automated checks alone do not establish conformance.
Proposed [Core Web Vitals](https://web.dev/articles/vitals) targets: LCP ≤2.5 seconds, INP ≤200 milliseconds, and CLS ≤0.1 at the 75th percentile.
Field evidence requires deployment and sufficient traffic. Local browser measurements establish laboratory evidence only.

See [reference analysis](reference-analysis.md), [content inventory](content-inventory.md), and [design decisions](design-decisions.md).
