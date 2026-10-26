import { useState } from 'react';
import type { CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { projects } from './content';
import { Icon } from '../../components/ui/Icon';
import { morph } from './shapes';
import type { ShapeName } from './shapes';

const categories = ['All work', 'Research', 'Systems', 'Applications'];
const coverShapes: Record<string, ShapeName> = {
  oncosyn: 'flower',
  cryptalis: 'pentagon',
  smolink: 'cookie9',
  unispace: 'clover4',
  orbitops: 'sunny',
  staysync: 'cookie6',
};
const tones = ['primary', 'tertiary', 'secondary'] as const;

export function Projects() {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const chosen = params.get('work') ?? 'All work';
  const fromUrl = categories.includes(chosen) ? chosen : 'All work';
  // Local state lets a view transition capture the new grid synchronously;
  // it follows the URL again after history navigation.
  const [filter, setFilter] = useState(fromUrl);
  const [synced, setSynced] = useState(fromUrl);
  if (synced !== fromUrl) {
    setSynced(fromUrl);
    setFilter(fromUrl);
  }
  const visible = projects.filter(
    (project) => filter === 'All work' || project.category === filter,
  );
  function choose(value: string) {
    const commit = () => flushSync(() => setFilter(value));
    if (
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      document.startViewTransition(commit);
    else commit();
    const next = new URLSearchParams(params);
    if (value === 'All work') next.delete('work');
    else next.set('work', value);
    navigate({ search: next.toString(), hash }, { preventScrollReset: true });
  }
  return (
    <>
      <div
        className="project-filters chip-set"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((value) => (
          <button
            className="filter-chip ripple"
            key={value}
            aria-pressed={filter === value}
            onClick={() => choose(value)}
          >
            <Icon name="check" />
            {value}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <article
            className="project-card"
            data-tone={tones[projects.indexOf(project) % tones.length]}
            id={`project-${project.slug}`}
            key={project.name}
            style={
              {
                viewTransitionName: `project-${project.slug}`,
                '--card-index': index,
                ...morph(coverShapes[project.slug] ?? 'cookie9', 'squircle'),
              } as CSSProperties
            }
          >
            <div className="project-media" aria-hidden="true">
              <span className="project-cover">
                {project.image ? (
                  <img
                    className="project-image"
                    src={project.image}
                    srcSet={project.imageSrcSet}
                    sizes="(max-width: 700px) 60vw, 240px"
                    alt=""
                    width={project.imageWidth ?? 1122}
                    height={project.imageHeight ?? 1402}
                    loading="lazy"
                  />
                ) : (
                  <span className="project-text-cover">
                    {project.slug === 'orbitops' ? (
                      <svg viewBox="0 0 240 240" className="project-diagram">
                        <circle cx="120" cy="120" r="30" />
                        <ellipse
                          cx="120"
                          cy="120"
                          rx="96"
                          ry="40"
                          transform="rotate(-25 120 120)"
                        />
                        <ellipse
                          cx="120"
                          cy="120"
                          rx="96"
                          ry="40"
                          transform="rotate(25 120 120)"
                        />
                        <circle
                          className="diagram-marker orbit-marker"
                          cx="200"
                          cy="82"
                          r="8"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 240 240" className="project-diagram">
                        <path d="M48 64h144v112H48zM48 112h144M48 128h144M96 64v48m48-48v48M96 128v48m48-48v48" />
                        <path
                          className="diagram-marker"
                          d="M62 86l7 7 13-15m50 9 7 7 13-15m-20 70 7 7 13-15"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </span>
              <span className="project-category-badge">{project.category}</span>
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
                className="ripple"
                aria-label={`Open project brief for ${project.name}`}
                title={`Open project brief for ${project.name}`}
              >
                <span>Project brief</span>
                <Icon name="caret-down" />
              </summary>
              <div className="project-brief">
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
