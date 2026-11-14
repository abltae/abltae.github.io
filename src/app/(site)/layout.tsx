import { BackgroundVideo } from "./background-video";
import { SiteNav } from "./site-nav";

// Shared by home and thoughts so the background video keeps playing across tab
// switches instead of restarting.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    // The text shadow separates letters from the dither dots behind them.
    <div className="[text-shadow:0_0_6px_#000,0_0_12px_#000]">
      <BackgroundVideo />
      <SiteNav />
      {children}
    </div>
  );
}
