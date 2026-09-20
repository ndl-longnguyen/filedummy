import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CustomFileGenerator } from "@/components/CustomFileGenerator";
import { StructuredData } from "@/components/StructuredData";
import { HardDrive, ShieldCheck, Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n/types";

interface GeneratorPageContentProps {
  locale?: Locale;
}

export function GeneratorPageContent({ locale = "en" }: GeneratorPageContentProps) {
  const isVi = locale === "vi";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isVi ? "Công Cụ Tạo File Dummy Tùy Chỉnh" : "Custom Dummy File Generator",
    url: isVi ? `${siteUrl}/vi/generator` : `${siteUrl}/generator`,
    description: isVi
      ? "Tạo file dummy dung lượng tùy chỉnh trên trình duyệt cho kiểm thử và phát triển phần mềm."
      : "Generate custom size dummy files in your browser for testing and development.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <StructuredData data={appSchema} />

      <Breadcrumbs items={[{ label: isVi ? "Tạo File Tùy Chỉnh" : "Custom Generator" }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {isVi ? "Công Cụ Tạo Dummy File Tùy Chỉnh" : "Custom Dummy File Generator"}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isVi
            ? "Bạn cần mức kích thước chính xác như 3.7MB hay 18MB để kiểm thử ranh giới dung lượng? Hãy dùng công cụ tạo file trực tuyến để tạo và tải ngay về máy."
            : "Need a specific file size like 3.7MB or 18MB for boundary testing? Use our instant browser generator to create and download custom-sized test files on demand."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />{" "}
            {isVi ? "Tạo 100% Phía Trình Duyệt" : "100% Client-Side Generation"}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />{" "}
            {isVi ? "Không Cần Tải Lên / Tức Thì" : "Zero Upload / Instant"}
          </span>
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-blue-400" />{" "}
            {isVi ? "Tính Số Byte Chuẩn Xác" : "Precise Byte Calculation"}
          </span>
        </div>
      </div>

      <CustomFileGenerator locale={locale} />
    </div>
  );
}
