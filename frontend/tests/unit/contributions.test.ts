import type { IncomingMessage, ServerResponse } from 'node:http';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getContributions,
  parseContributions,
} from '../../src/lib/api/contributions';

let handler: typeof import('../../api/github-contributions').default;

function days(year: number, fullYear = false) {
  const now = new Date();
  const end =
    !fullYear && year === now.getUTCFullYear()
      ? Date.UTC(year, now.getUTCMonth(), now.getUTCDate())
      : Date.UTC(year, 11, 31);
  return Array.from(
    { length: (end - Date.UTC(year, 0, 1)) / 86400000 + 1 },
    (_, i) => ({
      date: new Date(Date.UTC(year, 0, 1) + i * 86400000)
        .toISOString()
        .slice(0, 10),
      count: i === 0 ? 3 : 0,
      level: i === 0 ? 2 : 0,
    }),
  );
}
function payload(year: number) {
  return {
    login: 'Debrato2005',
    year,
    total: 3,
    days: days(year),
    fetchedAt: '2026-10-15T00:00:00.000Z',
  };
}
function publicPayload(year: number, fullYear = false) {
  return { total: { [year]: 3 }, contributions: days(year, fullYear) };
}
function provider(year: number) {
  return {
    data: {
      user: {
        login: 'Debrato2005',
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 3,
            weeks: Array.from(
              { length: Math.ceil(days(year).length / 7) },
              (_, index) => ({
                contributionDays: days(year)
                  .slice(index * 7, index * 7 + 7)
                  .map((day) => ({
                    date: day.date,
                    contributionCount: day.count,
                    contributionLevel: day.level ? 'SECOND_QUARTILE' : 'NONE',
                  })),
              }),
            ),
          },
        },
      },
    },
  };
}
async function request(
  url = '/api/github-contributions?year=2024',
  method = 'GET',
) {
  let body = '';
  const headers: Record<string, string> = {};
  const response = {
    statusCode: 200,
    setHeader: (key: string, value: string) => {
      headers[key] = value;
    },
    end: (value: string) => {
      body = value;
    },
  };
  await handler(
    { url, method } as IncomingMessage,
    response as unknown as ServerResponse,
  );
  return {
    status: response.statusCode,
    body: JSON.parse(body) as unknown,
    headers,
  };
}
beforeEach(async () => {
  vi.resetModules();
  handler = (await import('../../api/github-contributions')).default;
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-15T00:00:00Z'));
  vi.stubEnv('GITHUB_TOKEN', 'unit-test-token');
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe('contribution transport boundaries', () => {
  it('loads validated public daily counts without a token or a server function', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    const fetcher = vi.fn(async () => Response.json(publicPayload(2024)));
    vi.stubGlobal('fetch', fetcher);
    const signal = new AbortController().signal;
    await expect(getContributions(2024, signal)).resolves.toMatchObject({
      login: 'Debrato2005',
      year: 2024,
      total: 3,
      source: 'public-calendar',
      days: expect.arrayContaining([
        { date: '2024-02-29', count: 0, level: 0 },
      ]),
    });
    expect(fetcher).toHaveBeenCalledWith(
      'https://github-contributions-api.jogruber.de/v4/Debrato2005?y=2024',
      expect.objectContaining({ signal, credentials: 'omit' }),
    );
  });
  it('validates the complete relay year, then trims zero future days at the UTC date', async () => {
    vi.setSystemTime(new Date('2026-10-15T00:30:00+05:30'));
    const body = publicPayload(2026, true);
    const fetcher = vi.fn(async () => Response.json(body));
    vi.stubGlobal('fetch', fetcher);
    const result = await getContributions(2026, new AbortController().signal);
    expect(body.contributions).toHaveLength(365);
    expect(result.days.at(-1)?.date).toBe('2026-10-14');
    expect(result.total).toBe(3);
    expect(result.source).toBe('public-calendar');
    expect(result.fetchedAt).toBe('2026-10-14T19:00:00.000Z');
    const future = body.contributions.find((day) => day.date === '2026-10-15')!;
    future.count = 1;
    future.level = 1;
    body.total[2026] = 4;
    await expect(
      getContributions(2026, new AbortController().signal),
    ).rejects.toThrow();
  });
  it('rejects missing, unordered, invalid or inconsistent relay days without fallback', async () => {
    const valid = publicPayload(2024);
    for (const body of [
      { ...valid, total: { '2024': 4 } },
      { ...valid, total: { '2023': 3 } },
      { ...valid, contributions: valid.contributions.slice(1) },
      { ...valid, contributions: [...valid.contributions].reverse() },
      {
        ...valid,
        contributions: [
          valid.contributions[0],
          ...valid.contributions.slice(0, -1),
        ],
      },
      ...[
        { date: '2024-02-30' },
        { count: -1 },
        { count: 1.5 },
        { count: Number.MAX_SAFE_INTEGER + 1 },
        { level: 5 },
        { level: 0 },
      ].map((change) => ({
        ...valid,
        contributions: valid.contributions.map((day, i) =>
          i === 0 ? { ...day, ...change } : day,
        ),
      })),
    ]) {
      const fetcher = vi.fn(async () => Response.json(body));
      vi.stubGlobal('fetch', fetcher);
      await expect(
        getContributions(2024, new AbortController().signal),
      ).rejects.toThrow();
      expect(fetcher).toHaveBeenCalledTimes(1);
    }
  });
  it('uses the official gateway only when explicitly selected and rejects invalid configuration before transport', async () => {
    const fetcher = vi.fn(async () => Response.json(payload(2024)));
    vi.stubGlobal('fetch', fetcher);
    vi.stubEnv('VITE_GITHUB_CONTRIBUTIONS_SOURCE', 'github-graphql');
    await expect(
      getContributions(2024, new AbortController().signal),
    ).resolves.toMatchObject({ total: 3, source: 'github-graphql' });
    expect(fetcher).toHaveBeenCalledWith(
      '/api/github-contributions?year=2024',
      expect.objectContaining({ credentials: 'omit' }),
    );
    fetcher.mockClear();
    vi.stubEnv('VITE_GITHUB_CONTRIBUTIONS_SOURCE', 'untrusted-provider');
    await expect(
      getContributions(2024, new AbortController().signal),
    ).rejects.toThrow();
    vi.stubEnv('VITE_GITHUB_CONTRIBUTIONS_SOURCE', 'public-calendar');
    for (const year of [2007, 2027, 2024.5, NaN])
      await expect(
        getContributions(year, new AbortController().signal),
      ).rejects.toThrow();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('preserves canceled requests and does not replace provider errors with empty data', async () => {
    const controller = new AbortController();
    const aborted = new DOMException('Aborted', 'AbortError');
    const fetcher = vi.fn(async () => {
      controller.abort();
      throw aborted;
    });
    vi.stubGlobal('fetch', fetcher);
    await expect(getContributions(2024, controller.signal)).rejects.toBe(
      aborted,
    );
    fetcher.mockImplementation(async () => {
      throw new Error('Provider failed');
    });
    await expect(
      getContributions(2024, new AbortController().signal),
    ).rejects.toThrow('The request failed. Try again.');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it('rejects unsupported methods, malformed years and username parameters before GitHub', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    expect((await request(undefined, 'POST')).status).toBe(405);
    for (const query of [
      'year=2027',
      'year=2007',
      'year=2024&year=2023',
      'year=2024&login=other',
      'year=nope',
    ]) {
      expect((await request(`/?${query}`)).status).toBe(400);
    }
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('returns safe unavailable data without a server token', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    vi.stubGlobal('fetch', vi.fn());
    const response = await request();
    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      error: 'Contribution data is unavailable.',
    });
  });
  it('queries the fixed official account, caches briefly, then refreshes', async () => {
    const fetcher = vi.fn(async () => Response.json(provider(2024)));
    vi.stubGlobal('fetch', fetcher);
    const first = await request();
    expect(first.status).toBe(200);
    expect(parseContributions(first.body, 2024)).toMatchObject({
      total: 3,
      year: 2024,
    });
    await request();
    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, options] = fetcher.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://api.github.com/graphql');
    expect(JSON.parse(options.body as string)).toMatchObject({
      variables: {
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T23:59:59.999Z',
      },
    });
    expect(JSON.parse(options.body as string).query).toContain(
      'user(login: "Debrato2005")',
    );
    vi.advanceTimersByTime(300001);
    await request();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it('shares a pending year across concurrent callers', async () => {
    let release!: (response: Response) => void;
    const fetcher = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          release = resolve;
        }),
    );
    vi.stubGlobal('fetch', fetcher);
    const requests = Array.from({ length: 12 }, () => request());
    expect(fetcher).toHaveBeenCalledTimes(1);
    release(Response.json(provider(2024)));
    const responses = await Promise.all(requests);
    expect(responses.every((response) => response.status === 200)).toBe(true);
    expect(
      responses.every(
        (response) =>
          JSON.stringify(response.body) === JSON.stringify(responses[0]?.body),
      ),
    ).toBe(true);
  });
  it('limits upstream attempts across years and failures, then permits recovery', async () => {
    const fetcher = vi.fn(async () => Response.json(provider(2025)));
    vi.stubGlobal('fetch', fetcher);
    expect((await request('/?year=2025')).status).toBe(200);
    fetcher.mockImplementation(async () => Response.json({}, { status: 500 }));
    for (let i = 0; i < 11; i++)
      expect((await request(`/?year=${2008 + i}`)).status).toBe(502);
    const blocked = await request('/?year=2024');
    expect(blocked.status).toBe(429);
    expect(blocked.headers['Retry-After']).toBe('60');
    expect((await request('/?year=2025')).status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(12);
    vi.advanceTimersByTime(60000);
    fetcher.mockImplementation(async () => Response.json(provider(2024)));
    expect((await request()).status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(13);
  });
  it('clears a failed shared request so the next caller can retry', async () => {
    const fetcher = vi.fn(async (): Promise<Response> => {
      throw new Error('private provider details');
    });
    vi.stubGlobal('fetch', fetcher);
    const responses = await Promise.all(
      Array.from({ length: 12 }, () => request()),
    );
    expect(responses.every((response) => response.status === 502)).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
    fetcher.mockImplementation(async () => Response.json(provider(2024)));
    expect((await request()).status).toBe(200);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it('does not expose provider errors or turn failed responses into zero counts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({
          errors: [{ message: 'private provider details unit-test-token' }],
        }),
      ),
    );
    const response = await request('/?year=2023');
    expect(response.status).toBe(502);
    expect(response.body).toEqual({
      error: 'Contribution data is unavailable.',
    });
  });
  it('times out a stalled provider request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, options: RequestInit) =>
          new Promise((_resolve, reject) => {
            options.signal?.addEventListener('abort', () =>
              reject(new Error('aborted')),
            );
          }),
      ),
    );
    const pending = request('/?year=2022');
    await vi.advanceTimersByTimeAsync(8001);
    expect((await pending).status).toBe(504);
  });
  it('retains all supported years and validates the current year only through today', async () => {
    const fetcher = vi.fn(async (_url: string, options: RequestInit) => {
      const year = Number(
        JSON.parse(options.body as string).variables.from.slice(0, 4),
      );
      return Response.json(provider(year));
    });
    vi.stubGlobal('fetch', fetcher);
    for (const year of [2010, 2011, 2012, 2013, 2014, 2015])
      expect((await request(`/?year=${year}`)).status).toBe(200);
    await request('/?year=2010');
    expect(fetcher).toHaveBeenCalledTimes(6);
    const current = await request('/?year=2026');
    expect(parseContributions(current.body, 2026).days.at(-1)?.date).toBe(
      '2026-10-15',
    );
    expect(
      parseContributions(current.body, 2026).days.some(
        (day) => day.date === '2026-10-16',
      ),
    ).toBe(false);
  });
  it('accepts a leap year and rejects missing, duplicate, wrong-account or inconsistent daily counts', () => {
    expect(parseContributions(payload(2024), 2024)).toMatchObject({
      days: expect.arrayContaining([
        { date: '2024-02-29', count: 0, level: 0 },
      ]),
    });
    const valid = payload(2024);
    for (const invalid of [
      { ...valid, login: 'another' },
      { ...valid, total: 9 },
      { ...valid, days: valid.days.slice(1) },
      { ...valid, days: [valid.days[0], ...valid.days.slice(0, -1)] },
      {
        ...valid,
        days: valid.days.map((day, i) =>
          i === 0 ? { ...day, count: -1 } : day,
        ),
      },
    ])
      expect(() => parseContributions(invalid, 2024)).toThrow();
  });
});
