import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "FileDummy — Kho File Mẫu & Tạo Dummy File Chuẩn Cho Testing & QA",
  description:
    "Tải file mẫu miễn phí cho PDF, DOCX, TXT, JPG, PNG, CSV, JSON và ZIP. Kích thước từ 50KB đến 1GB cho kiểm thử QA, xác thực upload và benchmark API.",
  alternates: getAlternateLanguages("/", "vi"),
  openGraph: {
    title: "FileDummy — Kho File Mẫu & Tạo Dummy File Chuẩn Cho Testing & QA",
    description:
      "Tải file mẫu miễn phí cho PDF, DOCX, TXT, JPG, PNG, CSV, JSON và ZIP. Kích thước từ 50KB đến 1GB cho kiểm thử QA, xác thực upload và benchmark API.",
    url: `${SITE_URL}/vi`,
    type: "website",
  },
};

export default function VietnameseHomePage() {
  return <HomePageContent locale="vi" />;
}
