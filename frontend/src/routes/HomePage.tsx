import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  activities,
  education,
  experience,
  profile,
  skillGroups,
} from '../features/portfolio/content';
import { Cover } from '../features/paper/Cover';
import { IndexCards } from '../features/paper/IndexCards';
import { GraphPaper } from '../features/paper/GraphPaper';
import { Envelope } from '../features/paper/Envelope';
import { Emphasis } from '../features/paper/Emphasis';
import { useReveal } from '../features/paper/hooks';
import { sections } from '../features/paper/sections';
import type { SectionId } from '../features/paper/sections';

/** One sheet in the file, behind its own coloured divider tab. */
function Sheet({
  id,
  lead,
  children,
}: {
  id: SectionId;
  lead?: ReactNode;
  children: ReactNode;
}) {
  const index = sections.findIndex((section) => section.id === id);
  const section = sections[index];
  if (!section) return null;
  return (
    <section
      className="sheet"
      id={id}
      data-tone={section.tone}
      aria-labelledby={`${id}-title`}
      style={{ '--tab-x': `${6 + index * 13}%` } as CSSProperties}
      data-reveal
    >
      <span className="divider-tab" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
        {section.label}
      </span>
      <header className="sheet-head">
        <h2 id={`${id}-title`} tabIndex={-1}>
          {section.label}
        </h2>
        {lead && <p className="sheet-lead">{lead}</p>}
      </header>
      {children}
    </section>
  );
}

function Experience() {
  return (
    <>
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company}>
            <p className="timeline-date">{job.period}</p>
            <div>
              <h3>{job.role}</h3>
              <p className="timeline-place">{job.company}</p>
              <ul className="ticks">
                {job.points.map((point) => (
                  <li key={point}>
                    <Emphasis text={point} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="sub-head">Education</h3>
      <ol className="report">
        {education.map((item) => (
          <li key={item.title}>
            <p className="timeline-date">{item.period}</p>
            <div>
              <p className="report-title">{item.title}</p>
              <p className="timeline-place">{item.place}</p>
              {item.note && <p className="report-note">{item.note}</p>}
            </div>
            <p className="report-grade">{item.grade}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Skills() {
  return (
    <div className="skill-groups">
      {skillGroups.map(([title, ...items], group) => (
        <div className="skill-group" key={title} data-reveal>
          <h3 className="label-tape label-tape-small">{title}</h3>
          <ul>
            {items.map((item, index) => (
              <li
                key={item}
                className="swing-tag"
                style={
                  {
                    '--tilt': `${((index * 7 + group * 3) % 5) - 2}deg`,
                  } as CSSProperties
                }
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const noteTones = ['yellow', 'green', 'pink', 'blue', 'lilac'] as const;

function Beyond() {
  const notes = [
    ...activities,
    {
      title: 'Off-screen',
      body: profile.hobbies.join(' · '),
      detail: null,
      href: null,
    },
    {
      title: 'Speaks',
      body: profile.spokenLanguages.join(' · '),
      detail: null,
      href: null,
    },
  ];
  return (
    <ul className="notes">
      {notes.map((note, index) => (
        <li
          key={note.title}
          className="note"
          data-tone={noteTones[index % noteTones.length]}
          data-reveal
          style={
            {
              '--rest': `${[-2, 1.5, -1, 2, -1.5, 1, -0.5][index % 7]}deg`,
              '--i': index % 4,
            } as CSSProperties
          }
        >
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          {note.detail &&
            (note.href ? (
              <a className="note-detail" href={note.href}>
                {note.detail} ↗
              </a>
            ) : (
              <p className="note-detail">{note.detail}</p>
            ))}
        </li>
      ))}
    </ul>
  );
}

export function HomePage() {
  useReveal();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  return (
    <main id="main" className="desk">
      <Cover />
      <div className="file">
        <Sheet
          id="work"
          lead="Things I’ve built and am building. Open a card for the details."
        >
          <IndexCards />
        </Sheet>
        <Sheet id="experience" lead="Where I’ve worked, and where I study.">
          <Experience />
        </Sheet>
        <Sheet id="skills" lead="Languages, frameworks and tools I work with.">
          <Skills />
        </Sheet>
        <Sheet
          id="beyond"
          lead="Clubs, leadership and the night sky — the things that don’t fit on a commit graph."
        >
          <Beyond />
        </Sheet>
        <Sheet id="github">
          <GraphPaper />
        </Sheet>
        <Sheet id="contact">
          <Envelope />
        </Sheet>
      </div>
    </main>
  );
}
