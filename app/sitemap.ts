import { MetadataRoute } from "next";
import { FILES, getAllFileTypes } from "@/lib/files";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const now = new Date();

  const getAlternates = (enPath: string) => {
    const enUrl = `${base}${enPath}`;
    const viUrl = `${base}/vi${enPath === "/" ? "" : enPath}`;
    return {
      languages: {
        en: enUrl,
        vi: viUrl,
      },
    };
  };

  // Static core routes
  const coreRoutes = [
    { enPath: "/", priority: 1.0, changeFrequency: "daily" as const },
    { enPath: "/generator", priority: 0.95, changeFrequency: "weekly" as const },
    { enPath: "/blog", priority: 0.95, changeFrequency: "daily" as const },
    { enPath: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { enPath: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    { enPath: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { enPath: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const coreEntries: MetadataRoute.Sitemap = coreRoutes.flatMap((r) => {
    const alternates = getAlternates(r.enPath);
    return [
      {
        url: `${base}${r.enPath}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
        alternates,
      },
      {
        url: `${base}/vi${r.enPath === "/" ? "" : r.enPath}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
        alternates,
      },
    ];
  });

  // Categories
  const categoryEntries: MetadataRoute.Sitemap = getAllFileTypes().flatMap((t) => {
    const enPath = `/${t.type}`;
    const alternates = getAlternates(enPath);
    return [
      {
        url: `${base}${enPath}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates,
      },
      {
        url: `${base}/vi${enPath}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates,
      },
    ];
  });

  // File detail pages
  const fileEntries: MetadataRoute.Sitemap = FILES.flatMap((f) => {
    const enPath = `/${f.type}/${f.slug}`;
    const alternates = getAlternates(enPath);
    const priority = f.sizeBytes >= 100_000_000 ? 0.9 : 0.85;
    return [
      {
        url: `${base}${enPath}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: `${base}/vi${enPath}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
    ];
  });

  // Blog articles
  const blogEntries: MetadataRoute.Sitemap = getPublishedPosts().flatMap((post) => {
    const enPath = `/blog/${post.slug}`;
    const alternates = getAlternates(enPath);
    const postDate = new Date(post.date);
    return [
      {
        url: `${base}${enPath}`,
        lastModified: postDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        alternates,
      },
      {
        url: `${base}/vi${enPath}`,
        lastModified: postDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        alternates,
      },
    ];
  });

  return [
    ...coreEntries,
    ...categoryEntries,
    ...fileEntries,
    ...blogEntries,
  ];
}
