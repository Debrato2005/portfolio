# Compact Mono foreground review, October 18

**Owner:** Typography and proportion evidence

## Controlling request

The owner selected JetBrains Mono-led typography, minimal foreground surfaces and the supplied compact light/dark structure, then rejected the first Mono comparison as still too tall: “compact it like left.” That later instruction controls desktop density. The illustrated background remains unchanged.

The two original 941px screenshots were opened through their WSL paths, as were the supplied Parth event screenshot and the later paired comparison. The screenshots guide proportions rather than personal facts. Debrato has six projects, one existing event record and empty personal photo collections; these remain intact. No extra sample events, articles or photographs were invented to fill the reference composition.

## Implemented treatment

JetBrains Mono now serves navigation, headings, section labels, project titles, controls, tags and technical metadata. Inter regular serves longer paragraphs. Both are self-hosted WOFF2 assets with local preloads, swap behavior and system fallbacks. The interface uses one variable Mono face and one Inter face; previous runtime font imports are removed. Package manifests and the lockfile are unchanged.

The initial paragraph comparison at 941px showed Inter text occupying 183px against 233px for Mono at the earlier reading size. That experiment helped select Inter for longer copy. The final compact About uses smaller desktop type and a stretched adjacent snapshot, so its container height alone is not a paragraph legibility measurement. The font choice also reflects the rendered line rhythm and separation of prose from technical roles.

`tokens.css` owns the role scale, `fonts.css` owns delivery and `primitives.css` owns shared prose, controls, tags and margin notes. Project card rules were removed from the legacy portfolio stylesheet and consolidated in `project-cards.css`; empty rules left by the removal were also deleted. Existing React components remain the reusable structure, without a new component library.

At desktop widths, About uses 13px prose, general body copy 14px, project titles 15px, summaries 12px, metadata 11px and compact project technologies 10px. Ordinary desktop controls use 30px, project disclosures 24px and filmstrip arrows 28px. Phone copy keeps the earlier larger scale and controls retain 44px targets. These dense desktop roles follow the owner's later comparison feedback; the root remains 16px and browser zoom remains 1.

Projects now place portrait artwork beside the title, status and complete summary, with technologies on a shared full-width row. Three columns and two rows show all six entries together at 941px and larger. Tablets use two columns and phones stack the cards. Native briefs retain complete engineering detail without a project carousel or clamped summaries.

The desktop snapshot, experience columns, event paper, skills, writing row, filmstrip and footer use tighter dimensions. Transparent panels, quiet borders, normal tracking and sentence-case labels replace the earlier display and handwritten decoration. Margin notes read as connected sentences. Both themes share the same geometry.

The shorter sections exposed a section-index defect: the old activation line at 40 percent of the viewport could already select Experience when Projects reached the top. It now uses a bounded reading line near the top of the viewport, so compact sections keep accurate navigation state.

## Same-width results

All values below come from normal-zoom Chromium captures with reduced motion and external data providers blocked. Unavailable values are explicit; no real page-view increment was sent.

| 941px viewport      | Rejected Mono pass | Compact final |
| ------------------- | -----------------: | ------------: |
| Full page           |             2902px |        2152px |
| Six-project section |           492.58px |      338.56px |
| About               |              212px |         159px |
| Hackathons          |              317px |         186px |
| Skills              |              181px |         120px |
| Photography         |              239px |         163px |

The full page is about 26 percent shorter. At 1440px the final full page is 2049px and the project section is 327px. Light and dark capture dimensions match. All ten homepage captures and six archive captures fit their viewport without document overflow or captured page exceptions, including 320px with doubled text and the 941px enlarged-text case.

The final page retains an extra project row and fuller real content compared with the supplied three-project illustration. This review does not claim identical page height or pixel-perfect reproduction. The missing personal photographs and event evidence remain visible content boundaries.

## Later alignment report

The owner reported a tiny, displaced column on `http://127.0.0.1:5173/`. Fresh browser measurements on that exact port and on 5187 showed centered outer content and no document overflow at 941, 1440, 1705, 1920, 3840 and 4272px. The reported left placement was not reproduced in a clean browser context, so its exact runtime cause is not established.

A separate wide-screen defect was confirmed in the source and rendered geometry: header and hero padding grew with `3.3vw` even after the document column reached its maximum width. At 4272px this produced about 141px of inset. Both now use one shared bounded inset with a 48px maximum. The name stays on one line at wide widths, the wordmark aligns with hero copy, and header, main and footer share the centered column. The landscape artwork and background layout code remain unchanged. An independent review also found a third footer note falling into an extra grid row; it is now hidden in the two-column desktop closing area.

## Verification

The [handoff](HANDOFF.md) records observed final gate results. Review the [light comparison](references/mono-2026-10-18/comparison-light.png), [dark comparison](references/mono-2026-10-18/comparison-dark.png), [actual 5173 wide capture](references/mono-2026-10-18/alignment-5173-1920.png), [source/capture receipt](references/mono-2026-10-18/verification.json), [archive receipt](references/mono-2026-10-18/archive-verification.json) and [preservation receipt](references/mono-2026-10-18/preservation.json). The [quality log](references/mono-2026-10-18/quality.log), [alignment checks](references/mono-2026-10-18/alignment-run.log) and [production log](references/mono-2026-10-18/production-final.log) retain observed results. The production matrix passed 35/36; the isolated WebKit light-theme pixel reveal remains failing and is outside this foreground change. Earlier Mono and scale captures remain historical for their respective source versions.

The type detector flags Inter as an overused family. This is an explained choice for the paragraph role after the comparison above; JetBrains Mono provides the interface identity. A clean detector result is not claimed. Independent review checked the actual project, hero, About and Contact captures; its orphan hero separator was removed before the later density correction.

The existing landscape assets, background renderer and shaders remain byte-for-byte identical to the turn baseline. Theme behavior, palette actions, data-provider logic and personal content are preserved. Only the section-index activation threshold changes navigation behavior in this foreground pass.

Owner visual acceptance remains open under FE-012. Automated accessibility checks, browser emulation and local font observations do not establish complete conformance, physical-device acceptance or field performance.
