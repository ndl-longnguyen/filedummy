import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/i18n/types";

interface BlogCardProps {
  post: BlogPost;
  locale?: Locale;
}

export function BlogCard({ post, locale = "en" }: BlogCardProps) {
  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";

  const dateFormatted = new Date(post.date).toLocaleDateString(isVi ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`${prefix}/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-600/80 hover:bg-slate-900/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 overflow-hidden"
    >
      {/* Cluster color bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${post.clusterColor}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* Cluster badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r ${post.clusterColor} text-white`}
          >
            {post.clusterName}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-100 group-hover:text-white leading-snug mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-4">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800/60">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-slate-500" />
            {post.readingTime} {isVi ? "phút đọc" : "min read"}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3 h-3 text-slate-500" />
            {dateFormatted}
          </span>
        </div>
      </div>
    </Link>
  );
}

