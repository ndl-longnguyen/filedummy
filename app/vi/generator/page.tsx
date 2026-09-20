import { Metadata } from "next";
import { GeneratorPageContent } from "@/components/GeneratorPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Công Cụ Tạo Dummy File Tùy Chỉnh — Tạo Tệp Mẫu Trực Tuyến Mọi Kích Thước | FileDummy",
  description:
    "Tạo tệp mẫu và file dummy với kích thước tùy ý (từ 1KB đến 100MB) trực tiếp trên trình duyệt. Hỗ trợ định dạng TXT, PDF, CSV, JSON và binary data.",
  openGraph: {
    title: "Công Cụ Tạo Dummy File Tùy Chỉnh — Tạo Tệp Mẫu Trực Tuyến Mọi Kích Thước | FileDummy",
    description:
      "Tạo tệp mẫu và file dummy với kích thước tùy ý (từ 1KB đến 100MB) trực tiếp trên trình duyệt. Hỗ trợ định dạng TXT, PDF, CSV, JSON và binary data.",
    url: `${SITE_URL}/vi/generator`,
  },
  alternates: getAlternateLanguages("/generator", "vi"),
};

export default function VietnameseGeneratorPage() {
  return <GeneratorPageContent locale="vi" />;
}
