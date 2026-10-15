import { links } from '../../lib/links';
import { useRef, useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { useGitHubProfile } from './useGitHubProfile';
import { useGitHubContributions } from './useGitHubContributions';
import { contributionDates } from '../../lib/api/contributions';
import type { ContributionDay } from '../../lib/api/contributions';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
function dayLabel(day: ContributionDay) {
  return `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${dateFormat.format(new Date(`${day.date}T00:00:00Z`))}`;
}

export function ContributionSection() {
  const [today] = useState(() => new Date());
  const currentYear = today.getUTCFullYear();
  const [year, setYear] = useState(currentYear);
  const profile = useGitHubProfile();
  const contributions = useGitHubContributions(year);
  const [selectedDate, setSelectedDate] = useState('');
  const [hoveredDate, setHoveredDate] = useState('');
  const [expanded, setExpanded] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const dates = contributionDates(year);
  const offset = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const weeks = Math.ceil((dates.length + offset) / 7);
  const days = contributions.data?.days;
  const selected = days?.find((day) => day.date === selectedDate) ?? days?.[0];
  const selectedIndex = days?.findIndex((day) => day === selected) ?? 0;
  const detailed = days?.find((day) => day.date === hoveredDate) ?? selected;
  return (
    <div
      className="contribution-layout"
      data-source={contributions.data?.source}
    >
      <div className="calendar-panel">
        <div className="contribution-total">
          <strong>{contributions.data?.total.toLocaleString() ?? '—'}</strong>
          <span>contributions</span>
          <span>in {year}</span>
        </div>
        <div className="calendar-detail">
          <div className="calendar-top">
            <span>Daily contributions</span>
            <select
              aria-label="Contribution year"
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
            >
              {Array.from(
                { length: currentYear - 2007 },
                (_, index) => currentYear - index,
              ).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          <div
            className={`calendar-scroll${expanded && days ? ' calendar-expanded' : ''}`}
            role="region"
            tabIndex={0}
            aria-label="Scrollable contribution calendar"
            onPointerLeave={() => setHoveredDate('')}
          >
            <div
              className="calendar-month-labels"
              aria-hidden="true"
              style={{
                gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
              }}
            >
              {dates
                .filter((date) => date.endsWith('-01'))
                .map((date) => {
                  const index = dates.indexOf(date);
                  return (
                    <span
                      key={date}
                      style={{
                        gridColumn: Math.floor((offset + index) / 7) + 1,
                      }}
                    >
                      {new Date(`${date}T00:00:00Z`).toLocaleString('en-US', {
                        month: 'short',
                        timeZone: 'UTC',
                      })}
                    </span>
                  );
                })}
            </div>
            <div
              className="calendar-grid"
              id="contribution-days"
              role={days && expanded ? 'group' : 'img'}
              aria-label={`Contribution calendar for ${year}: ${days ? 'daily counts from GitHub' : 'daily counts unavailable'}`}
              style={{
                gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
              }}
            >
              {dates.map((date, index) => {
                const day = days?.[index];
                const style = {
                  gridColumn: Math.floor((offset + index) / 7) + 1,
                  gridRow: ((offset + index) % 7) + 1,
                };
                return day && expanded ? (
                  <button
                    type="button"
                    className="calendar-day"
                    key={date}
                    ref={(element) => {
                      buttons.current[index] = element;
                    }}
                    style={style}
                    data-level={day.level}
                    aria-label={dayLabel(day)}
                    title={dayLabel(day)}
                    tabIndex={index === selectedIndex ? 0 : -1}
                    onFocus={() => {
                      setSelectedDate(date);
                      setHoveredDate('');
                    }}
                    onPointerEnter={() => setHoveredDate(date)}
                    onPointerDown={() => setSelectedDate(date)}
                    onClick={() => setSelectedDate(date)}
                    onKeyDown={(event) => {
                      const moves: Record<string, number> = {
                        ArrowUp: -1,
                        ArrowDown: 1,
                        ArrowLeft: -7,
                        ArrowRight: 7,
                      };
                      const move = moves[event.key];
                      if (
                        move !== undefined ||
                        event.key === 'Home' ||
                        event.key === 'End'
                      ) {
                        event.preventDefault();
                        const next =
                          event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? dates.length - 1
                              : Math.max(
                                  0,
                                  Math.min(
                                    dates.length - 1,
                                    index + (move ?? 0),
                                  ),
                                );
                        buttons.current[next]?.focus();
                      }
                    }}
                  />
                ) : (
                  <span
                    className="calendar-day"
                    data-unavailable={day ? undefined : 'true'}
                    data-level={day?.level}
                    aria-hidden="true"
                    key={date}
                    style={style}
                    title={day ? dayLabel(day) : `${date}: unavailable`}
                    onPointerEnter={() => setHoveredDate(date)}
                  />
                );
              })}
            </div>
          </div>
          {days ? (
            <>
              <p
                className="calendar-note calendar-day-detail"
                role="status"
                aria-label="Selected contribution day"
              >
                {detailed ? dayLabel(detailed) : ''}
              </p>
              <button
                className="calendar-explore"
                type="button"
                aria-expanded={expanded}
                aria-controls="contribution-days"
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded
                  ? 'Show compact overview'
                  : 'Explore daily contributions'}
              </button>
              <div
                className="calendar-legend"
                aria-label="Contribution intensity from less to more"
              >
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="calendar-day"
                    data-level={level}
                    aria-hidden="true"
                  />
                ))}
                <span>More</span>
              </div>
              <p className="calendar-note">
                {contributions.data?.source === 'public-calendar' ? (
                  <>
                    Public GitHub calendar via{' '}
                    <a href="https://github.com/grubersjoe/github-contributions-api">
                      jogruber
                    </a>{' '}
                    · Updates hourly
                  </>
                ) : (
                  'GitHub contribution counts'
                )}{' '}
                · <a href={links.github}>View on GitHub</a>
              </p>
            </>
          ) : (
            <p className="calendar-note" role="status">
              {contributions.status === 'loading' ? (
                'Loading contribution data.'
              ) : (
                <>
                  Contribution data is unavailable.{' '}
                  <button
                    type="button"
                    onClick={contributions.retry}
                    aria-label="Retry contribution data"
                  >
                    Retry
                  </button>
                </>
              )}{' '}
              <a href={links.github}>View on GitHub</a>
            </p>
          )}
        </div>
      </div>
      <div className="github-side">
        <div className="github-profile-heading">
          <span>
            <Icon name="github-logo" /> Contributions
          </span>
          <a href={links.github}>
            @Debrato2005 <Icon name="arrow-up-right" />
          </a>
        </div>
        {profile.status === 'ready' ? (
          <>
            <div className="github-stats">
              {[
                {
                  label: 'Public repositories',
                  short: 'Repositories',
                  value: profile.data.repositories,
                  icon: 'git-branch' as const,
                },
                {
                  label: 'Followers',
                  short: 'Followers',
                  value: profile.data.followers,
                  icon: 'users' as const,
                },
                {
                  label: 'Following',
                  short: 'Following',
                  value: profile.data.following,
                  icon: 'user-plus' as const,
                },
              ].map((item) => (
                <div role="group" aria-label={item.label} key={item.label}>
                  <dl>
                    <dt>
                      <Icon name={item.icon} />
                      {item.short}
                    </dt>
                    <dd>{item.value.toLocaleString()}</dd>
                  </dl>
                </div>
              ))}
            </div>
            <p
              className="profile-status"
              role="status"
              aria-label="GitHub profile status"
            >
              Public profile · GitHub API
            </p>
          </>
        ) : (
          <div
            className="github-profile-fallback"
            role="status"
            aria-label="GitHub profile status"
          >
            <p>
              {profile.status === 'loading'
                ? 'Loading public profile…'
                : 'Public profile data is unavailable. Retry or open the GitHub profile.'}
            </p>
            {profile.status === 'unavailable' ? (
              <button type="button" onClick={profile.retry}>
                Retry profile
              </button>
            ) : null}
            <a href={links.github}>Open GitHub profile</a>
          </div>
        )}
      </div>
    </div>
  );
}
