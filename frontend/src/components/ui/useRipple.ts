import { useEffect } from 'react';
/**
 * One delegated listener draws the Material press ripple for every `.ripple`
 * control. The state layer stays in CSS, so reduced motion keeps press feedback.
 */
export function useRipple() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const press = (event: PointerEvent) => {
      if (motion.matches || event.button !== 0) return;
      const host =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('.ripple')
          : null;
      if (!host || host.matches(':disabled, [aria-disabled="true"]')) return;
      const bounds = host.getBoundingClientRect();
      const size = Math.hypot(bounds.width, bounds.height) * 2;
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${event.clientX - bounds.left - size / 2}px`;
      wave.style.top = `${event.clientY - bounds.top - size / 2}px`;
      host.append(wave);
      const grow = wave.animate(
        { transform: ['scale(0)', 'scale(1)'], opacity: [0.18, 0.12] },
        {
          duration: 420,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
          fill: 'forwards',
        },
      );
      const release = () => {
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
        void grow.finished
          .then(
            () =>
              wave.animate(
                { opacity: [0.12, 0] },
                { duration: 260, fill: 'forwards' },
              ).finished,
          )
          .catch(() => undefined)
          .finally(() => wave.remove());
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    };
    document.addEventListener('pointerdown', press, { passive: true });
    return () => document.removeEventListener('pointerdown', press);
  }, []);
}
