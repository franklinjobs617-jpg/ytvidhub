import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Data Prep Toolkit: Complete Guide for YouTube Subtitles",
  description: "Comprehensive guide to preparing YouTube subtitles for data analysis, AI training, and research. Includes tools and best practices for clean data extraction.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/data-prep-toolkit/",
  },
};

export default async function DataPrepToolkitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/data-prep-toolkit", "Data Prep Toolkit");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}