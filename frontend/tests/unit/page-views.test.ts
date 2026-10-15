import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const key = 'debrato2005-portfolio-page-views';
beforeEach(() => vi.resetModules());
afterEach(() => vi.unstubAllGlobals());

it('shares one increment across simultaneous consumers and later remounts', async () => {
  let finish!: (value: Response) => void;
  const fetcher = vi.fn<typeof fetch>(
    () =>
      new Promise<Response>((resolve) => {
        finish = resolve;
      }),
  );
  vi.stubGlobal('fetch', fetcher);
  const { loadPageViews } = await import('../../src/lib/api/pageViews');
  const first = loadPageViews();
  const second = loadPageViews();
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(fetcher.mock.calls[0]?.[0]).toBe(
    `https://countapi.mileshilliard.com/api/v1/hit/${key}`,
  );
  finish(Response.json({ key, value: 1234 }));
  expect(await first).toBe(1234);
  expect(await second).toBe(1234);
  expect(await loadPageViews()).toBe(1234);
  expect(fetcher).toHaveBeenCalledTimes(1);
});

it('reads after an uncertain increment failure and never repeats the mutation', async () => {
  const fetcher = vi
    .fn()
    .mockRejectedValueOnce(new TypeError('network error'))
    .mockResolvedValueOnce(Response.json({ key, value: 8 }));
  vi.stubGlobal('fetch', fetcher);
  const { loadPageViews } = await import('../../src/lib/api/pageViews');
  await expect(loadPageViews()).rejects.toThrow();
  expect(await loadPageViews()).toBe(8);
  expect(fetcher.mock.calls.map(([url]) => url)).toEqual([
    `https://countapi.mileshilliard.com/api/v1/hit/${key}`,
    `https://countapi.mileshilliard.com/api/v1/get/${key}`,
  ]);
});

it('accepts zero and canonical integer strings while rejecting invalid provider totals', async () => {
  const { parsePageViews } = await import('../../src/lib/api/pageViews');
  expect(parsePageViews({ key, value: 0 })).toBe(0);
  expect(parsePageViews({ key, value: '1234' })).toBe(1234);
  for (const value of [
    -1,
    1.5,
    null,
    true,
    '1e3',
    '',
    '01',
    'NaN',
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    expect(() => parsePageViews({ key, value })).toThrow();
  }
  expect(() => parsePageViews({ key: 'someone-else', value: 23 })).toThrow();
  expect(() => parsePageViews({ error: 'unavailable' })).toThrow();
});
