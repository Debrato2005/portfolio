import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { projects } from './content';
import { Icon } from '../../components/ui/Icon';
export function Projects() {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const chosen = params.get('work') ?? 'All work';
  const categories = ['All work', 'Research', 'Systems', 'Applications'];
  const filter = categories.includes(chosen) ? chosen : 'All work';
  const visible = projects.filter(
    (project) => filter === 'All work' || project.category === filter,
  );
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((value) => (
          <button
            className="quiet-button"
            key={value}
            aria-pressed={filter === value}
            onClick={() => {
              const next = new URLSearchParams(params);
              if (value === 'All work') next.delete('work');
              else next.set('work', value);
              navigate(
                { search: next.toString(), hash },
                { preventScrollReset: true },
              );
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            className="project-card"
            id={`project-${project.slug}`}
            key={project.name}
          >
            <div className="project-media" aria-hidden="true">
              {project.image ? (
                <img
                  className="project-image"
                  src={project.image}
                  srcSet={project.imageSrcSet}
                  sizes="86px"
                  alt=""
                  width={project.imageWidth ?? 1122}
                  height={project.imageHeight ?? 1402}
                  loading="lazy"
                />
              ) : (
                <div className="project-text-cover" aria-hidden="true">
                  {project.slug === 'orbitops' ? (
                    <svg viewBox="0 0 480 240" className="project-diagram">
                      <circle cx="240" cy="120" r="45" />
                      <ellipse
                        cx="240"
                        cy="120"
                        rx="170"
                        ry="62"
                        transform="rotate(-25 240 120)"
                      />
                      <ellipse
                        cx="240"
                        cy="120"
                        rx="170"
                        ry="62"
                        transform="rotate(25 240 120)"
                      />
                      <circle
                        className="diagram-marker"
                        cx="373"
                        cy="58"
                        r="8"
                      />
                      <path d="M222 120h36m-18-18v36" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 480 240" className="project-diagram">
                      <path d="M92 48h296v144H92zM92 112h296M92 128h296M166 48v64m74-64v64m74-64v64M166 128v64m74-64v64m74-64v64" />
                      <path
                        className="diagram-marker"
                        d="M116 78l8 8 17-20m123 12 8 8 17-20m49 92 8 8 17-20"
                      />
                      <path d="M75 210h330m-313-7v14m296-14v14" />
                    </svg>
                  )}
                  <small>{project.category} · Concept diagram</small>
                </div>
              )}
            </div>
            <div className="project-copy">
              <div className="project-card-heading">
                <h3 tabIndex={-1} aria-label={project.name}>
                  {project.href ? (
                    <a
                      className="project-repository"
                      href={project.href}
                      aria-label={`${project.name} repository`}
                    >
                      {project.name}
                      <Icon name="arrow-up-right" />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <span className="project-status">{project.status}</span>
              </div>
              <p className="prose">{project.summary}</p>
              <ul
                className="tag-list"
                aria-label={`${project.name} technologies`}
              >
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <details className="project-notes">
              <summary
                aria-label={`Open project brief for ${project.name}`}
                title={`Open project brief for ${project.name}`}
              >
                <Icon name="caret-right" />
              </summary>
              <p className="project-category">{project.category}</p>
              {project.period ? (
                <p className="project-period">{project.period}</p>
              ) : null}
              <p>{project.overview}</p>
              {project.details.map((detail) => (
                <div key={detail.title}>
                  <h4>{detail.title}</h4>
                  <p>{detail.body}</p>
                </div>
              ))}
              <div
                className="project-disclosure-group"
                role="group"
                aria-label="Limits and current status"
              >
                <h4>Limits and current status</h4>
                <ul>
                  {project.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
              <div
                className="project-sources"
                role="group"
                aria-label="Sources"
              >
                <h4>Sources</h4>
                <ul>
                  {project.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href}>{source.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </article>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
    </>
  );
}
