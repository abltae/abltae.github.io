import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site into `out/` so GitHub Pages can serve it.
  output: "export",
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // cacheComponents/partialPrefetching are left off: they need a running server,
  // and cacheComponents rejects the `dynamic = "force-static"` route config that
  // static export requires for route handlers.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
