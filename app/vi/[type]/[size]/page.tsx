import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FILES, getFile, FILE_TYPES, FileType } from "@/lib/files";
import { VI_FILE_TYPES } from "@/lib/i18n/files-i18n";
import { FileDetailPageContent } from "@/components/FileDetailPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

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
  const viMeta = VI_FILE_TYPES[type as FileType];

  if (!file || !meta) return {};

  const name = viMeta ? viMeta.name : meta.name;
  const filename = file.r2Key.split("/").pop();
  const title = `Tải Tệp Mẫu ${name} ${file.label} (${filename}) | FileDummy`;
  const description = `Tải tệp mẫu ${name} chuẩn xác ${file.label} (${file.sizeBytes.toLocaleString()} bytes). Cấu trúc header hợp lệ, magic bytes chuẩn xác cho kiểm thử tải lên và phát triển phần mềm.`;

  return {
    title,
    description,
    keywords: [
      `tải file ${type} ${file.label}`,
      `file mẫu ${type} ${file.slug}`,
      `test ${file.label} ${type} file`,
      `${filename} download`,
      `kiểm thử upload ${type} ${file.label}`,
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/vi/${type}/${size}`,
      siteName: "FileDummy",
      type: "website",
    },
    alternates: getAlternateLanguages(`/${type}/${size}`, "vi"),
  };
}

export default async function VietnameseFileDetailPage({
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

  return <FileDetailPageContent type={type} size={size} locale="vi" />;
}
