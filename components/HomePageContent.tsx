import Link from "next/link";
import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive,
  Code,
  ShieldCheck,
  Zap,
  ArrowRight,
  HardDrive,
  CheckCircle2,
  Terminal,
  Globe,
  ExternalLink,
} from "lucide-react";
import { getAllFileTypes, getFilesByType, formatBytes } from "@/lib/files";
import { NDL_ECOSYSTEM_APPS, NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getLatestPosts } from "@/lib/blog";
import { getLocalizedPost } from "@/lib/i18n/blog-i18n";
import { VI_FILE_TYPES } from "@/lib/i18n/files-i18n";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { FileCard } from "@/components/FileCard";
import { BlogCard } from "@/components/BlogCard";
import { AdUnit } from "@/components/AdUnit";
import { CustomFileGenerator } from "@/components/CustomFileGenerator";
import { StructuredData } from "@/components/StructuredData";

export function HomePageContent({ locale = "en" }: { locale?: Locale }) {
  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";
  const dict = getDictionary(locale);
  const allTypes = getAllFileTypes();

  // Top popular files
  const pdf10mb = getFilesByType("pdf").find((f) => f.slug === "10mb")!;
  const docx50mb = getFilesByType("docx").find((f) => f.slug === "50mb")!;
  const txt1mb = getFilesByType("txt").find((f) => f.slug === "large")!;
  const zip100mb = getFilesByType("zip").find((f) => f.slug === "100mb")!;
  const jpg5mb = getFilesByType("jpg").find((f) => f.slug === "5mb")!;
  const csv1mb = getFilesByType("csv").find((f) => f.slug === "1mb")!;

  const popularFiles = [pdf10mb, docx50mb, txt1mb, zip100mb, jpg5mb, csv1mb].filter(Boolean);
  const rawLatestPosts = getLatestPosts(3);
  const latestPosts = isVi ? rawLatestPosts.map((p) => getLocalizedPost(p, "vi")) : rawLatestPosts;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FileDummy",
    url: isVi ? `${siteUrl}/vi` : siteUrl,
    description: dict.home.heroSubtitle,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.home.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      <StructuredData data={[websiteSchema, faqSchema]} />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>{dict.home.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            {dict.home.heroTitle}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {dict.home.heroHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {dict.home.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`${prefix}/pdf`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
            >
              <span>{dict.home.ctaBrowse}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`${prefix}/generator`}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <span>{dict.home.ctaGenerator}</span>
            </Link>
          </div>

          {/* Technical highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>{isVi ? "Dung Lượng Byte Chuẩn Xác" : "Exact Byte Sizes"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>{isVi ? "Sẵn Sàng Cho CLI cURL & Wget" : "CLI cURL & wget Ready"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="1122334455" format="horizontal" label={isVi ? "Quảng cáo" : "Advertisement"} />
      </div>

      {/* Featured / Popular Downloads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {dict.common.popularFiles}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {dict.home.popularTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {dict.home.popularSubtitle}
            </p>
          </div>
          <Link
            href={`${prefix}/pdf`}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>{isVi ? "Xem Tất Cả Định Dạng" : "View All Categories"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularFiles.map((file) => (
            <FileCard key={file.r2Key} file={file} locale={locale} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            {dict.common.allFormats}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {dict.home.formatsTitle}
          </h2>
          <p className="text-sm text-slate-400">
            {dict.home.formatsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allTypes.map((meta) => {
            const files = getFilesByType(meta.type);
            const minSize = files[0] ? formatBytes(files[0].sizeBytes) : "100 KB";
            const maxSize = files[files.length - 1] ? formatBytes(files[files.length - 1].sizeBytes) : "1 GB";
            const viMeta = VI_FILE_TYPES[meta.type];
            const name = isVi && viMeta ? viMeta.name : meta.name;
            const shortDesc = isVi && viMeta ? viMeta.shortDesc : meta.shortDesc;

            return (
              <Link
                key={meta.type}
                href={`${prefix}/${meta.type}`}
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${meta.badgeBg} ${meta.badgeText}`}
                    >
                      {meta.extension}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {files.length} {isVi ? "kích cỡ" : "sizes"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-slate-500">
                    {minSize} - {maxSize}
                  </span>
                  <span className="text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    {isVi ? "Xem" : "Explore"} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Custom Size Generator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomFileGenerator locale={locale} />
      </section>

      {/* Feature / Why Choose Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {isVi ? "Tiêu Chuẩn Kỹ Thuật Cao Cấp" : "Engineered for Reliability"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isVi
                ? "Được Xây Dựng Chuyên Biệt Cho Lập Trình Viên & Kỹ Sư QA"
                : "Built Specifically for Modern QA Automation & Performance Testing"}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isVi
                ? "Không giống các file đệm ngẫu nhiên thông thường dễ làm sập parser, các file mẫu của chúng tôi đảm bảo tính tương thích và cấu trúc chuẩn hóa."
                : "Unlike generic garbage-padded files that crash document parsers, FileDummy assets are structurally compliant, safely sanitized, and deterministically generated."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {dict.home.features.f1Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {dict.home.features.f1Desc}
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {dict.home.features.f2Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {dict.home.features.f2Desc}
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {dict.home.features.f3Title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {dict.home.features.f3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From the Developer Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {dict.home.blogBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {dict.home.blogTitle}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {dict.home.blogSubtitle}
            </p>
          </div>
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700/60 w-fit"
          >
            <span>{dict.home.viewAllBlog}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {dict.home.faqBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {dict.home.faqTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {dict.home.faqs.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-base font-semibold text-white">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Ad Unit */}
      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="9988776655" format="auto" label={isVi ? "Quảng cáo" : "Advertisement"} />
      </div>
    </div>
  );
}
