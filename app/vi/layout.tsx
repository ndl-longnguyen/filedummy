import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://filedummy.ndlong.site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/vi`,
    languages: {
      en: siteUrl,
      vi: `${siteUrl}/vi`,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    locale: "vi_VN",
  },
};

export default function ViLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: 'document.documentElement.lang="vi";',
        }}
      />
      <div lang="vi" className="contents">
        {children}
      </div>
    </>
  );
}
