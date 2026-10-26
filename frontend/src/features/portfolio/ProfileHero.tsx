import { Link } from 'react-router';
import { Icon } from '../../components/ui/Icon';
import { links } from '../../lib/links';
import { BackgroundScene } from './BackgroundScene';
import { experience, profile } from './content';
import { LiveClock, ShapePortrait } from './Expressive';
import { editorialCovers } from './illustrations';
import { Name } from './Name';
import { usePageViews } from './usePageViews';

/**
 * Banner-and-profile header after Anurag's portfolio, with a taped collage
 * after Garvit's: the ink-painted sky sits in a rounded banner, the portrait
 * overlaps its edge, and real links are pinned beside the introduction.
 */
export function ProfileHero() {
  const views = usePageViews();
  const now = experience[0];
  return (
    <section className="profile-hero" aria-label="Introduction">
      <div className="hero">
        <BackgroundScene />
        <p className="hero-note" aria-hidden="true">
          Same sky,
          <br />
          bigger possibilities
          <svg viewBox="0 0 120 60">
            <path d="M6 8c30 4 60 18 82 40m0 0-3-15m3 15-15-2" />
          </svg>
        </p>
        <p className="hero-hint" aria-hidden="true">
          drag across the sketch to paint it in
        </p>
      </div>
      <div className="profile-row">
        <ShapePortrait />
        <div className="profile-id">
          <Name />
          <p className="profile-role">
            Software engineer, researcher and builder
          </p>
          <ul className="profile-meta">
            <li>
              <Icon name="map-pin" />
              {profile.location}
            </li>
            <li className="hero-clock">
              <LiveClock />
            </li>
            {views.count !== null && (
              <li>{views.count.toLocaleString()} views</li>
            )}
          </ul>
        </div>
        <div className="profile-actions">
          <p className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            {profile.status}
          </p>
          <div className="hero-actions">
            <a className="primary-link ripple" href={links.email}>
              Let's talk <Icon name="arrow-up-right" />
            </a>
            <a
              className="outline-link ripple"
              href={links.resume}
              download="Debrato-Ghosh-Resume.pdf"
            >
              Resume <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-intro">
          <p className="intro-text">
            I build at the intersection of software, research and real-world
            problems: <span className="kw">backend systems</span> with{' '}
            <span className="kw">FastAPI</span> and{' '}
            <span className="kw">PostgreSQL</span>,{' '}
            <span className="kw">computer vision</span> research, and a growing
            interest in <span className="kw">security</span>.
          </p>
          <p className="intro-text">
            Off-screen I point a camera at the{' '}
            <span className="kw">night sky</span>.
          </p>
          <div className="socials">
            <span className="hand" aria-hidden="true">
              socials ➔
            </span>
            <a className="ripple" href={links.github}>
              <Icon name="github-logo" />
              github · Debrato2005
            </a>
            <a className="ripple" href={links.linkedin}>
              <Icon name="linkedin-logo" />
              linkedin
            </a>
            <a className="ripple" href={links.email}>
              <Icon name="envelope-simple" />
              say hello
            </a>
          </div>
        </div>
        <div className="hero-collage">
          <Link className="polaroid" to="/photography" data-tilt="left">
            <span className="tape" aria-hidden="true" />
            <img
              src={editorialCovers.nightSky}
              width={768}
              height={512}
              alt=""
              loading="lazy"
            />
            <span className="polaroid-caption">night sky ✎</span>
            <span className="sr-only">Photography collections</span>
          </Link>
          <a className="sticky-note" href="#experience">
            <span className="hand">now</span>
            <strong>{now.role}</strong>
            <span>{now.company}</span>
          </a>
          <Link className="polaroid" to="/blogs" data-tilt="right">
            <span className="tape" aria-hidden="true" />
            <img
              src={editorialCovers.everydayLight}
              width={768}
              height={512}
              alt=""
              loading="lazy"
            />
            <span className="polaroid-caption">latest note</span>
            <span className="sr-only">Writing archive</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
