import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../routes/HomePage';
import { NotFoundPage } from '../routes/NotFoundPage';
import { ErrorBoundary } from './ErrorBoundary';
import { PageMetadata } from './PageMetadata';
import { Masthead } from '../features/paper/Masthead';
import { Colophon } from '../features/paper/Colophon';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Masthead />
        <PageMetadata />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Colophon />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
