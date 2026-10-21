import { useEffect } from 'react';
import { useLocation } from 'react-router';
export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title =
      pathname === '/'
        ? 'Software, research & curiosity'
        : pathname === '/blogs'
          ? 'Writing archive'
          : pathname === '/photography'
            ? 'Photography'
            : 'Page not found';
    document.title = `${title} — Debrato Ghosh`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      'content',
      pathname === '/'
        ? 'Debrato Ghosh — software engineer, researcher and builder. Projects, writing, photography and astronomy.'
        : `${title}. Explore Debrato Ghosh’s projects, research and creative work.`,
    );
  }, [pathname]);
  return null;
}
