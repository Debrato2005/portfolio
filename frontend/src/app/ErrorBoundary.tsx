import { Component } from 'react';
import type { ReactNode } from 'react';
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="page">
          <p className="kicker">Misprint</p>
          <h1>Page unavailable</h1>
          <p>Reload the page to try again.</p>
          <button
            type="button"
            className="tape-button"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      );
    return this.props.children;
  }
}
