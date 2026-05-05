import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/data-prep-toolkit");
  const title = "Data Prep Toolkit: Complete Guide for YouTube Subtitles";
  const description = "Comprehensive guide to preparing YouTube subtitles for data analysis, AI training, and research. Includes tools and best practices for clean data extraction.";
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function DataPrepToolkitLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/data-prep-toolkit", "Data Prep Toolkit");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}