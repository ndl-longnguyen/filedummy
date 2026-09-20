import type { Metadata } from "next";
import { BlogIndexPageContent } from "@/components/BlogIndexPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Blog Kỹ Thuật Lập Trình — Xử Lý File, Bảo Mật & Lưu Trữ Đám Mây | FileDummy",
  description:
    "36 bài viết kỹ thuật chuyên sâu về tải file, bảo mật mã hóa, xử lý định dạng, kiểm thử QA và lưu trữ đám mây. Tặng kèm file mẫu miễn phí cho mỗi bài hướng dẫn.",
  openGraph: {
    title: "Blog Kỹ Thuật Lập Trình — Xử Lý File, Bảo Mật & Lưu Trữ Đám Mây | FileDummy",
    description:
      "36 bài viết kỹ thuật chuyên sâu về tải file, bảo mật mã hóa, xử lý định dạng, kiểm thử QA và lưu trữ đám mây. Tặng kèm file mẫu miễn phí cho mỗi bài hướng dẫn.",
    url: `${SITE_URL}/vi/blog`,
    type: "website",
  },
  alternates: getAlternateLanguages("/blog", "vi"),
};

export default function VietnameseBlogIndexPage() {
  return <BlogIndexPageContent locale="vi" />;
}
