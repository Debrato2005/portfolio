import { links } from '../lib/links';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router';
import { HomePage } from '../routes/HomePage';
import { NotFoundPage } from '../routes/NotFoundPage';
import { ErrorBoundary } from './ErrorBoundary';
import { RouteFocus } from './RouteFocus';
import { PageMetadata } from './PageMetadata';
import { PhotographyPage } from '../routes/PhotographyPage';
import { BlogsPage } from '../routes/BlogsPage';
import { CommandPalette } from '../features/portfolio/CommandPalette';
import { usePageViews } from '../features/portfolio/usePageViews';
import { useTheme } from '../features/portfolio/Theme';
import { CatCompanion } from '../features/portfolio/CatCompanion';
import { ScrollProgress, SkyMenu } from '../features/portfolio/Expressive';
import { shape } from '../features/portfolio/shapes';
import { Icon } from '../components/ui/Icon';
import { useRipple } from '../components/ui/useRipple';
import type { CSSProperties } from 'react';
export function App() {
  usePageViews();
  useRipple();
  const { theme, chooseTheme, sky, chooseSky } = useTheme();
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
            <span
              className="wordmark-shape"
              aria-hidden="true"
              style={
                {
                  '--shape-rest': shape('cookie9'),
                  '--shape-active': shape('clover4'),
                } as CSSProperties
              }
            />
            Debrato
          </Link>
          <nav className="app-nav" aria-label="Main">
            <NavLink to="/" end onClick={resetHome}>
              Home
            </NavLink>
            <Link to="/#projects">Projects</Link>
            <Link to="/#experience">Experience</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="header-controls">
            <CommandPalette chooseTheme={chooseTheme} chooseSky={chooseSky} />
            <SkyMenu sky={sky} chooseSky={chooseSky} />
            <button
              className="icon-button ripple theme-control"
              data-mode={theme}
              aria-label={`Theme: ${theme[0]?.toUpperCase()}${theme.slice(1)}`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                chooseTheme(theme === 'dark' ? 'light' : 'dark', {
                  x: bounds.left + bounds.width / 2,
                  y: bounds.top + bounds.height / 2,
                });
              }}
            >
              <Icon name={theme === 'light' ? 'sun' : 'moon'} />
            </button>
          </div>
          <ScrollProgress />
        </header>
        <RouteFocus />
        <PageMetadata />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer className="site-footer">
          <span>Debrato Ghosh · Built with curiosity under many skies.</span>
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
