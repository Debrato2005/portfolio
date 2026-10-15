import { useEffect, useRef } from 'react';
let start: number | undefined;
let complete = false;
export function Name() {
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const spans = element.current?.querySelectorAll('[data-word]');
    if (
      !spans ||
      complete ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const names = ['DEBRATO', 'GHOSH'];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    start ??= performance.now();
    let frame = 0;
    function draw(time: number) {
      const progress = Math.min(1, (time - (start ?? time)) / 1000);
      spans?.forEach((span, index) => {
        const name = names[index] ?? '';
        const resolved = Math.floor(progress * name.length);
        span.textContent = Array.from(name, (letter, position) =>
          position < resolved
            ? letter
            : (alphabet[
                (position * 11 + Math.floor(time / 55)) % alphabet.length
              ] ?? letter),
        ).join('');
      });
      if (progress < 1) frame = requestAnimationFrame(draw);
      else complete = true;
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <h1 tabIndex={-1}>
      <span className="sr-only">DEBRATO GHOSH</span>
      <span aria-hidden="true" data-scramble ref={element}>
        <span className="name-word" data-name="DEBRATO">
          <span data-word>DEBRATO</span>
        </span>{' '}
        <span className="name-word surname" data-name="GHOSH">
          <span data-word>GHOSH</span>
        </span>
      </span>
    </h1>
  );
}
