# Proposed design system

**Status:** TARGET. Approval pending. The existing setup tokens remain CURRENT.

## Composition

Direction: original Swiss editorial composition with a theme-aware illustrated environment.
Use Anurag's information density and section navigation as structural guidance.
Use original typography, plain section labels, fine dividers and varied project previews.
The earlier striped section bands, dashed rails and framed profile composition are superseded.

The introductory reading region sits within an original illustrated observatory environment.
Light and dark modes have related geometry but distinct atmosphere and detail.
Hover reveals a colored layer beneath a quiet base scene, while readable surfaces stay stable.
The scene can extend into margins. It is not confined to a thin banner.
The name remains compact and receives the one-run scramble. About and contact links remain easy to reach.
Photography and the hanging hackathon wall use actual owner-supplied images within the same palette.

## Target theme roles

These values specify proposed colors. They do not update or duplicate the current CSS token authority.
After approval, `src/styles/tokens.css` owns the implemented values.

| Semantic role       | Light target                      | Dark target                                 |
| ------------------- | --------------------------------- | ------------------------------------------- |
| Page                | Warm paper, `#F5F1E8`             | Charcoal, `#17191B`                         |
| Reading surface     | `#FFFDF8`                         | `#202327`                                   |
| Primary text        | `#20201E`                         | `#F4F1E8`                                   |
| Secondary text      | `#56534E`                         | `#B8B4AB`                                   |
| Accent text/fill    | Vermilion, `#B83C23`              | Warm coral, `#FF8A66`                       |
| Fine divider        | `#D3CEC4`                         | `#454A50`                                   |
| Focus               | Ink outline with paper separation | Warm-white outline with charcoal separation |
| Background geometry | Quiet graphite contours           | Sparse warm-white observation marks         |

Use accent color sparingly for active state, meaningful links and one background focus point.
Status, errors, success, and contribution levels need distinct semantic roles. A color alone must not communicate meaning.
Confirm text contrast after final compositing. Background geometry cannot determine control boundaries.

## Typography

Propose Geist for the name, headings and body/UI. Use Instrument Serif for brief editorial emphasis and IBM Plex Mono for metadata.
These replace the setup font trio if approved. Do not ship six families together.
Self-host licensed WOFF2 subsets and retain the actual distributed license files.
If replacement downloads are unavailable, retain the current fonts as a clearly disclosed temporary approximation.

| Role            | Target geometry                                                                |
| --------------- | ------------------------------------------------------------------------------ |
| Hero name       | 32–40px on desktop, 28–34px on mobile, compact one-line identity where it fits |
| Section heading | Fluid 24–40px                                                                  |
| Body            | 16–18px, 1.55–1.7 line height                                                  |
| Metadata        | 12–14px, mono, restrained uppercase                                            |
| Reading measure | 55–68 characters                                                               |

Keep DEBRATO GHOSH on one line when it fits. Use a controlled wrap only at narrow widths or enlarged text sizes.
The scramble shares the final name's reserved geometry. The actual accessible heading remains intact.

## Grid, spacing and controls

Target an 880–960px reading region with 24–32px internal desktop spacing.
Place a compact section index beside it only when the reading area, index and safe margins fit.
Top navigation, section labels and body text share deliberate alignment points.
Use a compact introduction with a substantial atmospheric scene, tuned against actual content rather than a copied cover height.

Use an 8px spacing base. Related content uses 16–32px gaps, with 40–64px gaps between distinct sections.
Prefer plain divider lines and small section numbers to decorative bands.
Project previews can use two columns where useful, with a different treatment for a featured project.
Do not make every section an identical card.
Most corners use 0–6px radii. Dialogs may use 12px. Photographs keep their natural ratios.
Controls target 44px touch geometry. Hover decoration cannot move a clickable boundary.

On narrow screens, replace the side index with a section menu and stack project previews.
Keep heatmap and photographic scrolling within their components.
Touch and reduced-motion scenes use a stable composed view rather than pointer chasing.
Test at 320px before accepting layout dimensions.

## Motion, layers and fallback

Use 120–180ms for control feedback, 180–240ms for local state changes, and 240–320ms for theme/background fades.
The hero scramble lasts 0.8–1.2 seconds. It does not delay links or body content.
Use one easing family and small transforms. Do not animate every paragraph.
Reduced motion removes scramble, parallax, auto-rotation and large transforms.

Layer order: decorative background, document, sticky navigation, floating controls, modal backdrop, modal content.
Decorative layers use no interactive hit area or accessible name.
The page remains readable if fonts, artwork or animation code fail.

The concept images are static art direction. They do not establish working controls or exact production assets.
Earlier concepts are superseded. The next visual proposal must show the original scene, photo treatments and required heatmap presentation.
