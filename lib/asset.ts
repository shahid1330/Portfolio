/**
 * Prefixes a public-folder path with the deployment's basePath.
 *
 * Next prepends basePath automatically for <Link> and <Image>, but NOT for a
 * plain <a href="/file.pdf">. On GitHub Pages the site is served from
 * /Portfolio, so those raw hrefs need it applied by hand or they 404.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!path.startsWith('/')) return path; // already absolute or external
  return `${BASE_PATH}${path}`;
}
