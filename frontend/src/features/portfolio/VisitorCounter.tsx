import { usePageViews } from './usePageViews';

export function VisitorCounter() {
  const { count, status, retry } = usePageViews();
  return (
    <div
      className="view-counter"
      data-provider={status === 'ready' ? 'connected' : status}
      role="group"
      aria-label="Page views"
    >
      <span>Page views</span>
      <strong aria-live="polite">
        {count !== null
          ? count.toLocaleString()
          : status === 'loading'
            ? 'Loading…'
            : 'Unavailable'}
      </strong>
      {status === 'unavailable' && (
        <button className="text-link" type="button" onClick={retry}>
          Retry page views
        </button>
      )}
      <small>Page loads, including repeat visits</small>
    </div>
  );
}
