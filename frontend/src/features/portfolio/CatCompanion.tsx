import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from './useReducedMotion';

const pointerQuery = '(hover: hover) and (pointer: fine)';
function subscribePointer(callback: () => void) {
  const media = window.matchMedia(pointerQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
// Sprite coordinates from MIT-licensed oneko.js by adryd. See public/licenses/oneko-LICENSE.txt.
const directions: Record<string, readonly [number, number][]> = {
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};
export function CatCompanion() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem('portfolio-cat') !== 'hidden';
    } catch {
      return true;
    }
  });
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(pointerQuery).matches,
  );
  const sprite = useRef<HTMLSpanElement>(null);
  const visible = enabled && finePointer && !reduced;
  useEffect(() => {
    const element = sprite.current;
    if (!visible || !element) return;
    let x = 48,
      y = Math.max(24, innerHeight - 80);
    let targetX = x,
      targetY = y,
      frame = 0,
      last = 0;
    let nap: ReturnType<typeof setTimeout> | undefined;
    let sleep: ReturnType<typeof setInterval> | undefined;
    const position = () => {
      x = Math.min(Math.max(16, x), innerWidth - 16);
      y = Math.min(Math.max(16, y), innerHeight - 16);
      element.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
    };
    const paint = (column: number, row: number) => {
      element.style.backgroundPosition = `${column * 32}px ${row * 32}px`;
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(nap);
      clearInterval(sleep);
      last = 0;
    };
    const idle = () => {
      element.dataset.catState = 'idle';
      paint(-3, -3);
      nap = setTimeout(() => {
        element.dataset.catState = 'sleeping';
        let phase = 0;
        paint(-2, 0);
        sleep = setInterval(() => {
          phase = 1 - phase;
          paint(-2, -phase);
        }, 600);
      }, 5000);
    };
    const run = (time: number) => {
      frame = 0;
      const dx = targetX - x,
        dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      if (distance <= 44) {
        idle();
        return;
      }
      const delta = last ? Math.min(time - last, 50) : 16;
      last = time;
      const step = Math.min(distance - 40, delta * 0.26);
      x += (dx / distance) * step;
      y += (dy / distance) * step;
      const direction =
        (dy / distance < -0.4 ? 'N' : dy / distance > 0.4 ? 'S' : '') +
        (dx / distance < -0.4 ? 'W' : dx / distance > 0.4 ? 'E' : '');
      const tile = directions[direction]?.[Math.floor(time / 120) % 2];
      if (tile) paint(tile[0], tile[1]);
      element.dataset.catState = 'running';
      position();
      frame = requestAnimationFrame(run);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || document.hidden) return;
      targetX = Math.min(Math.max(16, event.clientX), innerWidth - 16);
      targetY = Math.min(Math.max(16, event.clientY), innerHeight - 16);
      clearTimeout(nap);
      clearInterval(sleep);
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(run);
      }
    };
    const visibility = () => {
      stop();
      if (!document.hidden) idle();
    };
    const resize = () => {
      position();
    };
    position();
    idle();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      stop();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [visible]);
  if (!finePointer) return null;
  return (
    <>
      {visible && (
        <span
          ref={sprite}
          className="cat-sprite"
          data-cat-state="idle"
          aria-hidden="true"
        />
      )}
      <button
        type="button"
        className="cat-toggle"
        disabled={reduced}
        aria-pressed={enabled}
        onClick={() => {
          setEnabled(!enabled);
          try {
            localStorage.setItem(
              'portfolio-cat',
              enabled ? 'hidden' : 'visible',
            );
          } catch {
            /* Keep the session preference. */
          }
        }}
      >
        {reduced ? 'Cat resting' : enabled ? 'Hide cat' : 'Show cat'}
      </button>
    </>
  );
}
