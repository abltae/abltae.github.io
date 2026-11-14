"use client";

import { usePathname } from "next/navigation";
import type { SpotifyTrack } from "@/lib/spotify";
import { Snorlax } from "./snorlax";

// Lives in the shared layout (not the home page) so it can fade out and back in
// when switching tabs instead of popping. Pinned bottom-right only on wide screens,
// capped to the gutter beside the column; narrower, it sits at the end of the home
// page so it never covers the timeline.
export function NowPlaying({ track }: { track: SpotifyTrack }) {
  const visible = usePathname() === "/";

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`mx-auto -mt-2 w-full max-w-2xl px-6 pb-20 transition-opacity duration-200 ease-out motion-reduce:transition-none sm:-mt-10 xl:fixed xl:right-6 xl:bottom-6 xl:z-10 xl:m-0 xl:w-auto xl:max-w-[min(20rem,calc((100vw-42rem)/2-3rem))] xl:p-0 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0 max-xl:hidden"
      }`}
    >
      {/* Shrinks to the card's content so Snorlax rolls only across the card itself. */}
      <div className="relative w-fit max-w-full">
        <Snorlax />
        <a
          href={track.songUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {track.albumImageUrl && (
            // Static export has no image optimizer, so a plain <img> is fine here.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={track.albumImageUrl} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-[9px]" />
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
    </div>
  );
}
