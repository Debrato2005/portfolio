import { useEffect, useState } from 'react';
import { links } from '../../lib/links';
import { profile } from '../portfolio/content';

const address = links.email.replace('mailto:', '');

/**
 * Contact as an envelope: the flap opens when it scrolls into view and a
 * letter slides out with every way to reach me.
 */
export function Envelope() {
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(0), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(Date.now());
    } catch {
      window.location.href = links.email;
    }
  };
  return (
    <div className="envelope" data-reveal>
      <div className="envelope-back" aria-hidden="true" />
      <div className="letter">
        <p className="letter-hand">Say hello —</p>
        <p className="letter-body">
          {profile.status}. If you’re working on backend systems, computer
          vision or research, write to me.
        </p>
        <div className="letter-email">
          <a href={links.email}>{address}</a>
          <button
            type="button"
            className="tape-button"
            onClick={() => void copy()}
          >
            {copied ? 'Copied ✓' : 'Copy address'}
          </button>
        </div>
        <ul className="letter-links">
          <li>
            <a href={links.github}>GitHub ↗</a>
          </li>
          <li>
            <a href={links.linkedin}>LinkedIn ↗</a>
          </li>
          <li>
            <a href={links.x}>X ↗</a>
          </li>
          <li>
            <a href={links.resume} download="Debrato-Ghosh-Resume.pdf">
              Resume PDF ↓
            </a>
          </li>
        </ul>
        <span
          className="postmark-stamp"
          data-show={copied ? 'true' : 'false'}
          key={copied}
          aria-hidden="true"
        >
          Copied
        </span>
        <span className="visually-hidden" aria-live="polite">
          {copied ? 'Email address copied' : ''}
        </span>
      </div>
      <div className="envelope-front" aria-hidden="true">
        <span className="envelope-stamp">
          <svg viewBox="0 0 60 72">
            <circle cx="30" cy="30" r="16" />
            <path d="M8 58c10-8 18-10 22-6s12 2 22-6" />
            <circle cx="12" cy="14" r="1.4" />
            <circle cx="48" cy="12" r="1.2" />
            <circle cx="50" cy="40" r="1" />
          </svg>
        </span>
        <span className="envelope-mark">
          <span>Manipal</span>
          <span>India</span>
        </span>
      </div>
      <div className="envelope-flap" aria-hidden="true" />
    </div>
  );
}
