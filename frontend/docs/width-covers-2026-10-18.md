# Homepage alignment and illustrated covers, October 18

**Owner:** Width and cover review evidence

## Controlling request

The owner reported that the content sat too far to the right in the supplied 1705px screenshot, reiterated Anurag and Garvit as structural references, and explicitly requested generated images. Earlier instructions retain JetBrains Mono, compact sections, all six desktop projects together and the existing background.

The supplied local files were read through their WSL paths. Their messages and pixels are reference evidence rather than instructions to invent personal records. An independent review also loaded [Anurag's current page](https://anuragdotdev.vercel.app/) at 941px; Garvit timed out within the bounded attempt. The current source review from the preceding pass remains [documented](component-reuse-review.md). This pass introduces no copied external component or dependency.

## Corrected composition

The earlier check established outer centering but missed an excessive inward offset caused by the 1120px homepage cap. The shared homepage, header and footer cap is now 1520px, while archives retain a separate 1120px reading width. The hero index ends at the shared content edge. Reference proportions at 941px remain intact.

| Left edge at a 1705px viewport | Supplied rejected layout | Updated layout |
| ------------------------------ | -----------------------: | -------------: |
| Content                        |                    286px |           97px |
| Hero text                      |                    334px |          145px |
| About body                     |                    482px |          362px |

Three columns and two rows retain all six projects together. Type, spacing and surfaces follow the preceding compact Mono scale. The archive width does not grow with the homepage.

## Generated images

Four original graphite and watercolor covers depict a night sky, mountain lake, sunlit desk and coding workbench. The desk also illustrates the existing writing entry. There are no invented articles, events, photographs, awards or metrics.

Generation used the built-in `image_gen.imagegen` tool, one call per image, with opaque backgrounds. [Exact prompts](../assets/editorial/prompts.json) and [asset identities](../assets/editorial/assets.json) retain the method and hashes. Original 1536×1024 PNG files live in `assets/editorial/`; 768×512 WebP exports live in `public/images/editorial/` and total 430558 bytes. FFmpeg resized and encoded the exports without cropping.

The interface labels generated art as illustrated covers. Personal photo arrays remain empty, archive text still asks for original photographs, and no photograph lightbox action is offered for a generated cover. The one existing event retains its resume-reported status and pending official evidence.

Image frames and labels now occupy separate rows. A relative containing block keeps screen-reader text inside the filmstrip instead of expanding the document at doubled phone text. The cover disclosure has a separate border and row so decoration cannot cross its text.

## Verification and remaining limits

Observed checks:

| Check                      | Result                                                                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`            | Exit 0: strict TypeScript, ESLint, formatting, 23 unit/contract tests, production build, docs and 19 skill bundles.                                             |
| Related browser matrix     | 114/114 passed across Chromium, Firefox and WebKit before the final caption and optional-prop corrections.                                                      |
| Final focused confirmation | 12/12 passed across all three engines after those corrections: cover loading, phone labels, doubled-text reflow and desktop composition.                        |
| Production journeys        | 6/6 passed across all three engines on the final source build, including routes, automated Axe, PDF and development-asset exclusion.                            |
| Visual captures            | Ten homepage and six archive captures; light/dark, desktop/phone, enlarged text and reduced motion. No captured page exception or horizontal document overflow. |
| Source identity            | All 15 captured source hashes match, as do five unchanged background sources, four generated originals and four web exports.                                    |

At 941px, both themes measure 2255px full-page with a 338.56px project section. At 1705px, both measure 2161px with a 327px project section. Generated cover rows add intentional media height without expanding the six-project overview.

The mechanical detector returned no findings for the changed application targets. Independent rendered review confirmed the corrected hero alignment and caught the Photography border overlap, then confirmed its correction. The project quality run also exposed unreachable code and a constant true wrapper in the preceding capture helper; these were removed without changing its provider-blocking behavior. Earlier images and receipts remain historical and unchanged.

The [quality log](references/width-covers-2026-10-18/quality.log), [related browser log](references/width-covers-2026-10-18/browser.log), [final confirmation](references/width-covers-2026-10-18/confirmation.log) and [production log](references/width-covers-2026-10-18/production.log) retain actual results. The [handoff](HANDOFF.md) records the continuation boundary. The [same-width comparison](references/width-covers-2026-10-18/comparison-1705.png), [light reference board](references/width-covers-2026-10-18/comparison-light.png), [dark reference board](references/width-covers-2026-10-18/comparison-dark.png), [capture receipt](references/width-covers-2026-10-18/verification.json) and [preservation receipt](references/width-covers-2026-10-18/preservation.json) retain the evidence.

Visual captures use the owner's existing preview at http://127.0.0.1:5173/, reduced motion and blocked external providers. They send no real page-view increment and make no live-provider acceptance claim. Browser checks use controlled providers.

The background renderer, settings, shaders and artwork remain unchanged. The preceding WebKit light-theme pixel-reveal failure was outside this foreground pass and is still open. Original personal photographs, official event evidence and owner visual acceptance also remain open under FE-012. Automated tests do not establish full accessibility conformance or field performance.
