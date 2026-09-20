import { Metadata } from "next";
import { GeneratorPageContent } from "@/components/GeneratorPageContent";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Custom Dummy File Generator — Create Dummy Files Online (Any Size)",
  description:
    "Generate dummy and sample files of any custom size (from 1KB up to 100MB) directly in your browser. Supports TXT, PDF, CSV, JSON, and binary data formats.",
  openGraph: {
    title: "Custom Dummy File Generator — Create Dummy Files Online (Any Size)",
    description:
      "Generate dummy and sample files of any custom size (from 1KB up to 100MB) directly in your browser. Supports TXT, PDF, CSV, JSON, and binary data formats.",
    url: `${SITE_URL}/generator`,
  },
  alternates: getAlternateLanguages("/generator", "en"),
};

export default function GeneratorPage() {
  return <GeneratorPageContent locale="en" />;
}
