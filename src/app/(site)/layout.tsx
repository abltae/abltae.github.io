import { getSpotifyTrack } from "@/lib/spotify";
import { BackgroundVideo } from "./background-video";
import { NowPlaying } from "./now-playing";
import { SiteNav } from "./site-nav";

// Shared by home and thoughts so the background video, nav, and Spotify card
// persist across tab switches instead of remounting.
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const spotifyTrack = await getSpotifyTrack();

  return (
    // The text shadow separates letters from the dither dots behind them.
    <div className="[text-shadow:0_0_6px_#000,0_0_12px_#000]">
      <BackgroundVideo />
      <SiteNav />
      {children}
      {spotifyTrack && <NowPlaying track={spotifyTrack} />}
    </div>
  );
}
