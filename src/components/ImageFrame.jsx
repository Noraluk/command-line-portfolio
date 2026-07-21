import './ImageFrame.css'

// A framed image slot. Pass `src` (imported asset or URL) to show an image;
// omit it to render a HUD-style placeholder that signals "ready for an image".
export default function ImageFrame({ src, alt = '', label = 'preview', aspect = 'landscape' }) {
  return (
    <figure
      className={`img-frame${aspect === 'portrait' ? ' img-frame--portrait' : ''}`}
      aria-label={src ? alt : `${label} — no image yet`}
    >
      <span className="img-frame__corner img-frame__corner--tl" aria-hidden="true" />
      <span className="img-frame__corner img-frame__corner--tr" aria-hidden="true" />
      <span className="img-frame__corner img-frame__corner--bl" aria-hidden="true" />
      <span className="img-frame__corner img-frame__corner--br" aria-hidden="true" />

      {src ? (
        <img className="img-frame__img" src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="img-frame__placeholder">
          <span className="img-frame__icon" aria-hidden="true">[ img ]</span>
          <span className="img-frame__hint">no preview yet</span>
        </div>
      )}
    </figure>
  )
}
