import { getJson } from './client.ts';

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}
export interface Contributions {
  login: 'Debrato2005';
  year: number;
  total: number;
  days: ContributionDay[];
  fetchedAt: string;
  source: 'public-calendar' | 'github-graphql';
}
function invalid(): never {
  throw new Error('Contribution data is unavailable.');
}
function datesForYear(year: number, includeFuture = false) {
  const now = new Date();
  if (!Number.isInteger(year) || year < 2008 || year > now.getUTCFullYear())
    return invalid();
  const start = Date.UTC(year, 0, 1);
  const end =
    !includeFuture && year === now.getUTCFullYear()
      ? Date.UTC(year, now.getUTCMonth(), now.getUTCDate())
      : Date.UTC(year, 11, 31);
  return Array.from(
    { length: Math.floor((end - start) / 86400000) + 1 },
    (_, index) => new Date(start + index * 86400000).toISOString().slice(0, 10),
  );
}
export function contributionDates(year: number) {
  return datesForYear(year);
}
function parseDays(value: unknown, expected: string[]): ContributionDay[] {
  if (!Array.isArray(value) || value.length !== expected.length)
    return invalid();
  return value.map((entry: unknown, index) => {
    if (!entry || typeof entry !== 'object') return invalid();
    const day = entry as Record<string, unknown>;
    if (
      day.date !== expected[index] ||
      !Number.isSafeInteger(day.count) ||
      (day.count as number) < 0 ||
      !Number.isInteger(day.level) ||
      (day.level as number) < 0 ||
      (day.level as number) > 4 ||
      (day.count === 0) !== (day.level === 0)
    )
      return invalid();
    return {
      date: day.date as string,
      count: day.count as number,
      level: day.level as number,
    };
  });
}
export function parseContributions(
  value: unknown,
  year: number,
): Contributions {
  if (!value || typeof value !== 'object') return invalid();
  const data = value as Record<string, unknown>;
  const expected = contributionDates(year);
  if (
    data.login !== 'Debrato2005' ||
    data.year !== year ||
    !Number.isSafeInteger(data.total) ||
    (data.total as number) < 0 ||
    typeof data.fetchedAt !== 'string' ||
    !Number.isFinite(Date.parse(data.fetchedAt))
  )
    return invalid();
  const days = parseDays(data.days, expected);
  const sum = days.reduce((total, day) => total + day.count, 0);
  if (sum !== data.total) return invalid();
  return {
    login: 'Debrato2005',
    year,
    total: data.total as number,
    fetchedAt: data.fetchedAt,
    days,
    source: 'github-graphql',
  };
}
function parsePublicContributions(value: unknown, year: number): Contributions {
  if (!value || typeof value !== 'object') return invalid();
  const data = value as Record<string, unknown>;
  if (!data.total || typeof data.total !== 'object') return invalid();
  const expected = contributionDates(year);
  const fullYear = datesForYear(year, true);
  const days = parseDays(
    data.contributions,
    Array.isArray(data.contributions) &&
      data.contributions.length === fullYear.length
      ? fullYear
      : expected,
  );
  if (days.slice(expected.length).some((day) => day.count !== 0))
    return invalid();
  return {
    ...parseContributions(
      {
        login: 'Debrato2005',
        year,
        total: (data.total as Record<string, unknown>)[String(year)],
        days: days.slice(0, expected.length),
        fetchedAt: new Date().toISOString(),
      },
      year,
    ),
    source: 'public-calendar',
  };
}
export async function getContributions(year: number, signal: AbortSignal) {
  contributionDates(year);
  const source =
    import.meta.env.VITE_GITHUB_CONTRIBUTIONS_SOURCE ?? 'public-calendar';
  if (source === 'public-calendar')
    return getJson(
      `https://github-contributions-api.jogruber.de/v4/Debrato2005?y=${year}`,
      (value) => parsePublicContributions(value, year),
      signal,
    );
  if (source !== 'github-graphql') return invalid();
  return getJson(
    `/api/github-contributions?year=${year}`,
    (value) => parseContributions(value, year),
    signal,
  );
}
