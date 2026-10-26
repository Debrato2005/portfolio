import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
const words = ['Debrato', 'Ghosh'];
/**
 * Variable-font name: letters arrive in a width/weight wave, then swell toward
 * a fine pointer. Reduced motion renders the settled name with no listeners.
 */
export function Name() {
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = element.current;
    if (!host) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const letters = [...host.querySelectorAll<HTMLElement>('[data-letter]')];
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      for (const letter of letters) {
        let pull = 0;
        if (pointer) {
          const bounds = letter.getBoundingClientRect();
          const distance = Math.hypot(
            pointer.x - (bounds.left + bounds.width / 2),
            pointer.y - (bounds.top + bounds.height / 2),
          );
          pull = Math.max(0, 1 - distance / 220);
        }
        letter.style.setProperty('--pull', pull.toFixed(3));
      }
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || !fine.matches || event.pointerType !== 'mouse')
        return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const leave = () => {
      pointer = null;
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  let index = 0;
  return (
    <h1 className="hero-name" tabIndex={-1}>
      <span className="sr-only">Debrato Ghosh</span>
      <span aria-hidden="true" className="name-letters" ref={element}>
        {words.map((word) => (
          <span className="name-word" key={word}>
            {Array.from(word, (letter) => (
              <span
                data-letter
                key={index}
                style={{ '--i': index++ } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
