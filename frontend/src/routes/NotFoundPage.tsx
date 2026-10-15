import { Link } from 'react-router';
export function NotFoundPage() {
  return (
    <main id="main" className="page">
      <p className="eyebrow">404</p>
      <h1 tabIndex={-1}>Page not found</h1>
      <p>This address does not match a portfolio page.</p>
      <Link className="button" to="/">
        Return home
      </Link>
    </main>
  );
}
