import type { SpotifyTrack } from "@/lib/spotify";

// Pinned bottom-right on larger screens; on phones it sits at the end of the
// page instead so it never covers the text while scrolling.
export function NowPlaying({ track }: { track: SpotifyTrack }) {
  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noreferrer"
      className="flex w-full max-w-xs items-center gap-3 rounded-lg border border-white/15 bg-black/80 p-2.5 pr-4 [text-shadow:none] transition-[border-color,background-color] duration-150 ease-out hover:border-white/40 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-black sm:fixed sm:right-4 sm:bottom-4 sm:z-10 sm:w-72"
    >
      {track.albumImageUrl && (
        // Static export has no image optimizer, so a plain <img> is fine here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={track.albumImageUrl} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded" />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
          {track.isPlaying ? "Now playing" : "Last played"} on Spotify
        </p>
        <p className="truncate text-sm font-medium text-white">{track.title}</p>
        <p className="truncate text-sm text-white/60">{track.artist}</p>
      </div>
    </a>
  );
}
