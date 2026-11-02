import { useEffect, useState } from 'react';
import { links } from '../../lib/links';
import { useActiveSection, useManipalTime, useTheme } from './hooks';
import { goTo, sections } from './sections';

const ids = sections.map((section) => section.id);

/** A slim top bar plus divider tabs that stick out of the file's edge. */
export function Masthead() {
  const active = useActiveSection(ids);
  const time = useManipalTime();
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);

  return (
    <>
      <header className="topbar">
        <a
          className="topbar-name"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.replaceState(null, '', location.pathname);
          }}
        >
          <span className="topbar-seal" aria-hidden="true">
            DG
          </span>
          Debrato Ghosh
        </a>
        <div className="topbar-tools">
          <span className="topbar-clock" title="Local time in Manipal">
            Manipal · <time>{time}</time> IST
          </span>
          <button
            type="button"
            className="lamp"
            aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} theme`}
            data-theme={theme}
            onClick={(event) => {
              const box = event.currentTarget.getBoundingClientRect();
              toggle({
                x: box.left + box.width / 2,
                y: box.top + box.height / 2,
              });
            }}
          >
            <span>Day</span>
            <span>Night</span>
          </button>
          <a
            className="topbar-resume"
            href={links.resume}
            download="Debrato-Ghosh-Resume.pdf"
          >
            Resume ↓
          </a>
          <button
            type="button"
            className="contents-button"
            aria-expanded={menu}
            aria-controls="contents-menu"
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? 'Close' : 'Contents'}
          </button>
        </div>
        <nav
          id="contents-menu"
          className="contents-menu"
          aria-label="Contents"
          data-open={menu}
        >
          <ol>
            {sections.map((section, index) => (
              <li key={section.id} data-tone={section.tone}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    setMenu(false);
                    goTo(section.id);
                  }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>
      <nav className="tab-rail" aria-label="Sections">
        <ol>
          {sections.map((section) => (
            <li key={section.id} data-tone={section.tone}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(section.id);
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
