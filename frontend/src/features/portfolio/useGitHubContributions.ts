import { useEffect, useState } from 'react';
import { getContributions } from '../../lib/api/contributions';
import type { Contributions } from '../../lib/api/contributions';

type Result = { year: number; attempt: number } & (
  | { status: 'ready'; data: Contributions }
  | { status: 'unavailable'; data: null }
);
export function useGitHubContributions(year: number) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      controller.abort();
      setResult({ year, attempt, status: 'unavailable', data: null });
    }, 10000);
    getContributions(year, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted)
          setResult({ year, attempt, status: 'ready', data });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setResult({ year, attempt, status: 'unavailable', data: null });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [year, attempt]);
  const current =
    result?.year === year && result.attempt === attempt ? result : null;
  return {
    status: current?.status ?? 'loading',
    data: current?.data ?? null,
    retry: () => setAttempt((value) => value + 1),
  };
}
