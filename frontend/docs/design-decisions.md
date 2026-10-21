# Portfolio design review

**Status:** PARTIAL implementation. The supplied light/dark screenshots now control the visual direction.

## Selected screenshot revision

The owner selected the supplied [light](design/selected-light.png) and [dark](design/selected-dark.png) screenshots and requested implementation.
The homepage follows their numbered section order: About, Projects, Experience, Hackathons, In Code, Skills, Train of Thought, Photography and Contact.
Inter, Instrument Serif, Caveat and Space Mono are served locally with retained licenses.
The complete October 15 brief expands this work to archives, detail pages, real-data boundaries, photography navigation and browser verification.
Missing personal photographs, event evidence, the GitHub server token and the counter service remain explicit external inputs.
Background artwork is DEFERRED. The [artwork contract](artwork-contract.md) records the future four-image boundary.
Earlier recommendations below remain proposal history where the supplied screenshots supersede them.

## A. Reference analysis

The recording shows Anurag's compact editorial structure, Sakthi's theme-aware scene, Parth's event photo wall, and Garvit Singla's spatial presentation.
Inspected timecodes: Anurag 00:06/00:15, Sakthi 00:19/00:24/00:27, Parth 00:31/00:39, and Garvit 00:43/00:47.
The fourth site is identifiable from its visible address bar. It is optional inspiration.
See the [comparison and frame evidence](reference-analysis.md) for observed behavior and limits.

## B. Recommended visual direction

Create an original editorial portfolio around the owner's clarified requirements.
Anurag guides information organization, compact reading, section navigation and project browsing.
Sakthi guides the theme-aware scene and its localized hover reveal.
Parth guides the hanging hackathon photographs and horizontal event browsing.

Retain warm-paper/charcoal themes, restrained vermilion accents, and clear typography.
Use a calm 880–960px reading region with a compact index when the viewport permits it.
Use plain section labels and fine dividers. Remove the reference's striped bands, dashed rails, framed cover and copied profile treatment.
A compact one-line name still receives the controlled initial scramble.

Propose an original illustrated observatory environment that surrounds the introduction and continues into quiet page margins.
Light mode uses atmospheric terrain and daylight detail. Dark mode uses celestial depth and a restrained night sky.
Pointer hover reveals the scene's color and detail through a soft local mask.
This is a scene reveal, not just an orbit diagram or small parallax translation.
Keep the reading area stable and contrast-safe. The illustration is decorative, not the owner's photography or measured scientific data.

| Reference role | Functional inspiration                                             | Original expression                                                                  |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Anurag         | Reading hierarchy, section index, useful project filters and links | Own typography, separators, spacing, project composition and navigation styling      |
| Sakthi         | Hover-dependent environment and coordinated light/dark scenes      | Original observatory illustration and localized color/detail reveal                  |
| Parth          | Hanging photographs and browsable achievement wall                 | Owner's event images, restrained frames/clips, portfolio colors and sourced captions |

Both earlier concept sets are superseded. Their static artifacts remain historical evidence, not the approved design.
The corrected requirements and interaction specification control the next visual proposal.
The current layout is a partial implementation of the owner's selected screenshots.
See [heatmap research](heatmap-research.md) for the recommended calendar renderer and styling alternatives.

## C. Page architecture

Homepage sequence: original scene/introduction, About, early contact links, Selected Projects, Experience, Hackathons, Skills, Train of Thought, Photography, In Code, Contact.
Anurag guides information organization and section navigation. Debrato's composition, scene and visual treatments remain original.
Debrato's additional sections use that same structure rather than introducing a separate visual layout.
Routes are limited to `/`, `/blogs`, `/photography`, and unmatched-path recovery. Projects, experience, hackathons, achievements, skills, and GitHub activity remain in the homepage flow.
Mobile retains a compact reading column and uses a section menu instead of the side index.
See [page architecture](page-architecture.md) for route states, case-study chapters and content models.

## D. Interaction specification

The required name scramble runs once for approximately one second and never hides the real accessible name.
Themes support Light, Dark and System, with saved explicit choice and a coordinated scene fade.
Hover reveals background color/detail through a localized soft mask. Theme changes transform the environment. Rendering pauses while hidden or offscreen.
The command palette supplies searchable navigation, projects, writing, contact and theme commands with focus recovery.
Projects use compact filtered visual previews with native inline project briefs. Hackathons use an inline Polaroid carousel with exact results and honest missing-media states.
Contributions use a real seven-row calendar with custom themes and date tooltips. Photography uses a rotating, controllable homepage filmstrip linked to collection anchors in the single gallery route.
Quotes have sourced text and optional playback. The counter shows actual page views or unavailable.
See [interaction specification](interaction-spec.md) for exact keyboard, timing, error, cache and reduced-motion behavior.

## E. Technical architecture and trade-offs

Preserve React, strict TypeScript, Vite, React Router, the current module direction and installed Base UI primitives.
Keep content separate from components. Keep transport and validation outside presentation.
The current manifest contains no Tailwind, Motion or GSAP dependencies. These remain proposals, not integrated tools.

