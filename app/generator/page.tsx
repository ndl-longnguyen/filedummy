import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CustomFileGenerator } from "@/components/CustomFileGenerator";
import { StructuredData } from "@/components/StructuredData";
import { HardDrive, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Dummy File Generator — Create Dummy Files Online (Any Size)",
  description:
    "Generate dummy and sample files of any custom size (from 1KB up to 100MB) directly in your browser. Supports TXT, PDF, CSV, JSON, and binary data formats.",
  openGraph: {
    title: "Custom Dummy File Generator — Create Dummy Files Online (Any Size)",
    description:
      "Generate dummy and sample files of any custom size (from 1KB up to 100MB) directly in your browser. Supports TXT, PDF, CSV, JSON, and binary data formats.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site"}/generator`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site"}/generator`,
  },
};

export default function GeneratorPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Custom Dummy File Generator",
    "url": `${siteUrl}/generator`,
    "description": "Generate custom size dummy files in your browser for testing and development.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData data={appSchema} />

      <Breadcrumbs items={[{ label: "Custom Generator" }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Custom Dummy File Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Need a specific file size like 3.7MB or 18MB for boundary testing? Use our instant browser generator to create and download custom-sized test files on demand.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Client-Side Generation
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" /> Zero Upload / Instant
          </span>
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-blue-400" /> Precise Byte Calculation
          </span>
        </div>
      </div>

      <CustomFileGenerator />
    </div>
  );
}
