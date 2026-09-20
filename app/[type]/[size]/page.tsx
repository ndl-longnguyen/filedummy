import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FILES, getFile, FILE_TYPES, FileType } from "@/lib/files";
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

  if (!file || !meta) return {};

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
      url: `${SITE_URL}/${type}/${size}`,
      siteName: "FileDummy",
      type: "website",
    },
    alternates: getAlternateLanguages(`/${type}/${size}`, "en"),
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

  return <FileDetailPageContent type={type} size={size} locale="en" />;
}
