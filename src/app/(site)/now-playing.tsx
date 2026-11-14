"use client";

import { usePathname } from "next/navigation";
import type { SpotifyTrack } from "@/lib/spotify";

// Lives in the shared layout (not the home page) so it can fade out and back in
// when switching tabs instead of popping. Pinned bottom-right on larger screens;
// on phones it sits at the end of the home page so it never covers the text.
export function NowPlaying({ track }: { track: SpotifyTrack }) {
  const visible = usePathname() === "/";

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`mx-auto -mt-8 w-full max-w-2xl px-6 pb-20 transition-opacity duration-200 ease-out motion-reduce:transition-none sm:fixed sm:right-6 sm:bottom-6 sm:z-10 sm:m-0 sm:w-auto sm:max-w-xs sm:p-0 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0 max-sm:hidden"
      }`}
    >
      <a
        href={track.songUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {track.albumImageUrl && (
          // Static export has no image optimizer, so a plain <img> is fine here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.albumImageUrl} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
        )}
        <p className="min-w-0 truncate text-sm">
          {/* No visible label; screen readers still get the context. */}
          <span className="sr-only">{track.isPlaying ? "Now playing" : "Last played"} on Spotify: </span>
          <span className="text-white underline decoration-white/0 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out group-hover:decoration-white">
            {track.title}
          </span>
          <span className="text-white/60"> · {track.artist}</span>
        </p>
      </a>
    </div>
  );
}
