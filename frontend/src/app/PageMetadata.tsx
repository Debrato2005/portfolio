import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  projects,
  articles,
  photoCollections,
} from '../features/portfolio/content';
export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [section, slug] = pathname.split('/').filter(Boolean);
    const title =
      section === 'projects'
        ? slug
          ? (projects.find((item) => item.slug === slug)?.name ??
            'Project not found')
          : 'Projects'
        : section === 'thoughts'
          ? slug
            ? (articles.find((item) => item.slug === slug)?.title ??
              'Post not found')
            : 'Train of Thought'
          : section === 'photography'
            ? slug
              ? (photoCollections.find((item) => item.slug === slug)?.title ??
                'Collection not found')
              : 'Photography'
            : section === 'hackathons'
              ? 'Hackathons'
              : pathname === '/'
                ? 'Software, research & curiosity'
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
