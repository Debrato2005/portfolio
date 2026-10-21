# Interactive sketch-to-color background

**Owner:** Portfolio scene implementation and acceptance

## Scope and rendering

CURRENT: the homepage hero uses the four owner-supplied PNGs through one reusable `BackgroundScene` component. Other sections retain the current paper/charcoal surface and geometry. No runtime dependency was added.

The [reference component](https://github.com/sakthii05/portfolio/blob/f65dfaa95b24c88345626bd189fefd257e4f7741/components/home/FluidDistortionEffect.tsx) was inspected directly, and the [live reference](https://sakthi-portfolio-mauve.vercel.app/) was exercised in Chromium. It uses Three.js, React Three Fiber, a canvas trail texture, cover UVs and animated fractal noise. This Vite app has no Three.js dependency. The local renderer implements that interaction principle with a single WebGL 1 full-screen triangle, two artwork samplers and one small canvas mask texture. Reference illustrations, components and page structure were not imported.

Passive pointer events feed bounded quadratic strokes into the mask. Nested blurred strokes soften the pigment boundary. Four-octave fBm deforms the mask coordinates and breaks up its edges. Artwork coordinates remain fixed. Frame-time-based fading settles the trail; rendering stops completely afterward. This is a reveal field with procedural fluid-like movement, rather than a Navier–Stokes fluid simulation.

## Verified image mapping and alignment

All originals are RGB PNG, 1672 × 941 (aspect ratio approximately 1.777). They remain at their original paths with unchanged bytes.

| Theme | Initial sketch                           | Revealed color                                        |
| ----- | ---------------------------------------- | ----------------------------------------------------- |
| Light | `bg/Graphite Mountain Lake Overlook.png` | `bg/Watercolor Valley Vista with Laptop Traveler.png` |
| Dark  | `bg/Moonlit Mountain Solitude.png`       | `bg/Moonlit Mountain Lake Stargazer.png`              |

Direct visual inspection found matching camera perspective, main peak, traveler silhouette, laptop, cliff and moon positions within each pair. Approximate normalized landmarks: the light peak is near (0.63, 0.49), the light traveler near (0.83, 0.55); the dark peak is near (0.61, 0.51), the dark traveler near (0.84, 0.57). These are visual registration guides, not a numerical optical-flow qualification.

Cloud rendering, flowers, foliage, moon detail and watercolor texture differ locally. A global scale/translation correction would move already-matched structural landmarks. Both layers therefore use the same cover transform and crop, with no independent translation, resampling, parallax or source edits. The opaque reveal interior and narrow organic transition avoid broad superposition. Some local texture morphing at the moving boundary is inherent to these different illustrations; exact pixel correspondence is not claimed.

Desktop object position is 72% horizontally and 52% vertically. At 820px and below it is 80%/47%, keeping the traveler side of the composition. Cover cropping intentionally removes part of the sky/lake in a short desktop hero and the left landscape on tall phones. The scene never stretches. Its CSS properties feed the shader's identical crop transform.

## Configuration and ownership

`src/features/portfolio/sceneArtwork.ts` owns artwork URLs and the defaults. `BackgroundScene` accepts a partial `settings` object, so consumers can tune the effect without editing shaders.

| Setting            | Default   | Meaning                                                     |
| ------------------ | --------- | ----------------------------------------------------------- |
| `revealRadius`     | 115       | Radius in CSS pixels                                        |
| `edgeSoftness`     | 0.38      | Feather width relative to radius                            |
| `noiseIntensity`   | 0.65      | Mask domain warp and pigment breakup                        |
| `trailPersistence` | 0.45      | Seconds before the final idle fade begins                   |
| `fadeDuration`     | 1.8       | Seconds for the final fade; also controls local trail decay |
| `maxPixelRatio`    | 1.5       | Device-resolution cap                                       |
| `maxPixels`        | 1,500,000 | Maximum WebGL drawing-buffer area                           |
| `maskResolution`   | 640       | Maximum mask dimension                                      |

`sceneRenderer.ts` owns GPU allocation, input, image decoding, theme observation and scheduling. `sceneShaders.ts` owns the shaders. `styles/background-scene.css` owns crop and contrast veils. No React state updates occur per animation frame.

## Theme, failure and accessibility

Both sketches are ordinary decorative images, independent of GPU success. The active sketch appears before any interaction. The renderer decodes the active pair first, then warms the other pair without allocating additional GPU artwork textures. Theme changes invalidate pending image completions, hide the previous GPU frame, clear the trail and switch both samplers together. Existing saved/system theme handling and its view transition remain in their original owner.

A strong paper/charcoal veil protects left-side text. The note and section index have stable backing. The scene is absolute, aria-hidden, unfocusable and pointer-transparent. Foreground clicks, name scramble, keyboard focus, navigation and native scrolling keep their existing handlers. Touch and pen use passive pointer contact events, without pointer capture or preventing scrolling.

Reduced motion bypasses the renderer import and GPU allocation, and disables the sketch crossfade. Runtime preference changes release/recreate the renderer. Context creation, shader, image or module failure leaves the static sketch. Context loss also exposes the static image; automatic context restoration is intentionally omitted. Remounting or changing the motion preference can create a fresh renderer.

The loop resets when offscreen or hidden. Unmounting releases textures, shaders, buffer, program and context, disconnects observers, removes listeners and cancels animation frames. Async image completion checks generation and disposal before uploading.

## Performance and compatibility limits

The authoritative originals total 12,394,517 bytes. No compressed derivative replaced them. Both sketches load for theme availability; color images load only for motion-enabled rendering. This preserves source fidelity but makes first-load transfer materially larger than an optimized WebP/AVIF art pipeline. Images use normal browser HTTP caching.

Only the current artwork pair resides in GPU textures. Decoded image promises are retained for both themes until unmount. The renderer uses no depth, stencil, antialiasing, postprocessing or extra WebGL canvas. Resolution is capped by both pixel ratio and area. Idle GPU drawing is zero after settling.

Automated desktop browser results and local timing measurements do not establish frame rates on physical phones, field Core Web Vitals or universal GPU compatibility. Devices without working WebGL receive the static sketch.

## Files in this change

Created rendering/configuration files: `src/features/portfolio/sceneArtwork.ts`, `sceneRenderer.ts`, `sceneShaders.ts`, and `src/styles/background-scene.css`. Created behavioral coverage: `tests/e2e/background-scene.spec.ts`. The existing `tests/e2e/command-palette.spec.ts` now waits for dialog close and focus restoration before inserting its synthetic editor; the shortcut assertions are unchanged.

Modified integration: `src/features/portfolio/BackgroundScene.tsx`, `src/routes/HomePage.tsx` (move the scene into the existing hero), and `playwright.production.config.ts` (include background journeys in production checks).

Updated current documentation: `PRODUCT.md`, `README.md`, `docs/BUILD_CHECKLIST.md`, `DESIGN_SYSTEM.md`, `FRONTEND_ARCHITECTURE.md`, `HANDOFF.md`, `README.md`, `SOURCE_LEDGER.md`, `TESTING_AND_QUALITY.md`, `artwork-contract.md`, `interaction-spec.md` and `requirements.md`. This review and `docs/references/sketch-to-color/` are new. The four original `bg/` PNGs, dependency manifests, root files, imported skills and unrelated application work retain their original bytes.

## Verification evidence

The feature tests read actual GPU pixels after draws, compare the registered initial image against the supplied sketch, check that revealed pixels approach the correct color asset, and require an exact return to initial pixels. They also cover idle draw counts, both themes, saved theme, keyboard focus/name settling, touch, overflow, reduced motion, WebGL creation failure, context loss, route remount, texture disposal, offscreen suspension and a deterministic Page Visibility event.

The [comparison board](references/sketch-to-color/comparison.png) shows both themes before interaction and during a trail. [Capture receipt](references/sketch-to-color/verification.json) retains sixteen cases, source hashes, geometry and local timing. Captures span 320, 390, 768, 941, 1440 and 1920px widths, including reduced motion and context loss. No captured case had horizontal overflow or a page/rendering error. Two browser network errors came from deliberately aborted external profile/calendar providers, separately recorded; no public counter increment was sent.

Local Chromium timing measured 137 draws per isolated settling sequence in each theme, median frame spacing around 16.7ms and p95 around 17.1–17.3ms. Both sequences had zero additional draws during the subsequent idle observation. This is local browser scheduling evidence, not a physical-phone or field performance guarantee. Initial and faded screenshots in both themes had zero differing pixels under ImageMagick's absolute-error comparison.

A focused independent source review found a context-loss/decode race. A failing regression reproduced a theme change re-exposing the lost canvas. A terminal context-loss flag, generation invalidation and a post-decode context check close the race. Theme-after-loss and loss-during-decode regressions passed in all three browser engines; review of the fix found no remaining blocking issue.

The final focused development command passed all 30 background checks across Chromium, Firefox and WebKit. The expanded production command passed all 36 checks across the same engines, including those background cases and the existing six production checks. The broad serial development matrix passed 255/261 checks. Four failures came from an earlier image-test helper selecting Vite JavaScript URL wrappers rather than PNG requests; the helper now selects actual image initiators. One WebKit touch check timed out and subsequently passed in both final feature suites. An existing WebKit shortcut test inserted its synthetic editor before modal focus restoration; waiting for the completed close fixed that test without changing application behavior, followed by 3/3 engine passes. All cases were observed passing across the broad and focused runs; no single aggregate development invocation was fully green. Final commands and limits are recorded in [handoff](HANDOFF.md). Visual artifacts are review evidence, outside the production public directory.
