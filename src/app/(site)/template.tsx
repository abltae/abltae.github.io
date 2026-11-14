// Remounts on every page switch (unlike the layout), so .route-content's entrance
// runs once per navigation while the layout's video keeps playing.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-content">{children}</div>;
}
