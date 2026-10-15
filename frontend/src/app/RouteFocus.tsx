import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
export function RouteFocus() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const focusHeading = () => {
      const heading = document.querySelector<HTMLElement>(
        'main:not([aria-busy="true"]) h1',
      );
      heading?.focus({ preventScroll: true });
      return Boolean(heading);
    };
    if (focusHeading()) return;
    const observer = new MutationObserver(() => {
      if (focusHeading()) observer.disconnect();
    });
    observer.observe(document.getElementById('root') ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
