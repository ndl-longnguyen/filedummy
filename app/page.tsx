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
  DownloadCloud,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { getAllFileTypes, getFilesByType, formatBytes } from "@/lib/files";
import { FileCard } from "@/components/FileCard";
import { AdUnit } from "@/components/AdUnit";
import { CustomFileGenerator } from "@/components/CustomFileGenerator";
import { StructuredData } from "@/components/StructuredData";

export default function HomePage() {
  const allTypes = getAllFileTypes();

  // Pick top popular files
  const pdf10mb = getFilesByType("pdf").find((f) => f.slug === "10mb")!;
  const docx50mb = getFilesByType("docx").find((f) => f.slug === "50mb")!;
  const txt1mb = getFilesByType("txt").find((f) => f.slug === "large")!;
  const zip100mb = getFilesByType("zip").find((f) => f.slug === "100mb")!;
  const jpg5mb = getFilesByType("jpg").find((f) => f.slug === "5mb")!;
  const csv1mb = getFilesByType("csv").find((f) => f.slug === "1mb")!;

  const popularFiles = [pdf10mb, docx50mb, txt1mb, zip100mb, jpg5mb, csv1mb].filter(Boolean);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FileDummy",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site",
    "description": "Download free sample and dummy files in multiple formats and sizes for QA testing and development.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site"}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these sample files safe and virus-free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100%. All files on FileDummy are programmatically generated dummy files consisting of valid headers and clean padded binary/text data. They contain no executable binaries, macros, or malicious scripts.",
        },
      },
      {
        "@type": "Question",
        "name": "What sizes are available for download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Files are available in standard size variants from 50KB, 100KB, 1MB, 5MB, 10MB, 20MB, 50MB, 100MB, 500MB, up to 1GB. You can also generate custom byte sizes using our online browser generator tool.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I use these files for automated CI/CD and API testing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Each file comes with ready-to-copy cURL, wget, Python, and Node.js commands to easily integrate into test suites, Cypress/Playwright runs, and cloud upload pipelines.",
        },
      },
    ],
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
            <span>High-Speed Global CDN Downloads via Cloudflare R2</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Free Sample Files & Dummy Generator for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Testing & QA
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Download standardized, clean sample files in PDF, DOCX, TXT, Images, Datasets, and Archives.
            Precision-sized from 50KB up to 1GB for stress testing, upload limits, and API validation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pdf"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
            >
              <span>Explore Sample Files</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/generator"
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <span>Custom Size Generator</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Virus & Malware Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Exact Byte Sizes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>CLI cURL & wget Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="1122334455" format="horizontal" label="Advertisement" />
      </div>

      {/* Featured / Popular Downloads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Most Requested
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Popular Sample Files
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Quickly download the most frequent sizes used for file upload testing and QA verification.
            </p>
          </div>
          <Link
            href="/pdf"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularFiles.map((file) => (
            <FileCard key={file.r2Key} file={file} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Complete Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Browse by File Format
          </h2>
          <p className="text-sm text-slate-400">
            Standard dummy files available in 8 widely used file formats with sizes ranging from 50KB to 1GB.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allTypes.map((meta) => {
            const files = getFilesByType(meta.type);
            const minSize = files[0] ? formatBytes(files[0].sizeBytes) : "100 KB";
            const maxSize = files[files.length - 1] ? formatBytes(files[files.length - 1].sizeBytes) : "1 GB";

            return (
              <Link
                key={meta.type}
                href={`/${meta.type}`}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${meta.badgeBg} ${meta.badgeText}`}
                    >
                      {meta.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      {meta.extension}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {meta.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {meta.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {files.length} sizes ({minSize} - {maxSize})
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* In-Page Custom Generator Tool Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <CustomFileGenerator />
      </section>

      {/* Technical Testing Scenarios / Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Developer & QA Handbook
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Use Standardized Dummy Files in QA & Development?
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-world software requires thorough boundary and edge-case testing. Using standardized test files ensures your application reliably handles file size quotas, MIME validation, and stream ingestion across various environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800/80">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white">Upload Limits & Quotas</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test web server limits (such as Nginx `client_max_body_size`, Cloudflare 100MB payload limit, and AWS API Gateway 10MB limits) with files matching threshold boundaries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white">Memory Leak Profiling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feed large 100MB, 500MB, or 1GB files to document parsers, image processors, and stream readers to inspect Node.js V8 heap allocations and prevent Out-Of-Memory (OOM) crashes.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white">Automated CI/CD Integration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use our direct cURL snippets inside GitHub Actions, GitLab CI, and Docker test scripts to download mock assets on-demand without committing heavy binaries to your Git repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-base font-semibold text-white">
              Are these sample files safe and virus-free?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Yes, 100%. All sample files are generated programmatically with valid headers and clean padded binary/text data. None of our files contain macros, executables, or malicious scripts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-base font-semibold text-white">
              How fast are the file downloads?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              All files are served directly from Cloudflare R2 object storage with global edge caching across 300+ worldwide locations, providing maximum download speeds and zero bandwidth throttling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-base font-semibold text-white">
              Can I hotlink or use the API in my automated scripts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Yes, you can use our `/api/download?file=...` endpoint with standard tools like `curl -L` and `wget` in your CI/CD test pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Ad Unit */}
      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="9988776655" format="auto" label="Advertisement" />
      </div>
    </div>
  );
}
