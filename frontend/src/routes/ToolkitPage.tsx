import { Toolkit } from '../features/toolkit/Toolkit';
export default function ToolkitPage() {
  return (
    <main id="main" className="page">
      <h1 tabIndex={-1}>Development toolkit</h1>
      <p>
        Local examples for the frontend setup. This page is excluded from
        production.
      </p>
      <Toolkit />
    </main>
  );
}
