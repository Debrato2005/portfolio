import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Item {
  value: number;
  label: string;
  decimals?: number | undefined;
  suffix?: string | undefined;
}

/** A number that rolls up from zero the first time it is seen. */
function Count({ value, decimals = 0, suffix = '' }: Omit<Item, 'label'>) {
  const node = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    const el = node.current;
    if (!el || reduced || !('IntersectionObserver' in window)) {
      setShown(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        setShown(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);
  return (
    <span ref={node} aria-hidden="true">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Tally({ items }: { items: readonly Item[] }) {
  return (
    <dl className="tally">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            <Count
              value={item.value}
              decimals={item.decimals}
              suffix={item.suffix}
            />
            <span className="visually-hidden">
              {item.value.toFixed(item.decimals ?? 0)}
              {item.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
