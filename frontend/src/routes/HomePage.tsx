import { links } from '../lib/links';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Achievements } from '../features/portfolio/Achievements';
import { Projects } from '../features/portfolio/Projects';
import { GitHubTabs } from '../features/portfolio/GitHubTabs';
import { VisitorCounter } from '../features/portfolio/VisitorCounter';
import { Quotes } from '../features/portfolio/Quotes';
import {
  articles,
  experience,
  education,
  profile,
  skillGroups,
} from '../features/portfolio/content';
import { SectionIndex } from '../features/portfolio/SectionIndex';
import { ProfileHero } from '../features/portfolio/ProfileHero';
import { EdgeSprig } from '../features/portfolio/Botanicals';
import { PhotographyStrip } from '../features/portfolio/Photography';
import { morph } from '../features/portfolio/shapes';
import type { ShapeName } from '../features/portfolio/shapes';
import type { ReactNode } from 'react';
import { Icon } from '../components/ui/Icon';

function Section({
  id,
  number,
  title,
  glyph,
  children,
  aside,
  note,
  className = '',
}: {
  id: string;
  number: string;
  title: string;
  glyph: ShapeName;
  children: ReactNode;
  aside?: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`portfolio-section ${className}`.trim()}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <span
          className="section-glyph"
          aria-hidden="true"
          style={morph(glyph, 'circle')}
        />
        <h2 id={`${id}-title`} tabIndex={-1}>
          <span className="section-number">{number}</span>
          {title}
        </h2>
        {aside && <div className="section-aside">{aside}</div>}
      </div>
      {note && <div className="section-annotation">{note}</div>}
      <div className="section-body">{children}</div>
    </section>
  );
}
export function HomePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target?.classList.contains('project-card')) {
        const details = target.querySelector<HTMLDetailsElement>('details');
        if (details) details.open = true;
      }
      target?.scrollIntoView();
      target
        ?.querySelector<HTMLElement>('h2, h3')
        ?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document
        .querySelector<HTMLElement>('main h1')
        ?.focus({ preventScroll: true });
    }
  }, [hash]);
  return (
    <main id="main" className="portfolio-home">
      <SectionIndex />
      <div className="botanic-edges" aria-hidden="true">
        <EdgeSprig seed={3} side="right" top="14%" />
        <EdgeSprig seed={11} side="left" top="31%" />
        <EdgeSprig seed={7} side="right" top="44%" />
        <EdgeSprig seed={19} side="left" top="63%" />
        <EdgeSprig seed={5} side="right" top="78%" />
      </div>
      <div className="portfolio-content">
        <ProfileHero />
        <Section
          id="about"
          number="01"
          title="About"
          glyph="cookie9"
          note={
            <p className="margin-note">
              A curious builder and lifelong learner.
            </p>
          }
        >
          <div className="about-layout">
            <div className="about-card about-intro">
              <p className="prose about-lead">
                Hey, I'm Debrato Ghosh — a developer, researcher and builder who
                enjoys turning questions into useful software.
              </p>
              <p className="prose">
                I study Information Technology at Manipal Institute of
                Technology. My interests move between machine learning, backend
                engineering, photography and astronomy.
              </p>
              <ul className="snapshot" aria-label="Developer snapshot">
                <li>Building meaningful systems</li>
                <li>Exploring AI and computer vision</li>
                <li>Learning through small experiments</li>
                <li>Open to thoughtful collaborations</li>
              </ul>
            </div>
            <div className="about-card about-focus" data-tone="primary">
              <h3>Focus</h3>
              <ul className="chip-row">
                {profile.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>Daily tools: {profile.tools.join(', ')}.</p>
            </div>
            <div className="about-card about-off" data-tone="tertiary">
              <h3>Off-screen</h3>
              <ul className="chip-row">
                {profile.offScreen.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="about-card about-speaks" data-tone="secondary">
              <h3>Speaks</h3>
              <p>{profile.spokenLanguages.join(' · ')}</p>
            </div>
          </div>
        </Section>
        <Section
          id="projects"
          number="02"
          title="Projects"
          glyph="flower"
          note={
            <p className="margin-note">
              Things I’ve built, and what I learned breaking them.
            </p>
          }
        >
          <Projects />
        </Section>
        <Section
          id="experience"
          number="03"
          title="Experience"
          glyph="pentagon"
          note={<p className="margin-note">Where I learned the most.</p>}
        >
          <ol className="experience-grid">
            {experience.map((item) => (
              <li key={item.company}>
                <article>
                  <time>{item.period}</time>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <p className="prose">{item.summary}</p>
                </article>
              </li>
            ))}
            <li>
              <article>
                <time>{education.period}</time>
                <h3>{education.degree}</h3>
                <p className="experience-company">{education.institution}</p>
                <p className="prose">{education.summary}</p>
              </article>
            </li>
            <li className="experience-next">
              <article>
                <time>Next</time>
                <h3>What's next?</h3>
                <p className="experience-company">{profile.status}.</p>
                <a className="text-button ripple" href={links.email}>
                  Start a conversation <Icon name="arrow-up-right" />
                </a>
              </article>
            </li>
          </ol>
        </Section>
        <Section
          id="hackathons"
          number="04"
          title="Hackathons"
          glyph="sunny"
          note={
            <p className="margin-note">
              Progress through ideas, people and late nights.
            </p>
          }
        >
          <Achievements />
        </Section>
        <Section
          id="github"
          number="05"
          title="In Code / GitHub"
          glyph="clover8"
          note={<p className="margin-note">Commits, one square at a time.</p>}
          aside={
            <a className="text-button ripple" href={links.github}>
              View GitHub <Icon name="arrow-up-right" />
            </a>
          }
        >
          <GitHubTabs />
        </Section>
        <Section
          id="skills"
          number="06"
          title="Skills"
          glyph="clover4"
          note={<p className="margin-note">Always learning more →</p>}
        >
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
          glyph="triangle"
          aside={
            <Link className="text-button ripple" to="/blogs">
              View writing <Icon name="arrow-right" />
            </Link>
          }
          note={
            <p className="margin-note">
              Notes on the ideas that connect my work.
            </p>
          }
        >
          <article className="thought-card">
            <Link
              className="thought-cover"
              to="/blogs"
              aria-label="Open writing archive"
            >
              <img
                src={articles[0].illustratedCover}
                width={768}
                height={512}
                alt=""
                loading="lazy"
              />
            </Link>
            <h3>
              <Link to="/blogs">
                {articles[0].title}
                <Icon name="arrow-right" />
              </Link>
            </h3>
            <p className="prose">
              Writing about the questions that connect my interests.
            </p>
            <a className="text-button ripple" href={links.article}>
              Read on Bear Blog <Icon name="arrow-up-right" />
            </a>
          </article>
        </Section>
        <Section
          id="photography"
          number="08"
          title="Photography"
          glyph="cookie12"
          aside={
            <Link
              className="text-button ripple"
              to="/photography"
              aria-label="Explore photography"
            >
              View gallery <Icon name="arrow-right" />
            </Link>
          }
        >
          <div className="photography-layout">
            <div className="photography-preview">
              <PhotographyStrip
                note={
                  <p className="margin-note">
                    Capturing the moments between projects.
                  </p>
                }
              />
            </div>
          </div>
        </Section>
        <Section
          id="contact"
          number="09"
          title="Contact"
          glyph="cookie6"
          className="contact-section"
          note={
            <p className="contact-intro">Let's build something thoughtful.</p>
          }
        >
          <div className="contact-art" aria-hidden="true">
            <span style={morph('sunny', 'cookie12')} />
            <span style={morph('flower', 'clover4')} />
            <span style={morph('clover4', 'circle')} />
          </div>
          <div className="contact-layout">
            <div className="contact-links">
              <a className="ripple" href={links.email}>
                <Icon name="envelope-simple" />
                Mail <Icon name="arrow-up-right" />
              </a>
              <a className="ripple" href={links.github}>
                <Icon name="github-logo" />
                GitHub <Icon name="arrow-up-right" />
              </a>
              <a className="ripple" href={links.linkedin}>
                <Icon name="linkedin-logo" />
                LinkedIn <Icon name="arrow-up-right" />
              </a>
              <a className="ripple" href={links.blog}>
                Writing <Icon name="arrow-up-right" />
              </a>
              <a
                className="ripple"
                href={links.resume}
                download="Debrato-Ghosh-Resume.pdf"
              >
                Resume <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
        </Section>
        <div className="closing">
          <Quotes />
          <VisitorCounter />
          <p className="margin-note">
            The same curiosity under different skies.
          </p>
        </div>
      </div>
    </main>
  );
}
