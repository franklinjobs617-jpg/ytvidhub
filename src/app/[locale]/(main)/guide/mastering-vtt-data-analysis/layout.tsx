import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/mastering-vtt-data-analysis");
  const title = "Mastering VTT Subtitles: Clean Downloads for Data Analysis";
  const description = "Stop manually cleaning WebVTT (.vtt) files. Learn how YTVidHub delivers the cleanest VTT data, bypasses the YouTube API limit, and enables bulk subtitle downloads for any data project.";
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MasteringVttDataAnalysisLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/mastering-vtt-data-analysis", "Mastering VTT Data Analysis");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}