// A tiny pixel Snorlax that rolls back and forth along the top of the Spotify
// card (see .snorlax-* in globals.css). The 24x21 sprite is stored at 3x with
// hard edges and shown at 1.5x (36x31.5), which is the file's native resolution
// on 2x screens; pixelated rendering keeps it crisp elsewhere.
export function Snorlax() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full mb-1">
      <div className="snorlax-mover">
        {/* Static export has no image optimizer, so a plain <img> is fine here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/snorlax.png" alt="" width={36} height={32} className="snorlax-sprite block h-[31.5px] w-9 [image-rendering:pixelated]" />
      </div>
    </div>
  );
}
