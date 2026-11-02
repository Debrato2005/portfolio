import { links } from '../../lib/links';
import { quote } from '../portfolio/content';
import { usePageViews } from '../portfolio/usePageViews';

/** The back cover of the file. */
export function Colophon() {
  const { count, status, retry } = usePageViews();
  return (
    <footer className="back-cover">
      <div className="back-cover-inner">
        <blockquote className="back-quote">
          <p>“{quote.text}”</p>
          <footer>
            <a href={quote.source}>— {quote.author}</a>
          </footer>
        </blockquote>
        <div className="back-meta">
          <p className="back-views" aria-live="polite">
            {count !== null ? (
              <>
                This file has been opened{' '}
                <strong>{count.toLocaleString()}</strong> times
              </>
            ) : status === 'loading' ? (
              'Counting…'
            ) : (
              <>
                View count unavailable.{' '}
                <button type="button" className="ink-link" onClick={retry}>
                  Retry
                </button>
              </>
            )}
            <small>Page loads, repeat visits included.</small>
          </p>
          <ul className="back-links">
            <li>
              <a href={links.github}>GitHub</a>
            </li>
            <li>
              <a href={links.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={links.x}>X</a>
            </li>
            <li>
              <a href={links.email}>Email</a>
            </li>
          </ul>
        </div>
        <div className="back-foot">
          <span>© {new Date().getFullYear()} Debrato Ghosh</span>
          <span>Set in Fraunces, Instrument Sans & Space Mono</span>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              document
                .querySelector<HTMLElement>('main h1')
                ?.focus({ preventScroll: true });
            }}
          >
            Back to the cover ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
