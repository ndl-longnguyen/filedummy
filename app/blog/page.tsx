import type { Metadata } from "next";
import { BlogIndexPageContent } from "@/components/BlogIndexPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Developer Blog — File Upload, Security & Cloud Storage Guides | FileDummy",
  description:
    "36 technical articles on file upload, security, processing, testing, and cloud storage. Free sample files included with every tutorial.",
  openGraph: {
    title: "Developer Blog | FileDummy",
    description:
      "Technical guides on file upload, security, cloud storage, and testing with free sample files.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  alternates: getAlternateLanguages("/blog", "en"),
};

export const revalidate = 3600;

export default function BlogIndexPage() {
  return <BlogIndexPageContent locale="en" />;
}
