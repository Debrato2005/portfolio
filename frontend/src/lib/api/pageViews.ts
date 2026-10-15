import { getJson } from './client';

const key = 'debrato2005-portfolio-page-views';
const origin = 'https://countapi.mileshilliard.com/api/v1';

export function parsePageViews(value: unknown): number {
  if (!value || typeof value !== 'object') throw new Error('Invalid count');
  const data = value as Record<string, unknown>;
  const count =
    typeof data.value === 'string' && /^(0|[1-9]\d*)$/.test(data.value)
      ? Number(data.value)
      : data.value;
  if (
    data.key !== key ||
    typeof count !== 'number' ||
    !Number.isSafeInteger(count) ||
    count < 0
  )
    throw new Error('Invalid count');
  return count;
}

let attempted = false;
let pending: Promise<number> | null = null;

export function loadPageViews(): Promise<number> {
  if (pending) return pending;
  const action = attempted ? 'get' : 'hit';
  attempted = true;
  // Keep the document's request alive across StrictMode cleanup and route remounts.
  // A failed increment can still reach the provider. Later attempts only read.
  pending = getJson(
    `${origin}/${action}/${key}`,
    parsePageViews,
    AbortSignal.timeout(10000),
  ).catch((error: unknown) => {
    pending = null;
    throw error;
  });
  return pending;
}
