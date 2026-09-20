import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { getBlogPost, getPublishedPosts } from "@/lib/blog";
import { BlogLayout } from "@/components/BlogLayout";
import { StructuredData } from "@/components/StructuredData";
import { getAlternateLanguages, SITE_URL } from "@/lib/i18n/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | FileDummy`,
    description: post.description,
    keywords: post.tags,
    alternates: getAlternateLanguages(`/blog/${slug}`, "en"),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: "FileDummy",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  let PostContent: React.ComponentType;
  try {
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mdxModule.default;
  } catch (error) {
    console.error(`Failed to load MDX for slug: ${slug}`, error);
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Nguyen Dai Long",
      url: "https://ndlong.site",
      jobTitle: "Backend Lead & Distributed Systems Engineer",
    },
    publisher: {
      "@type": "Organization",
      name: "FileDummy (NDL Ecosystem)",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  const faqSchema =
    post.faqItems && post.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  const schemas = faqSchema ? [articleSchema, faqSchema] : [articleSchema];

  return (
    <BlogLayout post={post} locale="en">
      <StructuredData data={schemas} />
      <PostContent />
    </BlogLayout>
  );
}
