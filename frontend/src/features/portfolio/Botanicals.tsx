import type { CSSProperties } from 'react';

/** Deterministic noise so every render draws the same plants. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Plant = {
  stem: string;
  leaves: string[];
  blooms: { x: number; y: number; r: number }[];
};

/** One wild sprig: a bending stem, alternating leaves and a few blossoms. */
function sprig(
  random: () => number,
  x: number,
  height: number,
  bloom = true,
): Plant {
  const lean = (random() - 0.5) * height * 0.5;
  const top = { x: x + lean, y: 200 - height };
  const control = {
    x: x + lean * 0.2 + (random() - 0.5) * 20,
    y: 200 - height * 0.55,
  };
  const stem = `M${x} 200 Q${control.x} ${control.y} ${top.x} ${top.y}`;
  const point = (t: number) => ({
    x: (1 - t) ** 2 * x + 2 * (1 - t) * t * control.x + t * t * top.x,
    y: (1 - t) ** 2 * 200 + 2 * (1 - t) * t * control.y + t * t * top.y,
  });
  const leaves: string[] = [];
  const count = 3 + Math.floor(random() * 4);
  for (let index = 0; index < count; index++) {
    const t = 0.18 + (index / count) * 0.7;
    const base = point(t);
    const side = index % 2 ? 1 : -1;
    const length = 9 + random() * 10;
    const tipX = base.x + side * length;
    const tipY = base.y - length * 0.7;
    leaves.push(
      `M${base.x} ${base.y} Q${base.x + side * length * 0.2} ${tipY - 3} ${tipX} ${tipY} Q${base.x + side * length * 0.8} ${base.y + 1} ${base.x} ${base.y}`,
    );
  }
  const blooms = bloom ? [{ x: top.x, y: top.y, r: 2.6 + random() * 2.4 }] : [];
  if (bloom && random() > 0.45) {
    const side = point(0.72);
    blooms.push({ x: side.x + 7, y: side.y - 6, r: 2 + random() * 1.6 });
  }
  return { stem, leaves, blooms };
}

function Plants({ plants }: { plants: Plant[] }) {
  return (
    <>
      {plants.map((plant, index) => (
        <g key={index}>
          <path className="botanic-stem" d={plant.stem} />
          {plant.leaves.map((leaf) => (
            <path className="botanic-leaf" d={leaf} key={leaf} />
          ))}
          {plant.blooms.map((bloom) => (
            <g key={`${bloom.x}-${bloom.y}`} className="botanic-bloom">
              {[0, 72, 144, 216, 288].map((angle) => (
                <circle
                  key={angle}
                  cx={bloom.x + Math.cos((angle * Math.PI) / 180) * bloom.r}
                  cy={bloom.y + Math.sin((angle * Math.PI) / 180) * bloom.r}
                  r={bloom.r * 0.75}
                />
              ))}
              <circle
                className="botanic-heart"
                cx={bloom.x}
                cy={bloom.y}
                r={bloom.r * 0.5}
              />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}

/** A cluster of sprigs that grows from the page edge and sways. */
export function EdgeSprig({
  seed,
  side,
  top,
}: {
  seed: number;
  side: 'left' | 'right';
  top: string;
}) {
  const random = seeded(seed);
  const plants = Array.from({ length: 4 }, (_, index) =>
    sprig(random, 22 + index * 14 + random() * 8, 90 + random() * 100),
  );
  return (
    <svg
      className="edge-sprig"
      data-side={side}
      viewBox="0 0 110 200"
      aria-hidden="true"
      style={{ top, '--sway-delay': `${(seed % 7) * -0.9}s` } as CSSProperties}
    >
      <Plants plants={plants} />
    </svg>
  );
}

/** A low meadow of grass and wildflowers along the bottom of the page. */
export function Meadow() {
  const random = seeded(2005);
  // Wildflowers gather toward the corners; the middle stays mostly grass.
  const plants = Array.from({ length: 90 }, () => {
    const x = random() * 1200;
    const edge = Math.max(0, 1 - Math.min(x, 1200 - x) / 360);
    const tall = random() < 0.25 + edge * 0.5;
    return sprig(
      random,
      x,
      (tall ? 60 : 18) + random() * (tall ? 110 : 40),
      tall && random() < 0.35 + edge * 0.6,
    );
  });
  return (
    <svg
      className="meadow"
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <Plants plants={plants} />
    </svg>
  );
}
