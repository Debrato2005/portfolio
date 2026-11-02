import { useMemo, useState } from 'react';
import type { ContributionDay } from '../../lib/api/contributions';
import { githubUsername, links } from '../../lib/links';
import { useGitHubContributions } from '../portfolio/useGitHubContributions';
import { useGitHubProfile } from '../portfolio/useGitHubProfile';

const dayFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});
const monthFormat = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  timeZone: 'UTC',
});
const CELL = 14;
const utc = (date: string) => new Date(`${date}T00:00:00Z`);

function longestStreak(days: ContributionDay[]) {
  let streak = 0;
  let longest = 0;
  for (const day of days) {
    streak = day.count > 0 ? streak + 1 : 0;
    longest = Math.max(longest, streak);
  }
  return longest;
}

/** Public GitHub activity, plotted square by square on graph paper. */
export function GraphPaper() {
  const thisYear = new Date().getUTCFullYear();
  const [year, setYear] = useState(thisYear);
  const calendar = useGitHubContributions(year);
  const profile = useGitHubProfile();
  const [focus, setFocus] = useState<ContributionDay | null>(null);
  const data = calendar.data;

  const grid = useMemo(() => {
    if (!data) return null;
    const first = utc(data.days[0]?.date ?? `${year}-01-01`).getUTCDay();
    const cells = data.days.map((day, index) => ({
      day,
      col: Math.floor((index + first) / 7),
      row: (index + first) % 7,
    }));
    const months: { label: string; col: number }[] = [];
    let last = '';
    for (const cell of cells) {
      const month = cell.day.date.slice(5, 7);
      if (month !== last && cell.row === 0) {
        months.push({
          label: monthFormat.format(utc(cell.day.date)),
          col: cell.col,
        });
        last = month;
      }
    }
    return {
      cells,
      months,
      cols: (cells.at(-1)?.col ?? 0) + 1,
      longest: longestStreak(data.days),
      active: data.days.filter((day) => day.count > 0).length,
    };
  }, [data, year]);

  const stat = (value: number | undefined) =>
    profile.status === 'ready' && value !== undefined
      ? value.toLocaleString()
      : profile.status === 'loading'
        ? '…'
        : '—';

  return (
    <div className="graph">
      <dl className="graph-stats">
        <div>
          <dt>Contributions in {year}</dt>
          <dd>
            {data
              ? data.total.toLocaleString()
              : calendar.status === 'loading'
                ? '…'
                : '—'}
          </dd>
        </div>
        <div>
          <dt>Public repositories</dt>
          <dd>{stat(profile.data?.repositories)}</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>{stat(profile.data?.followers)}</dd>
        </div>
        <div>
          <dt>Longest streak</dt>
          <dd>{grid ? `${grid.longest}d` : '—'}</dd>
        </div>
      </dl>
      <div className="graph-head">
        <div className="graph-years" role="group" aria-label="Year">
          {[thisYear, thisYear - 1].map((value) => (
            <button
              key={value}
              type="button"
              className="chip"
              aria-pressed={year === value}
              onClick={() => {
                setFocus(null);
                setYear(value);
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="graph-readout" aria-live="polite">
          {focus
            ? `${dayFormat.format(utc(focus.date))} · ${focus.count} contribution${focus.count === 1 ? '' : 's'}`
            : grid
              ? `${grid.active} active days · hover a square`
              : calendar.status === 'loading'
                ? 'Plotting…'
                : 'Calendar unavailable'}
        </p>
      </div>
      {grid && data ? (
        <div className="graph-plot">
          <svg
            viewBox={`0 -18 ${grid.cols * CELL} ${7 * CELL + 18}`}
            role="img"
            aria-label={`${data.total} public contributions by ${githubUsername} in ${year}; ${grid.active} active days; longest streak ${grid.longest} days.`}
            onPointerLeave={() => setFocus(null)}
          >
            {grid.months.map((month) => (
              <text
                key={`${month.label}-${month.col}`}
                x={month.col * CELL + 1}
                y={-6}
                className="graph-month"
              >
                {month.label}
              </text>
            ))}
            {grid.cells.map(({ day, col, row }) => (
              <rect
                key={day.date}
                x={col * CELL + 2}
                y={row * CELL + 2}
                width={CELL - 4}
                height={CELL - 4}
                rx={1.5}
                data-level={day.level}
                data-focus={focus?.date === day.date}
                onPointerEnter={() => setFocus(day)}
              />
            ))}
          </svg>
        </div>
      ) : (
        <div className="graph-empty" data-status={calendar.status}>
          {calendar.status === 'unavailable' ? (
            <>
              <p>
                The public contribution calendar couldn’t be loaded. Nothing is
                filled in by hand, so this stays empty until it loads.
              </p>
              <button type="button" className="chip" onClick={calendar.retry}>
                Try again
              </button>
            </>
          ) : (
            <p>Plotting…</p>
          )}
        </div>
      )}
      <p className="graph-foot">
        <span>Live from GitHub’s public profile and calendar.</span>
        <a className="ink-link" href={links.github}>
          github.com/{githubUsername} ↗
        </a>
      </p>
    </div>
  );
}
