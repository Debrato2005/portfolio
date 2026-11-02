import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { projects } from '../portfolio/content';
import type { Project } from '../portfolio/content';
import { Emphasis } from './Emphasis';

const rest = [-1.1, 0.7, -0.4, 0.9, -0.8, 0.5];

/** The project, pulled out of the file and laid on top of everything. */
function CardDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="card-dialog"
      aria-labelledby="card-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <article className="card-sheet">
          <header className="card-sheet-head">
            <p className="card-meta">
              {[project.role, project.period, project.status]
                .filter(Boolean)
                .join(' · ') || 'Project'}
            </p>
            <button
              type="button"
              className="card-close"
              onClick={onClose}
              aria-label="Close project card"
            >
              ×
            </button>
          </header>
          <h3 id="card-dialog-title">{project.name}</h3>
          <p className="card-sheet-tagline">{project.tagline}</p>
          <ul className="card-points">
            {project.points.map((point) => (
              <li key={point}>
                <Emphasis text={point} />
              </li>
            ))}
          </ul>
          <ul className="card-stack" aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <footer className="card-sheet-foot">
            {project.href ? (
              <a className="tape-button" href={project.href}>
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="card-private">No public repository yet</span>
            )}
            <span className="card-source">Source: {project.source}</span>
          </footer>
        </article>
      )}
    </dialog>
  );
}

export function IndexCards() {
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <ol className="cards">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            id={`project-${project.slug}`}
            className="index-card"
            data-reveal
            style={
              {
                '--rest': `${rest[index % rest.length]}deg`,
                '--i': index % 3,
              } as CSSProperties
            }
          >
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpen(project);
              }}
            >
              <span className="card-top">
                <span>No. {String(index + 1).padStart(2, '0')}</span>
                {project.status && <span>{project.status}</span>}
              </span>
              <span className="card-name">{project.name}</span>
              <span className="card-tagline">{project.tagline}</span>
              <span className="card-foot">
                <span className="card-stack-line">
                  {project.stack.slice(0, 3).join(' · ')}
                </span>
                <span className="card-open" aria-hidden="true">
                  Open →
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <CardDialog
        project={open}
        onClose={() => {
          setOpen(null);
          opener.current?.focus();
        }}
      />
    </>
  );
}
