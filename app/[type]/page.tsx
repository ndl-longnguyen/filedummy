import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FILE_TYPES, getAllFileTypes, FileType } from "@/lib/files";
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
  if (!meta) return {};

  const title = `Download Sample ${meta.name} Files (${meta.extension.toUpperCase()}) | FileDummy`;
  const description = `Download dummy and sample ${meta.name} files in multiple sizes (1MB up to 1GB). Clean, verified, and virus-free ${meta.extension} test files for QA engineers and developers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${type}`,
      type: "website",
    },
    alternates: getAlternateLanguages(`/${type}`, "en"),
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

  return <CategoryPageContent type={type} locale="en" />;
}
