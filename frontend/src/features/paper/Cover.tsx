import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { links } from '../../lib/links';
import { education, experience, profile, projects } from '../portfolio/content';
import { goTo, sections } from './sections';
import { Tally } from './Tally';
import { useFinePointer, useReducedMotion } from './useReducedMotion';

/**
 * The front of the file: a manila folder with a clipped photo and a typed
 * contents card. Its layers drift at slightly different depths under the
 * pointer, like loose sheets on a desk.
 */
export function Cover() {
  const folder = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = folder.current;
    if (!el || !fine || reduced) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    const paint = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      el.style.setProperty('--px', now.x.toFixed(3));
      el.style.setProperty('--py', now.y.toFixed(3));
      raf =
        Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.002
          ? requestAnimationFrame(paint)
          : 0;
    };
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      target.x = ((event.clientX - box.left) / box.width - 0.5) * 2;
      target.y = ((event.clientY - box.top) / box.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  const current = experience[0];
  const degree = education[0];
  return (
    <div className="cover-stack">
      <section
        className="cover"
        ref={folder}
        aria-labelledby="cover-title"
        id="top"
      >
        <span className="cover-tab" aria-hidden="true">
          File · {profile.name}
        </span>
        <div className="cover-grid">
          <div className="cover-copy">
            <p className="cover-kicker">
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </p>
            <h1 id="cover-title" tabIndex={-1}>
              Debrato <em>Ghosh</em>
            </h1>
            <p className="cover-lead">
              I build backend systems and research computer vision. Right now
              I’m a research intern at{' '}
              {current.company.replace(' Pvt. Ltd.', '')}, working on
              deep-learning 2D-to-3D human reconstruction for real-time 3D video
              conferencing.
            </p>
            <p className="label-tape" aria-label={`Status: ${profile.status}`}>
              <span className="label-dot" aria-hidden="true" />
              {profile.status}
            </p>
            <div className="cover-actions">
              <a
                className="tape-button"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  goTo('work');
                }}
              >
                Open the file <span aria-hidden="true">→</span>
              </a>
              <a
                className="tag-button"
                href={links.resume}
                download="Debrato-Ghosh-Resume.pdf"
              >
                Resume PDF <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="cover-side">
            <figure className="photo" style={{ '--depth': 1 } as CSSProperties}>
              <svg className="clip" viewBox="0 0 24 64" aria-hidden="true">
                <path d="M8 60V12a6 6 0 0 1 12 0v40a9 9 0 0 1-18 0V18" />
              </svg>
              <img
                src="/images/debrato-avatar.jpg"
                width={460}
                height={460}
                alt="Debrato in sunglasses, making horns with both hands"
                decoding="async"
              />
              <figcaption>that’s me</figcaption>
            </figure>
            <nav
              className="contents-card"
              aria-label="File contents"
              style={{ '--depth': 0.45 } as CSSProperties}
            >
              <p className="contents-card-title">Contents</p>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id} data-tone={section.tone}>
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        goTo(section.id);
                      }}
                    >
                      <span className="contents-label">{section.label}</span>
                      <span className="contents-leader" aria-hidden="true" />
                      <span className="contents-no">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <Tally
          items={[
            {
              value: Number(degree.grade.match(/[\d.]+/)?.[0] ?? 0),
              decimals: 2,
              label: 'CGPA at MIT Manipal',
            },
            { value: experience.length, label: 'Internships' },
            { value: projects.length, label: 'Projects on file' },
            { value: 300, suffix: '+', label: 'Astro frames processed' },
          ]}
        />
      </section>
    </div>
  );
}
