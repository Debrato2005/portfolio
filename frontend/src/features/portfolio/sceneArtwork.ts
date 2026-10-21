import lightSketch from '../../../bg/Graphite Mountain Lake Overlook.png?url';
import lightColor from '../../../bg/Watercolor Valley Vista with Laptop Traveler.png?url';
import darkSketch from '../../../bg/Moonlit Mountain Solitude.png?url';
import darkColor from '../../../bg/Moonlit Mountain Lake Stargazer.png?url';

// Originals are authoritative. Both layers share one cover transform, never parallax.
export const sceneArtwork = {
  light: { sketch: lightSketch, color: lightColor },
  dark: { sketch: darkSketch, color: darkColor },
} as const;
export type SceneTheme = keyof typeof sceneArtwork;

export const sceneDefaults = {
  revealRadius: 56, // CSS pixels, independent of resolution and device pixel ratio
  edgeSoftness: 0.38, // fraction of radius
  noiseIntensity: 0.65, // domain warp and pigment breakup
  trailPersistence: 0.45, // seconds at full strength after the last movement
  fadeDuration: 1.8, // seconds to settle completely after persistence
  maxPixelRatio: 1.5,
  maxPixels: 1_500_000,
  maskResolution: 640,
} as const;
export type SceneSettings = { [K in keyof typeof sceneDefaults]: number };
