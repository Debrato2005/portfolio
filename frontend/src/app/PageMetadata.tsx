import { useEffect } from 'react';
import { useLocation } from 'react-router';
export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title =
      pathname === '/'
        ? 'Debrato Ghosh — Portfolio'
        : 'Page not found — Debrato Ghosh';
  }, [pathname]);
  return null;
}
