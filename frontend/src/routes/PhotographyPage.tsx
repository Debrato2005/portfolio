import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { links } from '../lib/links';
import { photoCollections } from '../features/portfolio/content';
import { PhotoGallery } from '../features/portfolio/Photography';

export function PhotographyPage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView();
    target?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  }, [hash]);
  return (
    <main id="main" className="page photography-page">
      <Link className="back-link" to="/#photography">
        Back to portfolio
      </Link>
      <p className="eyebrow">Photography / Astronomy</p>
      <h1 tabIndex={-1}>Through my lens</h1>
      <p className="intro">
        A slower way of looking at light, landscapes and the sky beyond. Explore
        every collection here and open published images in a lightbox.
      </p>
      <div className="photography-archive">
        {photoCollections.map((collection) => (
          <section
            className="collection-section"
            id={`collection-${collection.slug}`}
            aria-labelledby={`collection-${collection.slug}-title`}
            aria-label={collection.title}
            key={collection.slug}
          >
            <div className="collection-heading">
              <div>
                <h2 id={`collection-${collection.slug}-title`} tabIndex={-1}>
                  {collection.title}
                </h2>
                <p>{collection.description}</p>
              </div>
              <span>{collection.status}</span>
            </div>
            <PhotoGallery
              photos={collection.photos}
              illustratedCover={collection.illustratedCover}
            />
          </section>
        ))}
      </div>
      <section className="photo-introduction">
        <h2>From frames to a clearer sky</h2>
        <p>
          My astrophotography workflow includes calibration, registration and
          stacking with Siril, DeepSkyStacker and Sequator.
        </p>
        <p>The first original collections are being prepared.</p>
      </section>
      <a className="primary-link" href={links.email}>
        Talk photography
      </a>
    </main>
  );
}
