# Landscape artwork contract

**Status:** TARGET. The owner will supply four images. No generated substitute is requested.

The supplied [light screenshot](design/selected-light.png) and [dark screenshot](design/selected-dark.png) establish the selected layout direction.
Both are 941 × 1672 pixels. Their example jobs, awards, counters and photographs are not publication evidence.

| Theme | Base image                    | Revealed image                              |
| ----- | ----------------------------- | ------------------------------------------- |
| Light | Monochrome graphite landscape | Colored daytime version of that landscape   |
| Dark  | Dark monochrome landscape     | Colored nighttime version of that landscape |

Suggested names: `light-sketch`, `light-color`, `dark-sketch`, `dark-color`.
Use matching dimensions, aspect ratio, camera position, crop and feature positions within each pair.
Mountains, clouds, the figure and celestial objects must align. Added detail must not shift their geometry.
Matching dimensions across all four images also keeps theme transitions steady.
The owner chooses the scenes. Astronomy, mountains or a seated figure are suggestions rather than required subjects.

TARGET: a WebGL shader mixes each registered sketch/color pair beneath a soft cursor mask.
Both images use identical cover scaling and UV coordinates. No independent crop or parallax may break registration.
Theme changes switch both images together. Resizing, pointer coordinates and device pixel ratio share the same scene mapping.
Keep readable foreground surfaces stable. The background must not capture clicks, focus or scrolling.
Pause rendering while hidden or offscreen. Coarse pointers and reduced motion receive a stable composition.
WebGL failure or context loss leaves a usable static image and readable page.

Implement and qualify the shader after the artwork arrives, as requested.
The current hero reserves space without artwork requests, broken image URLs or a shader-completion claim.
Personal photography and event media are separate assets. These illustrations cannot replace the owner's photographs.
