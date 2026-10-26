import { Popover } from '@base-ui/react/popover';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../../components/ui/Icon';
import { morph, shape } from './shapes';
import type { ShapeName } from './shapes';
import { skies } from './Theme';
import { celebrate } from './celebrate';
import type { Sky } from './Theme';

const portraitShapes: ShapeName[] = [
  'cookie12',
  'clover4',
  'flower',
  'sunny',
  'pentagon',
  'cookie6',
  'squircle',
];
/** The public GitHub portrait in an M3 shape that morphs on every press. */
export function ShapePortrait() {
  const [step, setStep] = useState(0);
  const current = portraitShapes[step % portraitShapes.length] ?? 'cookie12';
  return (
    <button
      type="button"
      className="shape-portrait"
      aria-label="Morph the portrait shape"
      title="Press to morph"
      style={
        {
          '--portrait-shape': shape(current),
          '--portrait-turn': `${step * 40}deg`,
        } as CSSProperties
      }
      onClick={(event) => {
        setStep((value) => value + 1);
        // Every sixth press is a small celebration.
        if ((step + 1) % 6 === 0) {
          const bounds = event.currentTarget.getBoundingClientRect();
          celebrate({
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
          });
        }
      }}
    >
      <span className="portrait-halo" aria-hidden="true" />
      <span className="portrait-frame">
        <img
          src="/images/debrato-avatar.jpg"
          width={320}
          height={320}
          alt="Debrato Ghosh"
          decoding="async"
        />
      </span>
    </button>
  );
}

/** Debrato's local time in Manipal, refreshed each minute. */
export function LiveClock() {
  const format = () =>
    new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <span className="clock-dot" aria-hidden="true" />
      <span>
        <span className="sr-only">Local time in Manipal: </span>
        {time} IST
      </span>
    </>
  );
}

/** Material 3 Expressive loading indicator: a polygon that morphs while it turns. */
export function ShapeLoader({ label }: { label: string }) {
  return (
    <span
      className="shape-loader"
      role="progressbar"
      aria-label={label}
      style={
        {
          '--s0': shape('cookie9'),
          '--s1': shape('pentagon'),
          '--s2': shape('clover4'),
          '--s3': shape('sunny'),
        } as CSSProperties
      }
    />
  );
}

/** A wavy active indicator over a flat track, following page scroll. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const range =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      bar.current?.style.setProperty(
        '--progress',
        Math.min(1, Math.max(0, window.scrollY / range)).toFixed(4),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  const wave = Array.from(
    { length: 41 },
    (_, index) =>
      `${index === 0 ? 'M' : 'L'}${index * 10} ${(5 + 3 * Math.sin((index / 40) * Math.PI * 16)).toFixed(2)}`,
  ).join(' ');
  return (
    <div className="scroll-progress" ref={bar} aria-hidden="true">
      <span className="progress-track" />
      <span className="progress-active">
        <svg viewBox="0 0 200 10" preserveAspectRatio="none">
          <path d={wave} />
        </svg>
      </span>
    </div>
  );
}

/** Dynamic color: four generated skies, or any seed color the visitor picks. */
export function SkyMenu({
  sky,
  chooseSky,
}: {
  sky: Sky;
  chooseSky: (value: Sky, origin?: { x: number; y: number } | null) => void;
}) {
  const [custom, setCustom] = useState<string>(
    sky.startsWith('#') ? sky : '#4a5bd8',
  );
  const origin = (element: Element) => {
    const bounds = element.getBoundingClientRect();
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    };
  };
  return (
    <Popover.Root
      onOpenChange={(open) => {
        // Warm the color engine so a custom seed applies without a pause.
        if (open) void import('@material/material-color-utilities');
      }}
    >
      <Popover.Trigger
        className="icon-button ripple sky-trigger"
        aria-label="Choose a color sky"
      >
        <Icon name="palette" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={10} align="end">
          <Popover.Popup className="sky-popup">
            <Popover.Title className="sky-title">Pick a sky</Popover.Title>
            <Popover.Description className="sky-description">
              The whole page re-tones from one seed color.
            </Popover.Description>
            <div className="sky-options" role="group" aria-label="Color skies">
              {skies.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="sky-option ripple"
                  aria-pressed={sky === item.id}
                  style={
                    {
                      '--sw-1': item.swatch[0],
                      '--sw-2': item.swatch[1],
                      '--sw-3': item.swatch[2],
                      ...morph('circle', 'cookie9'),
                    } as CSSProperties
                  }
                  onClick={(event) =>
                    chooseSky(item.id, origin(event.currentTarget))
                  }
                >
                  <span className="sky-swatch" aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <label className="sky-custom">
              <input
                type="color"
                value={custom}
                aria-describedby="sky-custom-note"
                onChange={(event) => {
                  setCustom(event.target.value);
                  chooseSky(event.target.value as Sky, null);
                }}
              />
              <span>
                Any color
                <small id="sky-custom-note">
                  {sky.startsWith('#') ? `Seed ${sky}` : 'Choose your own seed'}
                </small>
              </span>
            </label>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
