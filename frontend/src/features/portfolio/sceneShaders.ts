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
  vec2 p = vUv * uSize / 115.0;
  vec2 flow = vec2(fbm(p + vec2(uTime * 0.25, 0)),
                   fbm(p + vec2(19.7, -uTime * 0.21))) - 0.47;
  vec2 warped = vUv + flow * uRadius * uNoise * 2.6 / uSize;
  float trail = texture2D(uTrail, clamp(warped, 0.001, 0.999)).r;
  float pigment = fbm(p * 2.6 + flow * 1.8 + uTime * 0.13);
  float field = trail - (pigment - 0.35) * uNoise * 0.9;
  float mask = smoothstep(0.12, 0.38 + uSoftness * 0.5, field);
  // Multiplication guarantees the untouched sketch is exact, including after fading.
  mask *= smoothstep(0.0, 0.16, trail) * uStrength;
  gl_FragColor = mix(texture2D(uSketch, uv), texture2D(uColor, uv), mask);
}`;
