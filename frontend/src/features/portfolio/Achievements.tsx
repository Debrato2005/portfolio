import { Link } from 'react-router';
import { Icon } from '../../components/ui/Icon';
import { achievements } from './content';

export function Achievements() {
  return (
    <div className="achievement-wall">
      <p className="achievement-margin-note">
        Ideas. People. <br />
        Late nights. <br />
        Progress.
      </p>
      <div className="achievement-records">
        {achievements.map((achievement) => (
          <div className="achievement-hanging" key={achievement.slug}>
            <svg
              className="achievement-cord"
              viewBox="0 0 400 88"
              fill="none"
              aria-hidden="true"
            >
              <path d="M42 13Q200 67 358 13M91 27L111 84M309 27L289 84" />
              <circle cx="42" cy="13" r="5" />
              <circle cx="358" cy="13" r="5" />
            </svg>
            <article className="achievement-paper">
              <span className="achievement-fastener achievement-fastener-left" />
              <span className="achievement-fastener achievement-fastener-right" />
              <p className="achievement-event-type">Hackathon record</p>
              <h3>{achievement.name.replace(' Hackathon', '')}</h3>
              <p className="achievement-result">{achievement.result}</p>
              <div className="achievement-record-footer">
                <p>{achievement.status}</p>
                <Link to={`/hackathons/${achievement.slug}`}>
                  View event record <Icon name="arrow-up-right" />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className="achievement-context">
        <p className="achievement-context-note">
          Small teams.
          <br />
          Big questions.
        </p>
        <p>
          Project notes, team details and event photographs will complete this
          record.
        </p>
        <p className="achievement-context-signoff">More memories to make.</p>
      </div>
    </div>
  );
}
