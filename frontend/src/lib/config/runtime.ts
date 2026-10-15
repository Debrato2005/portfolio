export interface RuntimeConfig {
  mode: 'static' | 'fixture' | 'live';
  apiBaseUrl: string | null;
}
export function readConfig(
  env: Record<string, string | undefined>,
  production: boolean,
): RuntimeConfig {
  const mode = env.VITE_DATA_MODE ?? 'static';
  if (mode !== 'static' && mode !== 'fixture' && mode !== 'live')
    throw new Error('Choose static, fixture, or live data.');
  if (mode === 'fixture' && production)
    throw new Error('Production cannot use fixtures.');
  if (mode !== 'live') return { mode, apiBaseUrl: null };
  let url: URL;
  try {
    url = new URL(env.VITE_API_BASE_URL ?? '');
  } catch {
    throw new Error('Live mode requires an HTTP API URL.');
  }
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      'Use an HTTP API URL without credentials, query, or fragment.',
    );
  return { mode, apiBaseUrl: url.href.replace(/\/$/, '') };
}
