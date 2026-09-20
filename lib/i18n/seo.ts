import { Locale } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

/**
 * Returns canonical and hreflang alternate links for SEO
 * @param path Canonical path without leading /vi (e.g. "/" or "/pdf" or "/pdf/10mb" or "/blog")
 * @param currentLocale The current page's locale ("en" | "vi")
 */
export function getAlternateLanguages(path: string, currentLocale: Locale = "en") {
  // Normalize path: ensure leading slash, no trailing slash (unless root)
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // English URL
  const enUrl = cleanPath === "/" ? SITE_URL : `${SITE_URL}${cleanPath}`;

  // Vietnamese URL
  const viUrl = cleanPath === "/" ? `${SITE_URL}/vi` : `${SITE_URL}/vi${cleanPath}`;

  // Current canonical URL
  const canonical = currentLocale === "vi" ? viUrl : enUrl;

  return {
    canonical,
    languages: {
      en: enUrl,
      vi: viUrl,
      "x-default": enUrl,
    },
  };
}
