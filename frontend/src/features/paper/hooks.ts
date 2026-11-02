import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

/** Adds `is-in` to every `[data-reveal]` element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

/** The id of the section crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    nodes.forEach((node) => observer.observe(node));
    const top = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener('scroll', top, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', top);
    };
  }, [ids]);
  return active;
}

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
});
function subscribeClock(callback: () => void) {
  const timer = window.setInterval(callback, 10000);
  return () => window.clearInterval(timer);
}
/** Local time in Manipal, refreshed every ten seconds. */
export function useManipalTime() {
  return useSyncExternalStore(subscribeClock, () =>
    clockFormat.format(new Date()),
  );
}

export type Theme = 'day' | 'night';
const themeKey = 'portfolio-theme';
function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'night' : 'day';
}
/**
 * Day (light desk) or night (dark desk). The stored values stay `light`/`dark`
 * so the pre-render script in index.html can read them.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readTheme() === 'day' ? 'night' : 'day';
    const apply = () => {
      document.documentElement.dataset.theme =
        next === 'night' ? 'dark' : 'light';
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next === 'night' ? '#1b1915' : '#e6e0d3');
      setTheme(next);
      try {
        localStorage.setItem(themeKey, next === 'night' ? 'dark' : 'light');
      } catch {
        // Storage can be blocked; the choice still applies to this page.
      }
    };
    const root = document.documentElement;
    if (origin) {
      root.style.setProperty('--wipe-x', `${origin.x}px`);
      root.style.setProperty('--wipe-y', `${origin.y}px`);
    }
    if (
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      document.startViewTransition(apply);
    else apply();
  }, []);
  return { theme, toggle };
}
