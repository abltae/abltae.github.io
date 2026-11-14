// A tiny pixel Snorlax that rolls back and forth along the top of the Spotify
// card (see .snorlax-* in globals.css). The 24x21 sprite is stored at 3x with
// hard edges and drawn pixelated, so it stays crisp at any screen density.
export function Snorlax() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full mb-1">
      <div className="snorlax-mover">
        {/* Static export has no image optimizer, so a plain <img> is fine here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/snorlax.png" alt="" width={24} height={21} className="snorlax-sprite block [image-rendering:pixelated]" />
      </div>
    </div>
  );
}
