import { useEffect, useState } from 'react';
import { loadPageViews } from '../../lib/api/pageViews';

type Result = { attempt: number } & (
  { status: 'ready'; count: number } | { status: 'unavailable'; count: null }
);

export function usePageViews() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    let active = true;
    loadPageViews()
      .then((count) => {
        if (active) setResult({ attempt, status: 'ready', count });
      })
      .catch(() => {
        if (active) setResult({ attempt, status: 'unavailable', count: null });
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const current = result?.attempt === attempt ? result : null;
  return {
    status: current?.status ?? 'loading',
    count: current?.count ?? null,
    retry: () => setAttempt((value) => value + 1),
  };
}
