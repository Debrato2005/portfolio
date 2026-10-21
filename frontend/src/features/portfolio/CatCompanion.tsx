import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from './useReducedMotion';

const pointerQuery = '(hover: hover) and (pointer: fine)';
function subscribePointer(callback: () => void) {
  const media = window.matchMedia(pointerQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
// Sprite coordinates from MIT-licensed oneko.js by adryd325. See public/licenses/oneko-LICENSE.txt.
const idleFrame: readonly [number, number] = [-3, -3];
const spriteSets: Record<string, readonly (readonly [number, number])[]> = {
  idle: [idleFrame],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
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
const STEP_MS = 100; // oneko's classic tick, kept deliberately chunky
const STEP_PX = 10; // pixels per tick while chasing the pointer
const POKE_WINDOW_MS = 10_000;
const POKE_GRACE_MS = 3_000;

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
    let x = Math.min(72, innerWidth - 32);
    let y = Math.max(48, innerHeight - 96);
    let targetX = x;
    let targetY = y;
    let tick = 0;
    let phase = 0;
    let awakeUntil = 0;
    let state: 'sleeping' | 'poked' | 'chasing' = 'sleeping';
    let raf = 0;
    let lastTs = 0;
    const paint = (name: string, frame = 0) => {
      const set = spriteSets[name] ?? [idleFrame];
      const tile = set[frame % set.length] ?? idleFrame;
      element.style.backgroundPosition = `${tile[0] * 32}px ${tile[1] * 32}px`;
    };
    const place = () => {
      x = Math.min(Math.max(16, x), innerWidth - 16);
      y = Math.min(Math.max(16, y), innerHeight - 16);
      element.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
    };
    const fallAsleep = () => {
      state = 'sleeping';
      phase = 0;
      tick = 0;
      element.dataset.catState = 'sleeping';
      paint('tired');
    };
    const step = () => {
      tick += 1;
      if (state === 'sleeping') {
        // Tired first, then the slow sleeping loop: two frames, four ticks each.
        if (tick < 8) paint('tired');
        else paint('sleeping', Math.floor(tick / 4) % 2);
        return;
      }
      if (state === 'poked') {
        paint('scratchSelf', phase);
        phase += 1;
        if (phase > 9) {
          phase = 0;
          state = 'chasing';
          awakeUntil = Date.now() + POKE_WINDOW_MS;
          element.dataset.catState = 'running';
        }
        return;
      }
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      if (distance < 48) {
        paint('alert');
        if (Date.now() > awakeUntil) fallAsleep();
        return;
      }
      if (Date.now() > awakeUntil + POKE_GRACE_MS) {
        fallAsleep();
        return;
      }
      const direction =
        (dy / distance < -0.5 ? 'N' : dy / distance > 0.5 ? 'S' : '') +
        (dx / distance < -0.5 ? 'W' : dx / distance > 0.5 ? 'E' : '');
      const tile = spriteSets[direction]?.[tick % 2];
      if (tile) paint(direction, tick);
      // Whole 10px hops per tick keep the retro, slightly jittery gait.
      x += (dx / distance) * STEP_PX;
      y += (dy / distance) * STEP_PX;
      place();
    };
    const frame = (timestamp: number) => {
      raf = requestAnimationFrame(frame);
      if (!lastTs) lastTs = timestamp;
      if (timestamp - lastTs < STEP_MS) return;
      lastTs = timestamp;
      if (!document.hidden) step();
    };
    const poke = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      if (state === 'sleeping') {
        state = 'poked';
        phase = 0;
      } else if (state === 'chasing') {
        awakeUntil = Date.now() + POKE_WINDOW_MS;
      }
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || state !== 'chasing') return;
      targetX = Math.min(Math.max(16, event.clientX), innerWidth - 16);
      targetY = Math.min(Math.max(16, event.clientY), innerHeight - 16);
    };
    const resize = () => {
      place();
    };
    place();
    fallAsleep();
    element.addEventListener('pointerdown', poke);
    window.addEventListener('pointermove', track, { passive: true });
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      element.removeEventListener('pointerdown', poke);
      window.removeEventListener('pointermove', track);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);
  if (!finePointer) return null;
  return (
    <>
      {visible && (
        <span
          ref={sprite}
          className="cat-sprite"
          data-cat-state="sleeping"
          role="presentation"
          title="Poke the cat"
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
