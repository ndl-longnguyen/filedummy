import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "FileDummy";
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FileDummy — Free Sample Files & Dummy File Generator for Testing",
    template: `%s | ${siteName}`,
  },
  description:
    "Download free sample and dummy files in PDF, DOCX, TXT, JPG, PNG, CSV, JSON, and ZIP formats. Sized from 50KB up to 1GB for QA testing, file upload validation, and API benchmarks.",
  keywords: [
    "sample pdf file download",
    "dummy pdf file for testing",
    "test pdf file 10mb",
    "large pdf file download",
    "sample docx file",
    "dummy word document download",
    "test file 1gb download",
    "sample file for upload testing",
    "dummy file generator",
    "large test file download",
    "fake pdf file",
    "placeholder document download",
  ],
  authors: [{ name: "FileDummy Team" }],
  creator: "FileDummy",
  publisher: "FileDummy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "FileDummy — Free Sample Files & Dummy Generator for Testing",
    description:
      "Instant free download of clean sample dummy files in PDF, DOCX, TXT, Images, Datasets, and Archives from 100KB to 1GB.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FileDummy — Free Sample Files & Dummy Generator Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FileDummy — Free Sample Files & Dummy Generator for Testing",
    description:
      "Instant free download of clean sample dummy files in PDF, DOCX, TXT, Images, Datasets, and Archives from 100KB to 1GB.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Google AdSense */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased flex flex-col selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
