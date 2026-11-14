import type { SpotifyTrack } from "@/lib/spotify";

// Pinned bottom-right on larger screens; on phones it sits at the end of the
// page instead so it never covers the text while scrolling. No card chrome:
// it inherits the page's text halo so it reads over the video like the rest.
export function NowPlaying({ track }: { track: SpotifyTrack }) {
  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex max-w-xs items-center gap-3 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:fixed sm:right-6 sm:bottom-6 sm:z-10"
    >
      {track.albumImageUrl && (
        // Static export has no image optimizer, so a plain <img> is fine here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={track.albumImageUrl} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
          {track.isPlaying ? "Now playing" : "Last played"} on Spotify
        </p>
        <p className="truncate text-sm">
          <span className="text-white underline decoration-white/0 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out group-hover:decoration-white">
            {track.title}
          </span>
          <span className="text-white/60"> · {track.artist}</span>
        </p>
      </div>
    </a>
  );
}
