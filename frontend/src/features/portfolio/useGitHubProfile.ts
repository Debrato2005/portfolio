import { useCallback, useEffect, useState } from 'react';
import { getGitHubProfile } from '../../lib/api/github';
import type { GitHubProfile } from '../../lib/api/github';
type ProfileState =
  | { status: 'loading' | 'unavailable'; data: null }
  | { status: 'ready'; data: GitHubProfile };
export function useGitHubProfile() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ProfileState>({
    status: 'loading',
    data: null,
  });
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setState({ status: 'unavailable', data: null });
      controller.abort();
    }, 10000);
    getGitHubProfile(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'ready', data });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setState({ status: 'unavailable', data: null });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [attempt]);
  const retry = useCallback(() => {
    setState({ status: 'loading', data: null });
    setAttempt((value) => value + 1);
  }, []);
  return { ...state, retry };
}
