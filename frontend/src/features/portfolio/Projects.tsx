import { useSearchParams } from 'react-router';
import { projects } from './content';
import { Icon } from '../../components/ui/Icon';
import { Link } from 'react-router';
export function Projects({ archive = false }: { archive?: boolean }) {
  const [params, setParams] = useSearchParams();
  const chosen = params.get('work') ?? 'All work';
  const categories = ['All work', 'Research', 'Systems', 'Applications'];
  const filter = categories.includes(chosen) ? chosen : 'All work';
  const visible = (archive ? projects : projects.slice(0, 4)).filter(
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
              setParams(next, { preventScrollReset: true });
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.name}>
            <Link
              className="project-media"
              to={`/projects/${project.slug}`}
              aria-label={`${project.name}: ${project.status}`}
              tabIndex={-1}
            >
              {project.image ? (
                <img
                  className="project-image"
                  src={project.image}
                  srcSet={project.imageSrcSet}
                  sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1168px) calc((100vw - 9.5rem) / 2), 508px"
                  alt=""
                  width={project.imageWidth ?? 1122}
                  height={project.imageHeight ?? 1402}
                  loading="lazy"
                />
              ) : (
                <div className="project-text-cover">
                  {project.name}
                  <small>{project.category} · Project notes</small>
                </div>
              )}
              <span className="project-status">{project.status}</span>
            </Link>
            <div className="project-copy">
              <span className="project-category">{project.category}</span>
              <h3>
                <Link to={`/projects/${project.slug}`}>
                  {project.name}
                  <Icon name="arrow-up-right" />
                </Link>
              </h3>
              <p>{project.summary}</p>
              <details className="project-notes">
                <summary aria-label={`Engineering notes for ${project.name}`}>
                  Engineering notes <Icon name="caret-right" />
                </summary>
                {project.details.map((detail) => (
                  <div key={detail.title}>
                    <h4>{detail.title}</h4>
                    <p>{detail.body}</p>
                  </div>
                ))}
              </details>
              <div className="project-card-footer">
                <ul
                  className="tag-list"
                  aria-label={`${project.name} technologies`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {project.href ? (
                  <a
                    className="project-repository"
                    href={project.href}
                    aria-label={`${project.name} repository`}
                  >
                    <Icon name="github-logo" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
    </>
  );
}
