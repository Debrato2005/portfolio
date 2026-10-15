/** The paired-image reveal will attach here when the owner supplies the four images. */
export function BackgroundScene() {
  return (
    <div
      className="hero-scene"
      aria-hidden="true"
      data-artwork="deferred-owner-images"
    />
  );
}
