import { links } from '../lib/links';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router';
import { HomePage } from '../routes/HomePage';
import { NotFoundPage } from '../routes/NotFoundPage';
import { ErrorBoundary } from './ErrorBoundary';
import { RouteFocus } from './RouteFocus';
import { PageMetadata } from './PageMetadata';
import { PhotographyPage } from '../routes/PhotographyPage';
import {
  ProjectsPage,
  ProjectPage,
  HackathonsPage,
  ThoughtsPage,
  ThoughtPage,
} from '../routes/ContentPages';
import '../styles/content-pages.css';
import { CommandPalette } from '../features/portfolio/CommandPalette';
import { usePageViews } from '../features/portfolio/usePageViews';
import { useTheme } from '../features/portfolio/Theme';
import { CatCompanion } from '../features/portfolio/CatCompanion';
import { Icon } from '../components/ui/Icon';
const developmentRoutes = import.meta.env.DEV
  ? (() => {
      const Toolkit = lazy(() => import('../routes/ToolkitPage'));
      return (
        <Route
          path="toolkit"
          element={
            <Suspense
              fallback={
                <main className="page" aria-busy="true">
                  <h1 tabIndex={-1}>Loading controls</h1>
                </main>
              }
            >
              <Toolkit />
            </Suspense>
          }
        />
      );
    })()
  : null;
export function App() {
  usePageViews();
  const { theme, chooseTheme } = useTheme();
  const resetHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document
        .querySelector<HTMLElement>('main h1')
        ?.focus({ preventScroll: true });
    }
  };
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link
            className="wordmark"
            to="/"
            onClick={resetHome}
            aria-label="Portfolio home"
          >
            Debrato
          </Link>
          <nav aria-label="Main">
            <NavLink to="/" end onClick={resetHome}>
              Home
            </NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <Link to="/#experience">Experience</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="header-controls">
            <CommandPalette chooseTheme={chooseTheme} />
            <button
              className="theme-control"
              aria-label={`Theme: ${theme[0]?.toUpperCase()}${theme.slice(1)}`}
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                chooseTheme(
                  theme === 'system'
                    ? 'light'
                    : theme === 'light'
                      ? 'dark'
                      : 'system',
                  {
                    x: bounds.left + bounds.width / 2,
                    y: bounds.top + bounds.height / 2,
                  },
                );
              }}
            >
              <Icon
                name={
                  theme === 'light'
                    ? 'sun'
                    : theme === 'dark'
                      ? 'moon'
                      : 'desktop'
                }
              />
              <span>{theme}</span>
            </button>
          </div>
        </header>
        <RouteFocus />
        <PageMetadata />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route
            path="/photography/:collectionSlug"
            element={<PhotographyPage />}
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/hackathons/:slug" element={<HackathonsPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route path="/thoughts/:slug" element={<ThoughtPage />} />
          {developmentRoutes}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer className="site-footer">
          <span>Debrato Ghosh · Built with curiosity.</span>
          <div>
            <a href={links.github}>GitHub</a>
            <a href={links.email}>Mail</a>
            <a href="#main">Back to top</a>
            <CatCompanion />
          </div>
        </footer>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
