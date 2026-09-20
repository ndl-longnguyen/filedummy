import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  alternates: getAlternateLanguages("/", "en"),
};

export default function HomePage() {
  return <HomePageContent locale="en" />;
}
