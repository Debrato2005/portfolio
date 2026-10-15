import { useCallback, useEffect, useRef, useState } from 'react';
import { quotes } from './content';
import { useReducedMotion } from './useReducedMotion';
export function Quotes() {
  const [index, setIndex] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const panel = useRef<HTMLDivElement>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fading, setFading] = useState(false);
  const changeQuote = useCallback(
    (step: number) => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      const update = () => {
        setIndex((value) => (value + step + quotes.length) % quotes.length);
        setHasChanged(true);
        setFading(false);
      };
      if (reducedMotion) {
        update();
        return;
      }
      setFading(true);
      transitionTimer.current = setTimeout(update, 180);
    },
    [reducedMotion],
  );
  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (!playing || reducedMotion) return;
    let visible = false;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
    });
    if (panel.current) observer.observe(panel.current);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden) {
        changeQuote(1);
      }
    }, 8000);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      clearInterval(timer);
      media.removeEventListener('change', stop);
    };
  }, [playing, reducedMotion, changeQuote]);
  const quote = quotes[index] ?? quotes[0];
  return (
    <div
      className="quotes"
      ref={panel}
      onMouseEnter={() => setPlaying(false)}
      onFocus={() => setPlaying(false)}
    >
      <div className="quote-stack">
        {quotes.map((item) => (
          <blockquote
            className="quote-reserve"
            aria-hidden="true"
            key={item.author}
          >
            <p>“{item.text}”</p>
            <cite>{item.author}</cite>
          </blockquote>
        ))}
        <blockquote
          key={index}
          className="quote-text"
          data-transition={hasChanged}
          data-fading={fading}
        >
          <p>“{quote.text}”</p>
          <cite>
            <a href={quote.source}>{quote.author}</a>
          </cite>
        </blockquote>
      </div>
      <div className="quote-controls">
        <button
          className="quiet-button"
          aria-label="Previous quote"
          onClick={() => {
            setPlaying(false);
            changeQuote(-1);
          }}
        >
          Previous
        </button>
        <span className="quote-position">
          {index + 1} / {quotes.length}
        </span>
        <button
          className="quiet-button"
          aria-label="Next quote"
          onClick={() => {
            setPlaying(false);
            changeQuote(1);
          }}
        >
          Next
        </button>
        <button
          className="quiet-button"
          aria-label={
            playing && !reducedMotion ? 'Pause quotes' : 'Play quotes'
          }
          disabled={reducedMotion}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing && !reducedMotion ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
