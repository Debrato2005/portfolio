import { links } from '../../lib/links';
import { useRef, useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { ShapeLoader } from './Expressive';
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
const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
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
  const exploreButton = useRef<HTMLButtonElement>(null);
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
        <div className="calendar-detail">
          <div className="calendar-top">
            <span>
              {!expanded && hoveredDate && detailed
                ? `${detailed.count} · ${shortDateFormat.format(new Date(`${detailed.date}T00:00:00Z`))}`
                : 'Daily contributions'}
            </span>
          </div>
          <div
            className={`calendar-scroll${expanded && days ? ' calendar-expanded' : ''}`}
            role="region"
            tabIndex={0}
            aria-label="Scrollable contribution calendar"
            aria-describedby={days ? 'contribution-instructions' : undefined}
            onPointerLeave={() => setHoveredDate('')}
            onKeyDown={(event) => {
              if (expanded && event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                setExpanded(false);
                exploreButton.current?.focus();
              }
            }}
          >
            <div
              className="calendar-month-labels"
              aria-hidden="true"
              style={{
                gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                maxWidth: expanded ? undefined : weeks * 14 - 2,
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
                maxWidth: expanded ? undefined : weeks * 14 - 2,
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
                    data-selected={day === selected ? 'true' : undefined}
                    data-hovered={date === hoveredDate ? 'true' : undefined}
                    aria-label={dayLabel(day)}
                    title={dayLabel(day)}
                    tabIndex={index === selectedIndex ? 0 : -1}
                    onFocus={() => {
                      setSelectedDate(date);
                      setHoveredDate('');
                    }}
                    onPointerMove={(event) => {
                      if (event.pointerType !== 'touch') setHoveredDate(date);
                    }}
                    onPointerDown={() => {
                      setHoveredDate('');
                      setSelectedDate(date);
                    }}
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
                        setHoveredDate('');
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
                    data-hovered={date === hoveredDate ? 'true' : undefined}
                    aria-hidden="true"
                    key={date}
                    style={style}
                    title={day ? dayLabel(day) : `${date}: unavailable`}
                    onPointerMove={(event) => {
                      if (event.pointerType !== 'touch') setHoveredDate(date);
                    }}
                  />
                );
              })}
            </div>
          </div>
          {days ? (
            <>
              {expanded && (
                <p
                  className="calendar-note calendar-day-detail"
                  role="status"
                  aria-label="Selected contribution day"
                >
                  {detailed ? dayLabel(detailed) : ''}
                </p>
              )}
              <div className="calendar-footer">
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
                <button
                  className="calendar-explore ripple"
                  type="button"
                  ref={exploreButton}
                  aria-expanded={expanded}
                  aria-controls="contribution-days"
                  aria-label={
                    expanded
                      ? 'Show compact overview'
                      : 'Explore daily contributions'
                  }
                  onClick={() => {
                    setExpanded((value) => !value);
                    if (!expanded)
                      requestAnimationFrame(() =>
                        buttons.current[selectedIndex]?.focus(),
                      );
                  }}
                >
                  {expanded ? 'Compact view' : 'Explore days'}
                </button>
                {contributions.data?.source === 'public-calendar' ? (
                  <a
                    className="calendar-source"
                    href="https://github.com/grubersjoe/github-contributions-api"
                    aria-label="Contribution source: public GitHub calendar via jogruber; updates hourly"
                  >
                    via jogruber
                  </a>
                ) : (
                  <a className="calendar-source" href={links.github}>
                    GitHub API
                  </a>
                )}
              </div>
              <p
                className={
                  expanded ? 'calendar-note calendar-instructions' : 'sr-only'
                }
                id="contribution-instructions"
              >
                {expanded
                  ? 'Arrow keys move between days. Esc returns to the overview.'
                  : 'Scroll across the year, or explore each day.'}
              </p>
              {expanded && contributions.data?.source === 'public-calendar' && (
                <p className="calendar-note">
                  Public GitHub calendar via jogruber · Updates hourly ·{' '}
                  <a href={links.github}>View on GitHub</a>
                </p>
              )}
            </>
          ) : (
            <p className="calendar-note" role="status">
              {contributions.status === 'loading' ? (
                <>
                  <ShapeLoader label="Loading contribution data" />
                  Loading contribution data.
                </>
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
            <Icon name="github-logo" /> GitHub profile
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
            {profile.status === 'loading' && (
              <ShapeLoader label="Loading public profile" />
            )}
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
