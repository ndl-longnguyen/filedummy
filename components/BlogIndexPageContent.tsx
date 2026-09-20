import { getPublishedPosts, getBlogPostsByCluster, CLUSTER_META, BlogCluster } from "@/lib/blog";
import { VI_CLUSTER_META, getLocalizedPost } from "@/lib/i18n/blog-i18n";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { BlogCard } from "@/components/BlogCard";

interface BlogIndexPageContentProps {
  locale?: Locale;
}

export function BlogIndexPageContent({ locale = "en" }: BlogIndexPageContentProps) {
  const isVi = locale === "vi";
  const dict = getDictionary(locale);
  const clusters = [1, 2, 3, 4, 5, 6] as const;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {dict.blog.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {dict.blog.heroTitle}
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          {dict.blog.heroSubtitle}
        </p>
      </div>

      {/* Cluster sections */}
      {clusters.map((cluster) => {
        const rawPosts = getBlogPostsByCluster(cluster);
        const posts = isVi ? rawPosts.map((p) => getLocalizedPost(p, "vi")) : rawPosts;
        const meta = isVi ? VI_CLUSTER_META[cluster] : CLUSTER_META[cluster];
        if (!posts.length) return null;

        return (
          <section key={cluster} className="mb-14">
            {/* Cluster header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">{meta.icon}</span>
              <div>
                <h2 className={`text-base font-bold bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}>
                  {isVi ? `Chủ đề ${cluster}` : `Cluster ${cluster}`} — {meta.name}
                </h2>
                <p className="text-xs text-slate-500">{meta.description}</p>
              </div>
              <span className="ml-auto text-[10px] font-medium text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/40">
                {posts.length} {isVi ? "bài viết" : "articles"}
              </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
