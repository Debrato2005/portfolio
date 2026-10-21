# Landscape artwork contract

**Status:** CURRENT. The owner supplied and authorized four landscape PNGs in `bg/`.

The [light screenshot](design/selected-light.png) and [dark screenshot](design/selected-dark.png) establish foreground layout direction. Their example jobs, awards, counters and photographs are not publication evidence.

| Theme | Base image                            | Revealed image                                     |
| ----- | ------------------------------------- | -------------------------------------------------- |
| Light | `Graphite Mountain Lake Overlook.png` | `Watercolor Valley Vista with Laptop Traveler.png` |
| Dark  | `Moonlit Mountain Solitude.png`       | `Moonlit Mountain Lake Stargazer.png`              |

Every original is 1672 × 941 RGB PNG. Filenames and bytes are preserved. [Background review](sketch-to-color-background.md) records inspected contents, corresponding landmarks, crop choices, local texture differences and configuration.

CURRENT: one hero-scoped WebGL renderer mixes each sketch/color pair through an accumulated, fading, noise-warped mask. Both layers use identical cover scaling and UV coordinates. Artwork has no independent crop or parallax. The desktop crop is 72%/52%; phones/tablets at 820px and below use 80%/47% for both layers.

Theme changes reset the trail and switch the pair atomically. Resizing, pointer coordinates and capped pixel ratio share the scene mapping. Readable foreground backing remains stable. The background captures no clicks, focus or scrolling.

Rendering stops after settling and resets while hidden or offscreen. Touch contact can reveal without preventing native scrolling. Reduced motion skips the renderer and retains the monochrome sketch. WebGL failure or context loss leaves the correct static sketch. Existing theme persistence remains unchanged.

The images share the structural composition but differ in fine cloud, flower, foliage and moon texture. The mask replaces the interior while feathering its moving boundary; exact pixel identity of separately illustrated details is not claimed. No source image was altered to force registration.

Personal photography and event media remain separate assets. These illustrations do not replace the owner's photographs. Runtime/browser evidence and limits are recorded in [handoff](HANDOFF.md).
