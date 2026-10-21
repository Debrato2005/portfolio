import { projects } from './content';
export function EngineeringTimeline() {
  return (
    <details className="engineering-notes">
      <summary>
        Engineering notes{' '}
        <span>Projects in progress and documented decisions</span>
      </summary>
      <ol>
        {projects
          .filter((project) => project.period)
          .map((project) => (
            <li key={project.slug}>
              <p className="eyebrow">{project.period}</p>
              <h3>
                <a href={`#project-${project.slug}`}>{project.name}</a>
              </h3>
              <p>{project.summary}</p>
              <small>{project.status}</small>
            </li>
          ))}
      </ol>
      <p className="source-note">
        Dates from the supplied resume. These are project periods, not a GitHub
        activity feed.
      </p>
    </details>
  );
}
