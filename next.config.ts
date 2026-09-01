import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only — no Node server — so the site is
 * exported to plain HTML. Two consequences worth remembering:
 *
 *  - API routes cannot exist. The contact form posts straight to Web3Forms
 *    and the project cards read their data from lib/data.ts.
 *  - The site lives under /Portfolio (a project repo, not a user site), so
 *    basePath is set at build time via NEXT_PUBLIC_BASE_PATH. Leaving that
 *    variable unset keeps local `npm run dev` working at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages has no image optimiser to call.
  images: { unoptimized: true },
  // Emit /about/index.html rather than /about.html so static hosts resolve
  // clean URLs without extra rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
