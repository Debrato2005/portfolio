import { useNavigate } from 'react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { sections } from './content';
import { Icon } from '../../components/ui/Icon';
/**
 * Wide screens get a floating rail whose active pill springs between sections;
 * narrower screens get a bottom floating toolbar with a native section menu.
 */
export function SectionIndex() {
  const [active, setActive] = useState('about');
  const [placement, setPlacement] = useState<'selector' | 'rail'>('selector');
  const [indicator, setIndicator] = useState({ y: 0, height: 0 });
  const index = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const measure = () => {
      const rootSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      setPlacement(
        innerWidth >= 1200 && rootSize <= 18 && innerHeight >= 600
          ? 'rail'
          : 'selector',
      );
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
      const activationLine = Math.min(160, window.innerHeight * 0.25);
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
  useLayoutEffect(() => {
    const link = index.current?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (link) setIndicator({ y: link.offsetTop, height: link.offsetHeight });
  }, [active, placement]);
  return (
    <>
      <div className="floating-toolbar" hidden={placement !== 'selector'}>
        <label className="mobile-section-menu">
          <span>On this page</span>
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
          <Icon name="caret-down" />
        </label>
        <a className="icon-button ripple toolbar-top" href="#main">
          <Icon name="arrow-up" />
          <span className="sr-only">Back to top</span>
        </a>
      </div>
      <nav
        ref={index}
        className="section-index"
        data-placement={placement}
        aria-label="Section index"
        hidden={placement === 'selector'}
        style={
          {
            '--indicator-y': `${indicator.y}px`,
            '--indicator-h': `${indicator.height}px`,
          } as CSSProperties
        }
      >
        <span className="rail-indicator" aria-hidden="true" />
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
