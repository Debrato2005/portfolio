import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
type Theme = 'system' | 'light' | 'dark';
function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function readPreference(): Theme {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* Keep theme controls usable without storage. */
  }
  return 'system';
}
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readPreference);
  const transition = useRef<ViewTransition | null>(null);
  const systemDark = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.theme =
      theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
  }, [theme, systemDark]);
  function chooseTheme(value: Theme, origin?: { x: number; y: number }) {
    try {
      localStorage.setItem('portfolio-theme', value);
    } catch {
      /* Retain the session choice. */
    }
    const apply = () => setTheme(value);
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      apply();
      return;
    }
    transition.current?.skipTransition();
    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    try {
      const current = document.startViewTransition(() => flushSync(apply));
      transition.current = current;
      void current.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 480,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        })
        .catch(() => {
          /* A newer theme choice can replace the transition. */
        });
    } catch {
      apply();
    }
  }
  return { theme, chooseTheme };
}
