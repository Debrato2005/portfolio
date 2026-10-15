import { Link, useParams } from 'react-router';
import { links } from '../lib/links';
import { photoCollections } from '../features/portfolio/content';
import {
  PhotoGallery,
  PhotographyStrip,
} from '../features/portfolio/Photography';

export function PhotographyPage() {
  const { collectionSlug } = useParams();
  const collection = photoCollections.find(
    (item) => item.slug === collectionSlug,
  );
  if (collectionSlug && !collection)
    return (
      <main id="main" className="page photography-page">
        <h1 tabIndex={-1}>Collection not found</h1>
        <p>This collection is not available.</p>
        <Link to="/photography">All collections</Link>
      </main>
    );
  return (
    <main id="main" className="page photography-page">
      <Link className="back-link" to={collection ? '/photography' : '/'}>
        {collection ? 'All collections' : 'Back to portfolio'}
      </Link>
      <p className="eyebrow">Photography / Astronomy</p>
      <h1 tabIndex={-1}>{collection?.title ?? 'Through my lens'}</h1>
      <p className="intro">
        {collection?.description ??
          'A slower way of looking. Light, landscapes, and the sky beyond.'}
      </p>
      {collection ? (
        <>
          <p className="eyebrow">{collection.status}</p>
          <PhotoGallery photos={collection.photos} />
        </>
      ) : (
        <>
          <PhotographyStrip />
          <section className="photo-introduction">
            <h2>From frames to a clearer sky</h2>
            <p>
              My astrophotography workflow includes calibration, registration
              and stacking with Siril, DeepSkyStacker and Sequator.
            </p>
            <p>The first collection is being prepared.</p>
          </section>
        </>
      )}
      <a className="primary-link" href={links.email}>
        Talk photography
      </a>
    </main>
  );
}
