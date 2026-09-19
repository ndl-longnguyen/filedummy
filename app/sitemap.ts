import { MetadataRoute } from "next";
import { FILES, getAllFileTypes } from "@/lib/files";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const now = new Date();

  // Categories
  const categoryUrls: MetadataRoute.Sitemap = getAllFileTypes().map((t) => ({
    url: `${base}/${t.type}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // File detail pages
  const fileUrls: MetadataRoute.Sitemap = FILES.map((f) => ({
    url: `${base}/${f.type}/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: f.sizeBytes >= 100_000_000 ? 0.9 : 0.85,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${base}/generator`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    ...categoryUrls,
    ...fileUrls,
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];
}
