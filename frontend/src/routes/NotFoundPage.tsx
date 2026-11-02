import { Link } from 'react-router';
export function NotFoundPage() {
  return (
    <main id="main" className="page">
      <p className="kicker">404 · Misprint</p>
      <h1 tabIndex={-1}>This page was never printed.</h1>
      <p className="prose">
        The address doesn’t match anything in these notes.
      </p>
      <Link className="tape-button" to="/">
        Back to the first page
      </Link>
    </main>
  );
}
