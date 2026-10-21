import type { CSSProperties, ReactNode } from 'react';
import { achievements } from './content';

const tilts = ['-2.4deg', '-1.1deg', '0.2deg', '1.3deg', '2.5deg'];
const drops = ['0.1rem', '0.35rem', '0.55rem', '0.35rem', '0.1rem'];

const doodles: Record<string, ReactNode> = {
  svasth: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="20" r="9" />
      <path d="M19 27l-4 14 9-5 9 5-4-14" />
      <path d="M24 16l1.4 2.8 3.1.4-2.2 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1-2.2-2.2 3.1-.4z" />
    </svg>
  ),
  'nasa-space-apps': (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6c6 5 9 12 9 20l-4 5h-10l-4-5c0-8 3-15 9-20z" />
      <circle cx="24" cy="19" r="4" />
      <path d="M19 31l-6 9 8-3m14-6l6 9-8-3" />
    </svg>
  ),
  hackcbs: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M18 15l-9 9 9 9M30 15l9 9-9 9M27 11l-6 26" />
    </svg>
  ),
  'sih-2023': (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 7a12 12 0 0 1 7 21.8V33H17v-4.2A12 12 0 0 1 24 7z" />
      <path d="M19 37h10M21 42h6" />
    </svg>
  ),
  'build-with-genai': (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6l3.6 11.4L39 21l-11.4 3.6L24 36l-3.6-11.4L9 21l11.4-3.6z" />
      <path d="M37 33l1.4 4.6L43 39l-4.6 1.4L37 45l-1.4-4.6L31 39l4.6-1.4z" />
    </svg>
  ),
};

export function Achievements() {
  return (
    <div className="achievement-wall">
      <svg
        className="achievement-rope"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 7C230 20 770 22 1000 5" />
      </svg>
      <ul className="achievement-line" aria-label="Hackathon records">
        {achievements.map((achievement, index) => (
          <li
            className="achievement-pin"
            key={achievement.slug}
            style={
              {
                '--pin-tilt': tilts[index % tilts.length],
                '--pin-drop': drops[index % drops.length],
              } as CSSProperties
            }
          >
            <article className="achievement-paper">
              <span className="achievement-clip" aria-hidden="true" />
              <span className="achievement-doodle" aria-hidden="true">
                {doodles[achievement.slug]}
              </span>
              <h3>{achievement.name}</h3>
              <p className="achievement-result">
                {achievement.result}
                {achievement.qualifier ? (
                  <small className="achievement-qualifier">
                    {achievement.qualifier}
                  </small>
                ) : null}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
