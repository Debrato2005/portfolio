import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
type Theme = 'light' | 'dark';
/** Preset seeds have generated tokens in tokens.css; a custom seed is computed on demand. */
export const skies = [
  {
    id: 'twilight',
    label: 'Twilight',
    seed: '#4a5bd8',
    swatch: ['#2f45e5', '#d2ccff', '#94387d'],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    seed: '#0f9d7a',
    swatch: ['#006850', '#4cfcdf', '#00647a'],
  },
  {
    id: 'nebula',
    label: 'Nebula',
    seed: '#b03a8c',
    swatch: ['#a61c82', '#ffbcf9', '#3355b7'],
  },
  {
    id: 'golden-hour',
    label: 'Golden hour',
    seed: '#d98a00',
    swatch: ['#825100', '#ffc96b', '#655d00'],
  },
] as const;
export type Sky = (typeof skies)[number]['id'] | `#${string}`;
type Origin = { x: number; y: number };

function read<T extends string>(
  key: string,
  valid: (value: string) => boolean,
) {
  try {
    const saved = localStorage.getItem(key);
    if (saved && valid(saved)) return saved as T;
  } catch {
    /* Keep controls usable without storage. */
  }
  return null;
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Retain the session choice. */
  }
}
const isSky = (value: string) =>
  skies.some((sky) => sky.id === value) || /^#[0-9a-f]{6}$/i.test(value);

const roles = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'surface',
  'onSurface',
  'onSurfaceVariant',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outline',
  'outlineVariant',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
] as const;
let customRequest = 0;
async function applyCustomSeed(seed: string, theme: Theme) {
  const request = ++customRequest;
  const {
    Hct,
    MaterialDynamicColors,
    SchemeVibrant,
    argbFromHex,
    hexFromArgb,
  } = await import('@material/material-color-utilities');
  if (request !== customRequest) return;
  const scheme = new SchemeVibrant(
    Hct.fromInt(argbFromHex(seed)),
    theme === 'dark',
    0,
    // Matches the presets: 2025 containers in light, deeper 2021 containers in dark.
    theme === 'dark' ? '2021' : '2025',
  );
  const colors = new MaterialDynamicColors();
  const style = document.documentElement.style;
  for (const role of roles)
    style.setProperty(
      `--md-${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      hexFromArgb(colors[role]().getArgb(scheme)),
    );
}
function clearCustomSeed() {
  customRequest++;
  const style = document.documentElement.style;
  for (let index = style.length - 1; index >= 0; index--) {
    const property = style.item(index);
    if (property.startsWith('--md-')) style.removeProperty(property);
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () =>
      read<Theme>('portfolio-theme', (value) =>
        ['light', 'dark'].includes(value),
      ) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
  );
  const [sky, setSky] = useState<Sky>(
    () => read<Sky>('portfolio-sky', isSky) ?? 'twilight',
  );
  const transition = useRef<ViewTransition | null>(null);
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    if (sky.startsWith('#')) {
      root.dataset.seed = 'custom';
      void applyCustomSeed(sky, theme);
    } else {
      clearCustomSeed();
      root.dataset.seed = sky;
    }
    const surface = getComputedStyle(root).getPropertyValue('--md-surface');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', surface.trim() || '#fbf8ff');
  }, [theme, sky]);
  function reveal(apply: () => void, origin?: Origin) {
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      apply();
      return;
    }
    transition.current?.skipTransition();
    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    try {
      const current = document.startViewTransition(() => flushSync(apply));
      transition.current = current;
      void current.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 560,
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        })
        .catch(() => {
          /* A newer choice can replace the transition. */
        });
    } catch {
      apply();
    }
  }
  function chooseTheme(value: Theme, origin?: Origin) {
    save('portfolio-theme', value);
    reveal(() => setTheme(value), origin);
  }
  /** A null origin applies immediately, for continuous input such as a color picker. */
  function chooseSky(value: Sky, origin?: Origin | null) {
    save('portfolio-sky', value);
    if (origin === null) setSky(value);
    else reveal(() => setSky(value), origin);
  }
  return { theme, chooseTheme, sky, chooseSky };
}
