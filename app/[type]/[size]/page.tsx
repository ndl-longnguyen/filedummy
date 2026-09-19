import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HardDrive,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ArrowRight,
  FileCode,
  Layers,
} from "lucide-react";
import { FILES, getFile, FILE_TYPES, getFilesByType, formatBytes, FileType } from "@/lib/files";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DownloadButton } from "@/components/DownloadButton";
import { CliSnippet } from "@/components/CliSnippet";
import { AdUnit } from "@/components/AdUnit";
import { StructuredData } from "@/components/StructuredData";
import { CrossPromoBanner } from "@/components/CrossPromoBanner";

export function generateStaticParams() {
  return FILES.map((f) => ({
    type: f.type,
    size: f.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; size: string }>;
}): Promise<Metadata> {
  const { type, size } = await params;
  const file = getFile(type, size);
  const meta = FILE_TYPES[type as FileType];

  if (!file || !meta) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const filename = file.r2Key.split("/").pop();
  const title = `Download Sample ${meta.name} ${file.label} (${filename}) | FileDummy`;
  const description = file.description;

  return {
    title,
    description,
    keywords: [
      `sample ${type} file ${file.label}`,
      `dummy ${type} ${file.slug} download`,
      `test ${file.label} ${type} file`,
      `${filename} download`,
      `file upload test ${file.label}`,
    ],
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${type}/${size}`,
      siteName: "FileDummy",
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${type}/${size}`,
    },
  };
}

export default async function FileDetailPage({
  params,
}: {
  params: Promise<{ type: string; size: string }>;
}) {
  const { type, size } = await params;
  const file = getFile(type, size);
  const meta = FILE_TYPES[type as FileType];

  if (!file || !meta) {
    notFound();
  }

  const filename = file.r2Key.split("/").pop() || `sample-${file.slug}.${file.type}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const siblingFiles = getFilesByType(type).filter((f) => f.slug !== file.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": meta.name,
        "item": `${siteUrl}/${type}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": file.label,
        "item": `${siteUrl}/${type}/${size}`,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Sample ${meta.name} File (${file.label})`,
    "description": file.description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "fileSize": `${file.sizeBytes} B`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "url": `${siteUrl}/${type}/${size}`,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData data={[breadcrumbSchema, softwareSchema]} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: meta.name, href: `/${type}` },
          { label: file.label },
        ]}
      />

      {/* Main Download Hero Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: File Info & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${meta.badgeBg} ${meta.badgeText}`}
              >
                {meta.name}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                {formatBytes(file.sizeBytes)}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Clean / Verified
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Download Sample {file.label} {meta.name} File
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {file.description}
            </p>
          </div>

          {/* High-conversion Interstitial Download CTA */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-slate-300">{filename}</span>
              <span>{file.sizeBytes.toLocaleString()} bytes</span>
            </div>

            <DownloadButton fileKey={file.r2Key} label={file.label} sizeBytes={file.sizeBytes} />

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Direct High-Speed CDN
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> No signup required
              </span>
            </div>
          </div>

          {/* Ad unit below download button */}
          <AdUnit slot="4455667788" format="auto" label="Sponsored" />

          {/* Developer CLI Integration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span>Developer CLI & Code Snippets</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Quickly pull this test file directly in your terminal, CI/CD pipeline, or integration tests:
            </p>
            <CliSnippet r2Key={file.r2Key} filename={filename} />
          </div>
        </div>

        {/* Right Col: Technical Specs Table */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technical File Specifications</span>
            </h3>

            <div className="divide-y divide-slate-800/80 text-xs">
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">Filename</span>
                <span className="font-mono text-white font-semibold">{filename}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">File Format</span>
                <span className="text-white font-medium">{meta.name}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">Extension</span>
                <span className="font-mono text-white font-semibold">{meta.extension}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">MIME Type</span>
                <span className="font-mono text-slate-300 truncate max-w-[200px]" title={meta.mimeType}>
                  {meta.mimeType}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">Exact Bytes</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {file.sizeBytes.toLocaleString()} B
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">Magic Bytes</span>
                <span className="font-mono text-slate-300">{meta.magicBytes}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-400">CDN Storage</span>
                <span className="text-slate-300">Cloudflare R2 Edge</span>
              </div>
            </div>
          </div>

          {/* Rectangle Ad Unit in Sidebar */}
          <AdUnit slot="6677889900" format="rectangle" label="Advertisement" />
        </div>
      </div>

      {/* Contextual NDL Ecosystem Promo */}
      <CrossPromoBanner type={type === "jpg" || type === "png" ? "image" : "default"} />

      {/* Sibling Sizes of the same file type */}
      {siblingFiles.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Other Available Sizes for {meta.name}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Need a smaller or larger sample file? Choose another size variant:
              </p>
            </div>
            <Link
              href={`/${type}`}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View all {meta.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {siblingFiles.map((sibling) => (
              <Link
                key={sibling.r2Key}
                href={`/${type}/${sibling.slug}`}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-center group"
              >
                <div className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {sibling.label}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {formatBytes(sibling.sizeBytes)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back button */}
      <div className="pt-4">
        <Link
          href={`/${type}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {meta.name} category</span>
        </Link>
      </div>
    </div>
  );
}
