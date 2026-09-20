import Link from "next/link";
import { Clock, Calendar, Tag, Home, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/types";
import { AdUnit } from "./AdUnit";
import { AuthorBox } from "./AuthorBox";
import { BlogInteractions } from "./BlogInteractions";
import { BlogViewsCounter } from "./BlogViewsCounter";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { getLocalizedArticleTitle } from "@/lib/i18n/blog-i18n";

interface BlogLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
  locale?: Locale;
}

export function BlogLayout({ post, children, locale = "en" }: BlogLayoutProps) {
  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";

  const dateFormatted = new Date(post.date).toLocaleDateString(isVi ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#090d16]">
      <ReadingProgressBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href={prefix || "/"} className="hover:text-slate-300 flex items-center gap-1 transition-colors">
            <Home className="w-3 h-3" /> {isVi ? "Trang Chủ" : "Home"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`${prefix}/blog`} className="hover:text-slate-300 transition-colors">
            {isVi ? "Blog" : "Blog"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400 truncate max-w-xs">{post.title}</span>
        </nav>

        <div className="flex gap-8">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r ${post.clusterColor} text-white`}
                >
                  {post.clusterName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 font-normal">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 pb-5 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {dateFormatted}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {post.readingTime} {isVi ? "phút đọc" : "min read"}
                </span>
                <BlogViewsCounter postSlug={post.slug} locale={locale} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Ad — top of article */}
            <AdUnit slot="blog-top" className="mb-8" label={isVi ? "Được tài trợ" : "Sponsored"} />

            {/* MDX content */}
            <div
              className="prose prose-invert prose-base sm:prose-lg max-w-none
              prose-p:text-slate-300 prose-p:text-[16px] sm:prose-p:text-[17px] prose-p:leading-[1.8] prose-p:my-5
              prose-a:text-blue-400 prose-a:font-medium prose-a:underline prose-a:decoration-blue-500/30 prose-a:underline-offset-4 hover:prose-a:decoration-blue-400 hover:prose-a:text-blue-300 transition-colors
              prose-strong:text-slate-100 prose-strong:font-bold
              prose-code:text-cyan-300 prose-code:bg-slate-800/80 prose-code:border prose-code:border-slate-700/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.88em] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-none prose-pre:my-0
              prose-blockquote:p-0 prose-blockquote:border-0 prose-blockquote:bg-transparent
              prose-hr:border-slate-800/80 prose-hr:my-10"
            >
              {children}
            </div>

            {/* Ad — after content */}
            <AdUnit slot="blog-bottom" className="mt-8" label={isVi ? "Quảng cáo" : "Advertisement"} />

            {/* Author Box & Content Originality (E-E-A-T) */}
            <div className="mt-10">
              <AuthorBox locale={locale} />
            </div>

            {/* Blog Reactions & Community Comments (via Supabase) */}
            <BlogInteractions postSlug={post.slug} locale={locale} />

            {/* FAQ Section */}
            {post.faqItems && post.faqItems.length > 0 && (
              <section className="mt-12 pt-8 border-t border-slate-800/60">
                <h2 className="text-lg font-bold text-white mb-5">
                  {isVi ? "Câu Hỏi Thường Gặp (FAQ)" : "Frequently Asked Questions"}
                </h2>
                <div className="space-y-4">
                  {post.faqItems.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-slate-200 hover:text-white transition-colors list-none">
                        <span>{item.q}</span>
                        <span className="ml-4 flex-shrink-0 text-slate-500 group-open:rotate-180 transition-transform">
                          ▾
                        </span>
                      </summary>
                      <div className="px-5 pb-4">
                        <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related Articles */}
            {post.relatedArticles && post.relatedArticles.length > 0 && (
              <section className="mt-10 pt-8 border-t border-slate-800/60">
                <h2 className="text-base font-bold text-white mb-4">
                  {isVi ? "Bài Viết Liên Quan" : "Related Articles"}
                </h2>
                <div className="space-y-2">
                  {post.relatedArticles.map((slug) => (
                    <Link
                      key={slug}
                      href={`${prefix}/blog/${slug}`}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{getLocalizedArticleTitle(slug, locale)}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Desktop sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Download CTA box */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-950/30 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-2">
                  {isVi ? "Tệp Mẫu Thử Nghiệm" : "Test Files"}
                </p>
                <p className="text-xs text-slate-400 mb-3">{post.downloadCTA.text}</p>
                <Link
                  href={`${prefix}/${post.downloadCTA.fileType}/${post.downloadCTA.fileSlug}`}
                  className="block text-center text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  {post.downloadCTA.buttonLabel}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
