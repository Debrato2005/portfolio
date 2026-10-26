import type { CSSProperties } from 'react';
/**
 * Material 3 Expressive shape approximations. Every shape shares the same
 * vertex count, so CSS can interpolate `clip-path` between any two of them.
 */
const vertices = 72;

type Radius = (angle: number) => number;
const lobes =
  (count: number, depth: number, turn = 0): Radius =>
  (angle) =>
    1 + depth * Math.cos(count * (angle + turn));
const squircle =
  (power: number): Radius =>
  (angle) =>
    (Math.abs(Math.cos(angle)) ** power + Math.abs(Math.sin(angle)) ** power) **
    (-1 / power);

const radii = {
  circle: () => 1,
  cookie4: lobes(4, 0.09, Math.PI / 4),
  cookie6: lobes(6, 0.07),
  cookie9: lobes(9, 0.055),
  cookie12: lobes(12, 0.045),
  clover4: lobes(4, 0.2, Math.PI / 4),
  clover8: lobes(8, 0.12),
  sunny: lobes(10, 0.07),
  flower: lobes(6, 0.16),
  pentagon: lobes(5, 0.1, -Math.PI / 2),
  triangle: lobes(3, 0.14, -Math.PI / 2),
  squircle: squircle(5),
  square: squircle(9),
} satisfies Record<string, Radius>;

export type ShapeName = keyof typeof radii;
export const shapeNames = Object.keys(radii) as ShapeName[];

const cache = new Map<ShapeName, string>();
export function shape(name: ShapeName) {
  const cached = cache.get(name);
  if (cached) return cached;
  const radius = radii[name];
  const samples = Array.from({ length: vertices }, (_, index) => {
    const angle = (index / vertices) * Math.PI * 2;
    return [angle, radius(angle)] as const;
  });
  const largest = Math.max(
    ...samples.map(([angle, r]) =>
      Math.max(Math.abs(r * Math.cos(angle)), Math.abs(r * Math.sin(angle))),
    ),
  );
  const value = `polygon(${samples
    .map(
      ([angle, r]) =>
        `${(50 + (50 * r * Math.cos(angle)) / largest).toFixed(2)}% ${(50 + (50 * r * Math.sin(angle)) / largest).toFixed(2)}%`,
    )
    .join(', ')})`;
  cache.set(name, value);
  return value;
}

/** Inline custom properties for an element that rests in one shape and morphs to another. */
export function morph(rest: ShapeName, active: ShapeName = 'squircle') {
  return {
    '--shape-rest': shape(rest),
    '--shape-active': shape(active),
  } as CSSProperties;
}
