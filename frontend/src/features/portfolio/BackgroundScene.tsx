import { useEffect, useRef } from 'react';
import {
  sceneArtwork,
  sceneDefaults,
  type SceneSettings,
} from './sceneArtwork';
import '../../styles/background-scene.css';

type Props = { settings?: Partial<SceneSettings> };

/** Decorative hero artwork. Global passive input lets every foreground control keep its events. */
export function BackgroundScene({ settings }: Props) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop: (() => void) | undefined;
    let generation = 0;
    function setup() {
      const request = ++generation;
      stop?.();
      stop = undefined;
      element!.dataset.renderer = 'static';
      element!.dataset.animating = 'false';
      if (motion.matches) return;
      // Reduced motion never allocates a WebGL context or imports the rendering code.
      void import('./sceneRenderer')
        .then(({ createSceneRenderer }) => {
          if (request !== generation) return;
          const canvas = document.createElement('canvas');
          element!.append(canvas);
          try {
            const cleanup = createSceneRenderer(canvas, element!, {
              ...sceneDefaults,
              ...settings,
            });
            stop = () => {
              cleanup();
              canvas.remove();
            };
          } catch {
            canvas.remove();
            element!.dataset.renderer = 'static';
          }
        })
        .catch(() => {
          if (request === generation) element!.dataset.renderer = 'static';
        });
    }
    setup();
    motion.addEventListener('change', setup);
    return () => {
      generation++;
      motion.removeEventListener('change', setup);
      stop?.();
    };
  }, [settings]);
  return (
    <div
      ref={host}
      className="hero-scene"
      aria-hidden="true"
      data-renderer="static"
    >
      {(['light', 'dark'] as const).map((theme) => (
        <img
          key={theme}
          data-theme={theme}
          src={sceneArtwork[theme].sketch}
          width={1672}
          height={941}
          alt=""
          decoding="async"
        />
      ))}
    </div>
  );
}
