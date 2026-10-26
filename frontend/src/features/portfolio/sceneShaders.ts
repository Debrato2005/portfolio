export const sceneVertexShader = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// Noise deforms only the reveal field. Warping artwork would break registration.
export const sceneFragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uSketch;
uniform sampler2D uColor;
uniform sampler2D uTrail;
uniform vec2 uSize;
uniform vec2 uImageSize;
uniform vec2 uPosition;
uniform float uTime;
uniform float uNoise;
uniform float uRadius;
uniform float uSoftness;
uniform float uStrength;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p) {
  float n = 0.0, amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    n += amplitude * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + 7.3;
    amplitude *= 0.5;
  }
  return n;
}
void main() {
  // CSS object-fit: cover with the exact same position as the fallback images.
  vec2 ratio = uSize / uImageSize;
  vec2 visible = uSize / (uImageSize * max(ratio.x, ratio.y));
  vec2 uv = vUv * visible + (1.0 - visible) * uPosition;
  // Ink smoke: two drifting noise octaves bend the trail lookup, so the reveal
  // curls and billows instead of following the pointer as a clean circle.
  vec2 p = vUv * uSize / 180.0;
  float drift = mix(fbm(p + vec2(uTime * 0.12, -uTime * 0.08)),
                    fbm(p * 1.8 + vec2(-uTime * 0.08, uTime * 0.1)), 0.45);
  vec2 flow = vec2(drift, fbm(p + vec2(19.7, -uTime * 0.16))) - 0.5;
  vec2 warped = vUv + flow * uRadius * uNoise * 4.2 / uSize;
  float trail = texture2D(uTrail, clamp(warped, 0.001, 0.999)).r;
  float field = trail * smoothstep(0.1, 0.72, drift);
  // Thin wisps trail off the body of the smoke.
  float wisps = fbm(p * 2.2 + vec2(uTime * 0.18, -uTime * 0.12));
  field += trail * smoothstep(0.45, 0.85, wisps) * 0.35;
  float mask = smoothstep(0.05, 0.42 + uSoftness * 0.3, clamp(field, 0.0, 1.0));
  // Multiplication guarantees the untouched sketch is exact, including after fading.
  mask *= smoothstep(0.0, 0.12, trail) * uStrength;
  gl_FragColor = mix(texture2D(uSketch, uv), texture2D(uColor, uv), mask);
}`;
