import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HardDrive,
  ArrowLeft,
  ArrowRight,
  FileCode,
  Layers,
} from "lucide-react";
import { getFile, FILE_TYPES, getFilesByType, formatBytes, FileType } from "@/lib/files";
import { VI_FILE_TYPES } from "@/lib/i18n/files-i18n";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DownloadButton } from "@/components/DownloadButton";
import { CliSnippet } from "@/components/CliSnippet";
import { AdUnit } from "@/components/AdUnit";
import { StructuredData } from "@/components/StructuredData";
import { CrossPromoBanner } from "@/components/CrossPromoBanner";

interface FileDetailPageContentProps {
  type: string;
  size: string;
  locale?: Locale;
}

export function FileDetailPageContent({
  type,
  size,
  locale = "en",
}: FileDetailPageContentProps) {
  const file = getFile(type, size);
  const meta = FILE_TYPES[type as FileType];

  if (!file || !meta) {
    notFound();
  }

  const isVi = locale === "vi";
  const prefix = isVi ? "/vi" : "";
  const dict = getDictionary(locale);
  const viMeta = VI_FILE_TYPES[type as FileType];

  const displayName = isVi && viMeta ? viMeta.name : meta.name;
  const filename = file.r2Key.split("/").pop() || `sample-${file.slug}.${file.type}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const siblingFiles = getFilesByType(type).filter((f) => f.slug !== file.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isVi ? "Trang Chủ" : "Home",
        item: isVi ? `${siteUrl}/vi` : siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: displayName,
        item: `${siteUrl}${prefix}/${type}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: file.label,
        item: `${siteUrl}${prefix}/${type}/${size}`,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: isVi
      ? `Tệp Mẫu ${displayName} (${file.label})`
      : `Sample ${meta.name} File (${file.label})`,
    description: file.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    fileSize: `${file.sizeBytes} B`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteUrl}${prefix}/${type}/${size}`,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData data={[breadcrumbSchema, softwareSchema]} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: displayName, href: `${prefix}/${type}` },
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
                {displayName}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                {formatBytes(file.sizeBytes)}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                {file.sizeBytes.toLocaleString()} B
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isVi
                ? `Tải Tệp Mẫu ${displayName} ${file.label}`
                : `Download Sample ${file.label} ${meta.name} File`}
            </h1>
          </div>

          {/* High-conversion Interstitial Download CTA */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-slate-300">{filename}</span>
              <span>{file.sizeBytes.toLocaleString()} bytes</span>
            </div>

            <DownloadButton
              fileKey={file.r2Key}
              label={file.label}
              sizeBytes={file.sizeBytes}
              locale={locale}
            />

            <div className="flex items-center justify-center text-[11px] text-slate-500 pt-1">
              <span>{isVi ? "Tải trực tiếp không qua trung gian" : "Direct file stream download"}</span>
            </div>
          </div>

          {/* Ad unit below download button */}
          <AdUnit slot="4455667788" format="auto" label={isVi ? "Được tài trợ" : "Sponsored"} />

          {/* Developer CLI Integration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span>{dict.fileDetail.cliCommandsTitle}</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {dict.fileDetail.cliDesc}
            </p>
            <CliSnippet r2Key={file.r2Key} filename={filename} />
          </div>
        </div>

        {/* Right Col: Specifications & QA Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Metadata Specs Box */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">
              {dict.fileDetail.detailsTitle}
            </h3>

            <div className="space-y-3 text-xs divide-y divide-slate-800/80">
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{isVi ? "Tên Tệp Tin:" : "Filename:"}</span>
                <span className="font-mono text-slate-200 font-semibold">{filename}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{isVi ? "Dung Lượng Hiển Thị:" : "Formatted Size:"}</span>
                <span className="font-bold text-white">{formatBytes(file.sizeBytes)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{isVi ? "Số Byte Chính Xác:" : "Exact Bytes:"}</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {file.sizeBytes.toLocaleString()} B
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{isVi ? "Định Dạng / MIME:" : "MIME Type:"}</span>
                <span className="font-mono text-slate-300 truncate max-w-[200px]" title={meta.mimeType}>
                  {meta.mimeType}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{isVi ? "Ký Hiệu Magic Bytes:" : "Magic Bytes:"}</span>
                <span className="font-mono text-blue-400">{meta.magicBytes}</span>
              </div>
            </div>
          </div>

          {/* QA Verification Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {dict.fileDetail.checklistTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {dict.fileDetail.checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-Promotion Banner */}
      <CrossPromoBanner type={type === "jpg" || type === "png" ? "image" : "default"} />

      {/* Sibling Sizes */}
      {siblingFiles.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {isVi ? `Các Kích Thước Khác Của ${displayName}` : `Other Sizes for ${meta.name}`}
              </h2>
              <p className="text-xs text-slate-400">
                {isVi
                  ? `Cần dung lượng khác? Tải các file mẫu ${meta.extension} khác dưới đây:`
                  : `Need a different size? Download other pre-configured ${meta.extension} sample files:`}
              </p>
            </div>
            <Link
              href={`${prefix}/${type}`}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? `Tất Cả File ${meta.extension.toUpperCase()}` : `All ${meta.extension.toUpperCase()} Files`}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingFiles.slice(0, 4).map((f) => (
              <Link
                key={f.slug}
                href={`${prefix}/${f.type}/${f.slug}`}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {f.label}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {formatBytes(f.sizeBytes)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad Unit */}
      <AdUnit slot="8899001122" format="auto" label={isVi ? "Quảng cáo" : "Advertisement"} />
    </div>
  );
}
