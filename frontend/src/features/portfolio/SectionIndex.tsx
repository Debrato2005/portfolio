import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { sections } from './content';
export function SectionIndex() {
  const [active, setActive] = useState('about');
  const navigate = useNavigate();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string = sections[0][0];
      const activationLine = window.innerHeight * 0.4;
      for (const [id] of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= activationLine)
          current = id;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      )
        current = 'contact';
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return (
    <>
      <label className="mobile-section-menu">
        On this page
        <select
          aria-label="Jump to section"
          value={active}
          onChange={(event) => navigate(`/#${event.target.value}`)}
        >
          {sections.map(([id, title]) => (
            <option value={id} key={id}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <nav className="section-index" aria-label="Section index">
        <p>Index</p>
        {sections.map(([id, title]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={title}
            aria-current={active === id ? 'location' : undefined}
          >
            {title}
          </a>
        ))}
      </nav>
    </>
  );
}
