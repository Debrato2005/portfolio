import { Component } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../components/ui/Button';
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
          <h1>Page unavailable</h1>
          <p>Reload the page to try again.</p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </main>
      );
    return this.props.children;
  }
}
