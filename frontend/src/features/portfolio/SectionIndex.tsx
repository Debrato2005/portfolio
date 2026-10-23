import { useNavigate } from 'react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sections } from './content';
export function SectionIndex() {
  const [active, setActive] = useState('about');
  const [placement, setPlacement] = useState<'selector' | 'hero' | 'fixed'>(
    'selector',
  );
  const index = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const nav = index.current;
    if (!nav) return;
    const measure = () => {
      const rootSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const contentWidth = Math.min(innerWidth - 32, 760);
      const outerGutter = (innerWidth - contentWidth) / 2;
      const fixedIndexWidth = rootSize * 13;
      if (outerGutter >= fixedIndexWidth + 32) setPlacement('fixed');
      else if (innerWidth >= 880 && rootSize <= 18) setPlacement('hero');
      else setPlacement('selector');
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string = sections[0][0];
      const activationLine = Math.min(120, window.innerHeight * 0.2);
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
      <label className="mobile-section-menu" hidden={placement !== 'selector'}>
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
      <nav
        ref={index}
        className="section-index"
        data-placement={placement}
        aria-label="Section index"
        hidden={placement === 'selector'}
      >
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
