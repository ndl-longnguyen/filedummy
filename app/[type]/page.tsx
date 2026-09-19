import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Info, HardDrive, ArrowRight, ShieldCheck } from "lucide-react";
import { FILE_TYPES, getFilesByType, getAllFileTypes, FileType } from "@/lib/files";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SizeTable } from "@/components/SizeTable";
import { FileCard } from "@/components/FileCard";
import { AdUnit } from "@/components/AdUnit";
import { StructuredData } from "@/components/StructuredData";
import { CrossPromoBanner } from "@/components/CrossPromoBanner";

export function generateStaticParams() {
  return getAllFileTypes().map((t) => ({ type: t.type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const meta = FILE_TYPES[type as FileType];
  if (!meta) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
  const title = `Download Sample ${meta.name} Files (${meta.extension.toUpperCase()}) | FileDummy`;
  const description = `Download dummy and sample ${meta.name} files in multiple sizes (1MB up to 1GB). Clean, verified, and virus-free ${meta.extension} test files for QA engineers and developers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${type}`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/${type}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const meta = FILE_TYPES[type as FileType];

  if (!meta) {
    notFound();
  }

  const files = getFilesByType(type);
  const allTypes = getAllFileTypes().filter((t) => t.type !== type);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

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
    ],
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `Sample ${meta.name} Files Collection`,
    "description": meta.longDesc,
    "url": `${siteUrl}/${type}`,
    "keywords": [
      `sample ${type} file`,
      `dummy ${type} download`,
      `test ${type} file`,
      `${meta.extension} testing`,
    ],
    "isAccessibleForFree": true,
    "creator": {
      "@type": "Organization",
      "name": "FileDummy",
      "url": siteUrl,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData data={[breadcrumbSchema, datasetSchema]} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: meta.name }]} />

      {/* Category Header */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${meta.badgeBg} ${meta.badgeText}`}
            >
              {meta.category} Format
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Extension: {meta.extension}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              MIME: {meta.mimeType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Download Sample {meta.name} Files
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {meta.longDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standardized File Headers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>{files.length} Size Variants Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Magic Bytes: {meta.magicBytes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdUnit slot="3344556677" format="horizontal" label="Advertisement" />

      {/* Size Comparison Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            All Available Sizes for {meta.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare sizes, check precise byte counts, copy links, or download directly.
          </p>
        </div>

        <SizeTable files={files} typeLabel={meta.extension.toUpperCase()} />
      </section>

      {/* Visual Cards Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Individual {meta.name} Downloads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file) => (
            <FileCard key={file.r2Key} file={file} />
          ))}
        </div>
      </section>

      {/* QA & Testing Scenarios */}
      <section className="glass-panel rounded-2xl p-8 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Common Testing Scenarios for {meta.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          QA engineers and software developers use our {meta.extension} dummy files for the following test cases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {meta.testingScenarios.map((scenario, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{scenario}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contextual NDL Cross-Promotion Banner */}
      <CrossPromoBanner type={type === "jpg" || type === "png" ? "image" : "game"} />

      {/* Other Categories */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Explore Other File Formats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allTypes.map((t) => (
            <Link
              key={t.type}
              href={`/${t.type}`}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  {t.type}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {t.name.split(" ")[0]}
                </h4>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Ad Unit */}
      <AdUnit slot="7788990011" format="auto" label="Advertisement" />
    </div>
  );
}