Recommend ordinary CSS for the visual system and small transitions. Tailwind CSS 4 can be added after approval if utility styling is preferred.
Motion remains optional for a measured shared-element need. GSAP and Three.js have no established requirement here.
Native [CSS scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) can support the first filmstrip implementation.
Consider Embla only if real drag/keyboard qualification exposes a gap that warrants the dependency.
Do not add shadcn wrappers over working Base UI primitives merely to introduce another component source.
Before any new adoption, check its license, maintenance, actual consumer and replacement boundary.

Keep Bear Blog as the publication source. A curated local metadata file is the simplest first boundary while source access remains unreliable.
A later build-time feed import needs a confirmed feed URL, metadata validation and publication-failure handling.
Do not add a CMS for one available article.

Recommend React Activity Calendar as the renderer, with custom styling and a focus adapter. No dependency is installed.
See [candidate comparison](heatmap-research.md) for source versions, compatibility limits, examples and alternatives.
Use a small server-side GitHub gateway after hosting and server scope are approved.
GitHub's [contribution schema](https://docs.github.com/en/graphql/reference/users) supplies years, weeks, dates, levels, counts and totals.
Keep its token outside browser bundles and every `VITE_` value. Fix the permitted username to Debrato2005 and validate year input.
Bound provider requests, validate responses, cache them, and avoid exposing raw errors or private repository details.
No credentials were requested or inspected in this design stage.

For page views, evaluate the chosen host's aggregate analytics API first.
If it cannot supply the intended public count, use one minimal serverless counter with atomic durable storage and request deduplication.
Avoid a database solely for a decorative counter. A memory-only counter cannot survive process restarts and is unsuitable.
Use no persistent visitor identifier by default. Minimize retained request data and document bot-filtering limits.
Server deployment and storage remain a separate boundary pending hosting choice. The frontend alone cannot make this statistic real.

## F. Content inventory

The resume supplies the name, degree, two internships, six project candidates, a SVASTH result, skills, leadership and astrophotography workflow.
Its PDF annotations supply five actual repository URLs and the contact links.
Use OncoSyn and Smolink as work in development, and Cryptalis as a research prototype.
Do not publish unsourced clinical, security, production or quantitative claims as established results.

Missing content includes photographs, event documentation, source-backed project visuals/results, article metadata and a phone-free public resume.
The GitHub calendar and visitor counter also need live data boundaries.
See [content inventory](content-inventory.md) for exact dates, links, source distinctions, quotation candidates and fingerprints.

## G. Build outline and quality gates

This is a review-stage outline. The detailed implementation plan begins after design approval.

| Milestone | Scope                                                      | Acceptance gate                                                                                    |
| --------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1         | Routes, shell, static sourced content, recovery states     | Typecheck/build, route-focus and content-status review                                             |
| 2         | Approved visual system, fonts, themes, navigation, palette | First-paint theme, keyboard/focus journeys, 320px reflow, both-theme screenshots                   |
| 3         | Hero scramble and observation field                        | One-run behavior, interruption recovery, reduced-motion and hidden/idle resource checks            |
| 4         | Projects/case studies, experience, skills                  | Source-backed claims, filters, preview parity across hover/focus/touch                             |
| 5         | Events, writing and photography                            | Real assets/metadata, swipe/drag/key behavior, dialog recovery, image loading                      |
| 6         | GitHub gateway and engineering timeline                    | Authentic data, cache/error/rate-limit states, date navigation, no exposed secrets                 |
| 7         | Contact, public resume, quotes and page views              | Privacy-safe assets, quote sources, actual hosted count/failure behavior                           |
| 8         | Final qualification                                        | Chromium/Firefox/WebKit journeys, responsive themes, manual accessibility and measured performance |

Capture desktop/mobile light/dark screenshots for every major route and repeat after substantial visual changes.
Check 320/390/768/1366/1920px, 200 percent text size, focus, overflow, contrast and reduced motion.
Measure laboratory performance on the production build. Field Core Web Vitals remain unqualified until enough real traffic exists.
Prefer end-to-end behavior first, integration at data boundaries next, and selective deterministic tests for distinct risks.
After approval, produce `architecture.md`, `implementation-checklist.md`, and `verification-plan.md` as required by the brief.

## H. Open decisions

1. Review the combined original direction. Anurag guides structure, Sakthi guides hover atmosphere, and Parth guides hackathon photographs.
2. Confirm whether engineering recruiters and research collaborators are the main audiences, or rank another audience first.
3. Decide which personal photographs and event images have publication permission, including other identifiable people and locations.
4. Choose hosting before implementing protected GitHub calls and real page views. No hosting purchase or deployment is authorized here.
5. Supply publication evidence for event and numerical claims, or approve clearly labeled owner-reported wording where appropriate.

No answer about the name, internship dates, degree, email or supplied repository links is needed. Those came from the resume.
Optional choices can use the stated defaults. Asset permission and truthful publication cannot use invented defaults.

## Design review status

Written specification: corrected for the owner's originality, hover-background and heatmap requirements.
Both previous concept sets are rejected as current design targets. Their artifacts remain preserved.
Heatmap research: source-backed recommendation ready. Theme styling and keyboard adapters remain TARGET.
A new visual proposal and full website implementation remain PLANNED.
The original brief still requires design approval before full website implementation.
