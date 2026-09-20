import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FILE_TYPES, getAllFileTypes, FileType } from "@/lib/files";
import { VI_FILE_TYPES } from "@/lib/i18n/files-i18n";
import { CategoryPageContent } from "@/components/CategoryPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

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
  const viMeta = VI_FILE_TYPES[type as FileType];
  if (!meta) return {};

  const name = viMeta ? viMeta.name : meta.name;
  const title = `Tải Tệp Mẫu ${name} (${meta.extension.toUpperCase()}) | FileDummy`;
  const description = viMeta
    ? viMeta.longDesc
    : `Tải tệp mẫu ${name} với nhiều kích thước từ 1MB đến 1GB. Tệp sạch, kiểm định an toàn cho lập trình viên và kiểm thử QA.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/vi/${type}`,
      type: "website",
    },
    alternates: getAlternateLanguages(`/${type}`, "vi"),
  };
}

export default async function VietnameseCategoryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const meta = FILE_TYPES[type as FileType];

  if (!meta) {
    notFound();
  }

  return <CategoryPageContent type={type} locale="vi" />;
}
