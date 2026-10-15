import { Link, useParams } from 'react-router';
import { Projects } from '../features/portfolio/Projects';
import {
  achievements,
  articles,
  projects,
} from '../features/portfolio/content';
import { links } from '../lib/links';

function MissingContent({
  kind,
  archive,
  back,
}: {
  kind: string;
  archive: string;
  back: string;
}) {
  return (
    <main id="main" className="page content-page">
      <p className="eyebrow">404 / {kind}</p>
      <h1 tabIndex={-1}>{kind} not found</h1>
      <p>
        This address does not match a published entry. The archive has the
        available work.
      </p>
      <Link className="back-link" to={archive}>
        {back}
      </Link>
    </main>
  );
}

export function ProjectsPage() {
  return (
    <main id="main" className="page content-page project-archive">
      <Link className="back-link" to="/#projects">
        Back to portfolio projects
      </Link>
      <header className="content-heading">
        <p className="eyebrow">Selected work / Complete index</p>
        <h1 tabIndex={-1}>Project archive</h1>
        <p className="intro">
          Research questions, useful systems, and things built to learn.
        </p>
        <p>
          Six projects, from course work to ongoing research. Each case study
          separates the documented work from its current limits.
        </p>
      </header>
      <section aria-labelledby="archive-projects">
        <h2 id="archive-projects">Browse projects</h2>
        <Projects archive />
      </section>
    </main>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];
  if (!project)
    return (
      <MissingContent
        kind="Project"
        archive="/projects"
        back="Back to project archive"
      />
    );
  const previous = projects[index - 1];
  const next = projects[index + 1];
  return (
    <main id="main" className="page content-page project-detail">
      <Link className="back-link" to="/projects">
        Back to project archive
      </Link>
      <header className="content-heading project-detail-heading">
        <div>
          <p className="eyebrow">{project.category} / Project notes</p>
          <h1 tabIndex={-1}>{project.name}</h1>
          <p className="intro">{project.summary}</p>
          <div className="content-meta">
            <span className="content-status">{project.status}</span>
            {project.period && <span>{project.period}</span>}
          </div>
          <ul className="tag-list" aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {project.image && (
          <img
            className="case-study-cover"
            src={project.image}
            alt=""
            width="160"
            height="200"
          />
        )}
      </header>
      <section className="content-section" aria-labelledby="project-overview">
        <h2 id="project-overview">Overview</h2>
        <p>{project.overview}</p>
      </section>
      <div className="case-study-details">
        {project.details.map((detail) => (
          <section className="content-section" key={detail.title}>
            <h2>{detail.title}</h2>
            <p>{detail.body}</p>
          </section>
        ))}
      </div>
      <section
        className="content-section evidence-note"
        aria-labelledby="project-limits"
      >
        <h2 id="project-limits">Limits and current status</h2>
        <ul>
          {project.limitations.map((limitation) => (
            <li key={limitation}>{limitation}</li>
          ))}
        </ul>
      </section>
      <section className="content-section" aria-labelledby="project-sources">
        <h2 id="project-sources">Sources</h2>
        <p>
          These notes draw on the sources below. Repository descriptions are not
          independent validation.
        </p>
        <ul className="content-source-list">
          {project.sources.map((source) => (
            <li key={source.label}>
              <a href={source.href}>{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
      {project.href && (
        <a className="outline-link" href={project.href}>
          View repository <span aria-hidden="true">↗</span>
        </a>
      )}
      <nav className="adjacent-projects" aria-label="Project navigation">
        {previous ? (
          <Link
            to={`/projects/${previous.slug}`}
            aria-label={`Previous project: ${previous.name}`}
          >
            <span>Previous project</span>
            {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/projects/${next.slug}`}
            aria-label={`Next project: ${next.name}`}
          >
            <span>Next project</span>
            {next.name}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}

export function HackathonsPage() {
  const { slug } = useParams();
  const event = achievements.find((entry) => entry.slug === slug);
  if (slug && !event)
    return (
      <MissingContent
        kind="Hackathon"
        archive="/hackathons"
        back="Back to hackathon archive"
      />
    );
  return (
    <main id="main" className="page content-page hackathons-page">
      <Link className="back-link" to={event ? '/hackathons' : '/#hackathons'}>
        {event ? 'Back to hackathon archive' : 'Back to portfolio hackathons'}
      </Link>
      <header className="content-heading">
        <p className="eyebrow">Building together / Event notes</p>
        <h1 tabIndex={-1}>{event ? event.name : 'Hackathons'}</h1>
        <p className="intro">
          Short deadlines. Shared ideas. Lessons that last.
        </p>
        <p>
          One achievement is recorded in my supplied resume. The event record
          below keeps its source and missing evidence visible.
        </p>
      </header>
      {(event ? [event] : achievements).map((entry) => (
        <article className="hackathon-record" key={entry.slug}>
          <div className="event-text-card">
            <p className="eyebrow">Resume record</p>
            <span className="event-initial" aria-hidden="true">
              S
            </span>
            <p>{entry.name}</p>
            <span>Event photograph not supplied</span>
          </div>
          <div>
            {!event && (
              <h2>
                <Link to={`/hackathons/${entry.slug}`}>{entry.name}</Link>
              </h2>
            )}
            <p className="event-result">{entry.result}</p>
            <p className="content-status">{entry.status}</p>
            <dl className="event-facts">
              <div>
                <dt>Date</dt>
                <dd>{entry.date ?? 'Not yet verified'}</dd>
              </div>
              <div>
                <dt>Project</dt>
                <dd>{entry.project ?? 'Details not supplied'}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{entry.team ?? 'Details not supplied'}</dd>
              </div>
              <div>
                <dt>Official evidence</dt>
                <dd>{entry.evidence ?? 'Not yet supplied'}</dd>
              </div>
            </dl>
            <p>
              Source: original owner-supplied resume. Official result evidence
              is not yet supplied.
            </p>
          </div>
        </article>
      ))}
      <aside className="evidence-note">
        <h2>Room for the full story</h2>
        <p>
          Official results, event date, project details, team credits and
          personal photographs will complete this record when they are supplied
          and verified.
        </p>
      </aside>
    </main>
  );
}

export function ThoughtsPage() {
  return (
    <main id="main" className="page content-page thoughts-page">
      <Link className="back-link" to="/#thoughts">
        Back to portfolio writing
      </Link>
      <header className="content-heading">
        <p className="eyebrow">Notes / Ideas / Connections</p>
        <h1 tabIndex={-1}>Train of Thought</h1>
        <p className="intro">
          A place for questions that do not stay in one field.
        </p>
        <p>
          Writing lives on <a href={links.blog}>my Bear Blog</a>. Start with the
          supplied publication below.
        </p>
      </header>
      <div className="writing-list">
        {articles.map((article) => (
          <article key={article.slug}>
            <p className="eyebrow">Writing / Bear Blog</p>
            <h2>
              <Link to={`/thoughts/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>
              The title frames a question about discoveries across disciplines.
              Read the original publication for the full argument.
            </p>
            <p className="publication-status">Publication date not verified</p>
            <a href={article.href}>
              Original publication <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}

export function ThoughtPage() {
  const { slug } = useParams();
  const article = articles.find((entry) => entry.slug === slug);
  if (!article)
    return (
      <MissingContent
        kind="Article"
        archive="/thoughts"
        back="Back to writing archive"
      />
    );
  return (
    <main id="main" className="page content-page thought-detail">
      <Link className="back-link" to="/thoughts">
        Back to writing archive
      </Link>
      <article>
        <header className="content-heading">
          <p className="eyebrow">Writing / Editorial introduction</p>
          <h1 tabIndex={-1}>{article.title}</h1>
          <div className="content-meta">
            <span>Debrato Ghosh</span>
            <span>Bear Blog</span>
            <span>Publication date not verified</span>
          </div>
        </header>
        <section
          className="content-section"
          aria-labelledby="article-introduction"
        >
          <h2 id="article-introduction">Across the boundaries</h2>
          <p className="intro">
            The title frames a question about where discoveries begin when ideas
            move between disciplines.
          </p>
          <p>
            This page introduces the supplied publication. The full article
            remains on my Bear Blog; its text, publication date and category
            have not been verified here.
          </p>
          <a className="primary-link" href={article.href}>
            Read on Bear Blog <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="content-section" aria-labelledby="article-source">
          <h2 id="article-source">Publication source</h2>
          <p>
            <a href={article.href}>Original article on Bear Blog</a> ·
            Owner-supplied publication link.
          </p>
        </section>
      </article>
      <nav className="content-section" aria-label="Writing navigation">
        <Link to="/thoughts">All writing</Link> ·{' '}
        <a href={links.blog}>Visit the blog</a>
      </nav>
    </main>
  );
}
