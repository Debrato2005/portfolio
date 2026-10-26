import { useEffect } from 'react';
import { shape } from './shapes';
import type { ShapeName } from './shapes';

const burstShapes: ShapeName[] = [
  'sunny',
  'clover4',
  'flower',
  'cookie9',
  'pentagon',
  'triangle',
  'cookie12',
];
const burstTones = [
  '--md-primary',
  '--md-tertiary',
  '--md-secondary',
  '--md-primary-container',
  '--md-tertiary-container',
];
/** Bursts M3 shapes from a point; they arc, spin, morph and fall away. */
export function celebrate(origin?: { x: number; y: number }) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const x = origin?.x ?? innerWidth / 2;
  const y = origin?.y ?? innerHeight / 3;
  for (let index = 0; index < 36; index++) {
    const piece = document.createElement('span');
    const size = 12 + Math.random() * 26;
    const from = burstShapes[index % burstShapes.length] ?? 'sunny';
    const to = burstShapes[(index + 3) % burstShapes.length] ?? 'circle';
    piece.className = 'burst-piece';
    piece.setAttribute('aria-hidden', 'true');
    Object.assign(piece.style, {
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: `var(${burstTones[index % burstTones.length]})`,
    });
    document.body.append(piece);
    const angle = Math.random() * Math.PI * 2;
    const reach = 120 + Math.random() * 260;
    const dx = Math.cos(angle) * reach;
    const dy = Math.sin(angle) * reach - 140;
    const turn = (Math.random() - 0.5) * 900;
    void piece
      .animate(
        [
          { transform: 'translate(0, 0) scale(0.2)', clipPath: shape(from) },
          {
            transform: `translate(${dx}px, ${dy}px) rotate(${turn / 2}deg) scale(1)`,
            clipPath: shape(to),
            offset: 0.45,
          },
          {
            transform: `translate(${dx * 1.2}px, ${dy + 520}px) rotate(${turn}deg) scale(0.7)`,
            clipPath: shape(from),
            opacity: 0,
          },
        ],
        {
          duration: 1600 + Math.random() * 900,
          easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)',
          fill: 'forwards',
        },
      )
      .finished.catch(() => undefined)
      .finally(() => piece.remove());
  }
}
const konami = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
/** The Konami code anywhere outside a text field starts a celebration. */
export function useKonamiCelebration() {
  useEffect(() => {
    let position = 0;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position =
        key === konami[position] ? position + 1 : key === konami[0] ? 1 : 0;
      if (position === konami.length) {
        position = 0;
        celebrate();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
