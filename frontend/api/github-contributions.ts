import type { IncomingMessage, ServerResponse } from 'node:http';
import { parseContributions } from '../src/lib/api/contributions.ts';
import type { Contributions } from '../src/lib/api/contributions.ts';

const cache = new Map<number, { expires: number; data: Contributions }>();
const query = `query Calendar($from: DateTime!, $to: DateTime!) {
  user(login: "Debrato2005") {
    login
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;
const levels = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
];
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Invalid data');
  return value as Record<string, unknown>;
}
function normalize(value: unknown, year: number) {
  const body = record(value);
  if (body.errors) throw new Error('Provider unavailable');
  const user = record(record(body.data).user);
  const calendar = record(
    record(user.contributionsCollection).contributionCalendar,
  );
  if (!Array.isArray(calendar.weeks) || calendar.weeks.length > 54)
    throw new Error('Invalid calendar');
  const days = calendar.weeks.flatMap((week: unknown) => {
    const entries = record(week).contributionDays;
    if (!Array.isArray(entries) || entries.length > 366)
      throw new Error('Invalid week');
    return entries.map((entry: unknown) => {
      const day = record(entry);
      return {
        date: day.date,
        count: day.contributionCount,
        level: levels.indexOf(day.contributionLevel as string),
      };
    });
  });
  return parseContributions(
    {
      login: user.login,
      year,
      total: calendar.totalContributions,
      days,
      fetchedAt: new Date().toISOString(),
    },
    year,
  );
}

export default async function githubContributions(
  request: IncomingMessage,
  response: ServerResponse,
) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  const fail = (status: number) => {
    response.statusCode = status;
    response.end(
      JSON.stringify({ error: 'Contribution data is unavailable.' }),
    );
  };
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return fail(405);
  }
  let parameters: URLSearchParams;
  try {
    parameters = new URL(request.url ?? '/', 'http://localhost').searchParams;
  } catch {
    return fail(400);
  }
  const input = parameters.get('year') ?? '';
  const year = Number(input);
  if (
    !/^\d{4}$/.test(input) ||
    year < 2008 ||
    year > new Date().getUTCFullYear() ||
    parameters.getAll('year').length !== 1 ||
    [...parameters.keys()].some((key) => key !== 'year')
  )
    return fail(400);
  const token = process.env.GITHUB_TOKEN;
  if (!token?.trim()) return fail(503);
  const cached = cache.get(year);
  if (cached && cached.expires > Date.now()) {
    response.end(JSON.stringify(cached.data));
    return;
  }
  cache.delete(year);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const now = new Date();
    const upstream = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          from: new Date(Date.UTC(year, 0, 1)).toISOString(),
          to:
            year === now.getUTCFullYear()
              ? now.toISOString()
              : new Date(Date.UTC(year + 1, 0, 1) - 1).toISOString(),
        },
      }),
    });
    if (!upstream.ok) return fail(upstream.status === 429 ? 503 : 502);
    const raw: unknown = await upstream.json();
    const data = normalize(raw, year);
    if (cache.size >= 5) cache.delete(cache.keys().next().value!);
    cache.set(year, { expires: Date.now() + 300000, data });
    response.end(JSON.stringify(data));
  } catch {
    fail(controller.signal.aborted ? 504 : 502);
  } finally {
    clearTimeout(timeout);
  }
}
