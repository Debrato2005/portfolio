import { links } from '../lib/links';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Achievements } from '../features/portfolio/Achievements';
import { Name } from '../features/portfolio/Name';
import { Projects } from '../features/portfolio/Projects';
import { EngineeringTimeline } from '../features/portfolio/EngineeringTimeline';
import { ContributionSection } from '../features/portfolio/ContributionSection';
import { VisitorCounter } from '../features/portfolio/VisitorCounter';
import { Quotes } from '../features/portfolio/Quotes';
import {
  experience,
  education,
  skillGroups,
} from '../features/portfolio/content';
import { SectionIndex } from '../features/portfolio/SectionIndex';
import { BackgroundScene } from '../features/portfolio/BackgroundScene';
import { PhotographyStrip } from '../features/portfolio/Photography';
import type { ReactNode } from 'react';
import { Icon } from '../components/ui/Icon';

function Section({
  id,
  number,
  title,
  children,
  aside,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section
      className="portfolio-section"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <h2 id={`${id}-title`} tabIndex={-1}>
          <span>{number}.</span> {title}
        </h2>
        <span className="section-line" />
        {aside}
      </div>
      {children}
    </section>
  );
}
export function HomePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const section = document.getElementById(hash.slice(1));
      section?.scrollIntoView();
      section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document
        .querySelector<HTMLElement>('main h1')
        ?.focus({ preventScroll: true });
    }
  }, [hash]);
  return (
    <main id="main" className="portfolio-home">
      <BackgroundScene />
      <div className="portfolio-content">
        <section className="hero" aria-label="Introduction">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer · Researcher · Builder</p>
            <Name />
            <p className="hero-description">
              I build at the intersection of software, research and real-world
              problems. Exploring AI, backend systems and the sky beyond.
            </p>
            <ul className="hero-meta">
              <li>
                <Icon name="map-pin" />
                Based in India
              </li>
              <li>
                <Icon name="graduation-cap" />
                IT student at MIT, Manipal
              </li>
              <li>
                <Icon name="coffee" />
                Curious by default
              </li>
            </ul>
            <div className="hero-actions">
              <a className="primary-link" href={links.email}>
                Let's talk <Icon name="arrow-up-right" />
              </a>
              <a className="outline-link" href="#projects">
                View projects <Icon name="arrow-right" />
              </a>
            </div>
          </div>
          <p className="margin-note hero-note">
            Better products.
            <br />
            Brighter
            <br />
            tomorrows.
          </p>
          <SectionIndex />
        </section>
        <Section id="about" number="01" title="About">
          <div className="about-layout">
            <p className="margin-note">
              Curious builder.
              <br />
              Lifelong learner.
            </p>
            <div>
              <p>
                Hey, I'm Debrato Ghosh — a developer, researcher and builder who
                enjoys turning questions into useful software.
              </p>
              <p>
                I study Information Technology at Manipal Institute of
                Technology. My interests move between machine learning, backend
                engineering, photography and astronomy.
              </p>
            </div>
            <aside className="snapshot">
              <h3>Developer snapshot</h3>
              <ul>
                <li>Building meaningful systems</li>
                <li>Exploring AI and computer vision</li>
                <li>Learning through small experiments</li>
                <li>Open to thoughtful collaborations</li>
              </ul>
              <Icon name="laptop" />
            </aside>
          </div>
        </Section>
        <Section
          id="projects"
          number="02"
          title="Projects"
          aside={<Link to="/projects">View all projects</Link>}
        >
          <Projects />
        </Section>
        <Section id="experience" number="03" title="Experience">
          <div className="experience-grid">
            {experience.map((item) => (
              <article key={item.company}>
                <time>{item.period}</time>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <p>{item.summary}</p>
              </article>
            ))}
            <article>
              <time>{education.period}</time>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <p>{education.summary}</p>
            </article>
          </div>
        </Section>
        <Section
          id="hackathons"
          number="04"
          title="Hackathons"
          aside={<Link to="/hackathons">View all events</Link>}
        >
          <Achievements />
        </Section>
        <Section
          id="github"
          number="05"
          title="In Code / GitHub"
          aside={<a href={links.github}>View GitHub</a>}
        >
          <ContributionSection />
          <EngineeringTimeline />
        </Section>
        <Section id="skills" number="06" title="Skills">
          <div className="skills-grid">
            {skillGroups.map(([title, ...items]) => (
              <div key={title}>
                <h3>{title}</h3>
                <ul className="tag-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        <Section
          id="thoughts"
          number="07"
          title="Train of Thought"
          aside={<Link to="/thoughts">View all posts</Link>}
        >
          <div className="thought-layout">
            <p className="margin-note">
              Thoughts.
              <br />
              Notes. Ideas.
            </p>
            <article className="thought-card">
              <p className="eyebrow">Across disciplines</p>
              <h3>
                <Link to="/thoughts/the-next-breakthrough-is-in-another-field">
                  The next breakthrough is in another field
                  <Icon name="arrow-up-right" />
                </Link>
              </h3>
              <p>Writing about the questions that connect my interests.</p>
              <a href={links.article}>Read on Bear Blog</a>
            </article>
          </div>
        </Section>
        <Section
          id="photography"
          number="08"
          title="Photography"
          aside={<Link to="/photography">View gallery</Link>}
        >
          <div className="photography-layout">
            <p className="margin-note">
              Capturing
              <br />
              little moments.
            </p>
            <div className="photography-preview">
              <PhotographyStrip
                action={
                  <Link className="outline-link" to="/photography">
                    <Icon name="camera" />
                    <span>Explore photography</span>
                  </Link>
                }
              />
            </div>
          </div>
        </Section>
        <Section id="contact" number="09" title="Contact">
          <div className="contact-layout">
            <p>Let's build something thoughtful.</p>
            <div className="contact-links">
              <a href={links.github}>
                <Icon name="github-logo" />
                GitHub <Icon name="arrow-up-right" />
              </a>
              <a href={links.linkedin}>
                <Icon name="linkedin-logo" />
                LinkedIn <Icon name="arrow-up-right" />
              </a>
              <a href={links.email}>
                <Icon name="envelope-simple" />
                Mail <Icon name="arrow-up-right" />
              </a>
              <a href={links.blog}>
                Writing <Icon name="arrow-up-right" />
              </a>
              <a href={links.resume} download="Debrato-Ghosh-Resume.pdf">
                Resume <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
        </Section>
        <div className="closing">
          <Quotes />
          <VisitorCounter />
          <p className="margin-note">
            Same curiosity.
            <br />
            Different skies.
          </p>
        </div>
      </div>
    </main>
  );
}
