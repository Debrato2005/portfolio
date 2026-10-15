import { Dialog } from '@base-ui/react/dialog';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useReducedMotion } from './useReducedMotion';
import { Icon } from '../../components/ui/Icon';
import { photoCollections } from './content';
import type { PortfolioPhoto } from './content';
import type { ReactNode } from 'react';

export function PhotographyStrip({ action }: { action?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const programmaticScroll = useRef(false);
  const current = photoCollections[index];
  const reducedMotion = useReducedMotion();
  const canPlay =
    photoCollections.filter((collection) => collection.photos.length > 0)
      .length > 1;
  const [playing, setPlaying] = useState(
    () =>
      canPlay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const move = useCallback(
    (step: number) => {
      const next =
        (index + step + photoCollections.length) % photoCollections.length;
      programmaticScroll.current = true;
      setIndex(next);
      const viewport = track.current;
      const card = viewport?.children[next];
      if (!viewport || !card) return;
      const bounds = card.getBoundingClientRect();
      viewport.scrollTo({
        left:
          viewport.scrollLeft +
          bounds.left -
          viewport.getBoundingClientRect().left -
          (viewport.clientWidth - bounds.width) / 2,
        behavior: reducedMotion ? 'instant' : 'smooth',
      });
    },
    [index, reducedMotion],
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (document.hidden || media.matches) setPlaying(false);
    };
    document.addEventListener('visibilitychange', stop);
    media.addEventListener('change', stop);
    return () => {
      document.removeEventListener('visibilitychange', stop);
      media.removeEventListener('change', stop);
    };
  }, []);
  useEffect(() => {
    if (!canPlay || !playing || reducedMotion) return;
    let visible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.5 },
    );
    if (track.current) observer.observe(track.current);
    const timer = window.setInterval(() => {
      if (!visible || document.hidden) return;
      const populated = photoCollections.flatMap((collection, position) =>
        collection.photos.length ? [position] : [],
      );
      const next =
        populated.find((position) => position > index) ?? populated[0] ?? index;
      move(next - index);
    }, 6000);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [canPlay, index, move, playing, reducedMotion]);
  return (
    <section
      className="photo-strip"
      aria-label="Photography collections"
      tabIndex={0}
      onFocus={(event) => {
        if (event.target === event.currentTarget) setPlaying(false);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          setPlaying(false);
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div
        className="photo-strip-track"
        ref={track}
        onMouseEnter={() => setPlaying(false)}
        onWheel={() => {
          setPlaying(false);
          programmaticScroll.current = false;
        }}
        onTouchStart={() => {
          setPlaying(false);
          programmaticScroll.current = false;
        }}
        onPointerDown={() => {
          setPlaying(false);
          programmaticScroll.current = false;
        }}
        onScrollEnd={() => {
          programmaticScroll.current = false;
        }}
        onScroll={(event) => {
          if (programmaticScroll.current) return;
          const viewport = event.currentTarget.getBoundingClientRect();
          let nearest = 0;
          let distance = Infinity;
          [...event.currentTarget.children].forEach((card, position) => {
            const bounds = card.getBoundingClientRect();
            const delta = Math.abs(
              (bounds.left + bounds.right - viewport.left - viewport.right) / 2,
            );
            if (delta < distance - 1) {
              distance = delta;
              nearest = position;
            }
          });
          setIndex(nearest);
        }}
      >
        {photoCollections.map((collection, position) => (
          <Link
            className="collection-card"
            data-populated={collection.photos.length > 0}
            key={collection.slug}
            to={`/photography/${collection.slug}`}
            onFocus={() => {
              setPlaying(false);
              programmaticScroll.current = true;
              setIndex(position);
            }}
          >
            <span className="collection-slot" aria-hidden="true">
              {collection.photos[0] ? (
                <img
                  src={collection.photos[0].src}
                  width={collection.photos[0].width}
                  height={collection.photos[0].height}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <Icon name="camera" />
              )}
            </span>
            <span>
              <strong>{collection.title}</strong>
              <small>
                {collection.photos.length
                  ? `${collection.photos.length} ${collection.photos.length === 1 ? 'photograph' : 'photographs'}`
                  : `${collection.status} · Photos coming`}
              </small>
            </span>
            <Icon name="arrow-up-right" />
          </Link>
        ))}
      </div>
      <div className="photo-strip-footer">
        <div className="photo-strip-controls">
          <p role={playing && !reducedMotion ? undefined : 'status'}>
            {index + 1} / {photoCollections.length} · {current?.title}
          </p>
          <div>
            {canPlay && (
              <button
                className="quiet-button collection-playback"
                aria-label={
                  playing && !reducedMotion
                    ? 'Pause collection rotation'
                    : 'Play collection rotation'
                }
                disabled={reducedMotion}
                onClick={() => setPlaying((value) => !value)}
              >
                {playing && !reducedMotion ? 'Pause' : 'Play'}
              </button>
            )}
            <button
              className="quiet-button"
              aria-label="Previous collection"
              onFocus={() => setPlaying(false)}
              onClick={() => {
                setPlaying(false);
                move(-1);
              }}
            >
              <Icon name="caret-left" />
            </button>
            <button
              className="quiet-button"
              aria-label="Next collection"
              onFocus={() => setPlaying(false)}
              onClick={() => {
                setPlaying(false);
                move(1);
              }}
            >
              <Icon name="caret-right" />
            </button>
          </div>
        </div>
        {action}
      </div>
    </section>
  );
}

export function PhotoGallery({
  photos,
}: {
  photos: readonly PortfolioPhoto[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const invoker = useRef<HTMLButtonElement | null>(null);
  const photo = selected === null ? null : photos[selected];
  function move(step: number) {
    setSelected((value) =>
      value === null ? null : (value + step + photos.length) % photos.length,
    );
  }
  useEffect(() => {
    if (!playing || reducedMotion || selected === null || photos.length < 2)
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setSelected((value) =>
          value === null ? null : (value + 1) % photos.length,
        );
    }, 6000);
    return () => clearInterval(timer);
  }, [playing, reducedMotion, selected, photos.length]);
  if (!photos.length)
    return (
      <div className="empty-collection">
        <Icon name="camera" />
        <h2>No photographs published yet.</h2>
        <p>
          This collection will contain original photographs, with captions and a
          full-size viewer.
        </p>
      </div>
    );
  return (
    <>
      <div className="photo-grid">
        {photos.map((item, index) => (
          <button
            key={item.slug}
            onClick={(event) => {
              invoker.current = event.currentTarget;
              setSelected(index);
            }}
            aria-label={`View ${item.alt}`}
          >
            <img
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              loading="lazy"
            />
            {item.caption && <span>{item.caption}</span>}
          </button>
        ))}
      </div>
      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setPlaying(false);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="command-backdrop" />
          <Dialog.Popup
            className="photo-viewer"
            finalFocus={() => invoker.current}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                setPlaying(false);
                move(event.key === 'ArrowRight' ? 1 : -1);
              }
            }}
          >
            <Dialog.Title>{photo?.alt}</Dialog.Title>
            <Dialog.Description>
              {photo?.caption ?? 'Original photograph'}
            </Dialog.Description>
            {photo && (
              <img
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
              />
            )}
            <div className="viewer-controls">
              <button
                disabled={photos.length < 2}
                onClick={() => {
                  setPlaying(false);
                  move(-1);
                }}
              >
                Previous photograph
              </button>
              <span>
                {(selected ?? 0) + 1} / {photos.length}
              </span>
              <button
                disabled={photos.length < 2}
                onClick={() => {
                  setPlaying(false);
                  move(1);
                }}
              >
                Next photograph
              </button>
              <button
                disabled={photos.length < 2 || reducedMotion}
                onClick={() => {
                  if (
                    !window.matchMedia('(prefers-reduced-motion: reduce)')
                      .matches
                  )
                    setPlaying((value) => !value);
                }}
              >
                {playing ? 'Pause slideshow' : 'Play slideshow'}
              </button>
              <Dialog.Close>Close photograph</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
