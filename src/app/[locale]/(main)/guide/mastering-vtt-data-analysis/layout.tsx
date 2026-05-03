import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Mastering VTT Subtitles: Clean Downloads for Data Analysis",
  description: "Stop manually cleaning WebVTT (.vtt) files. Learn how YTVidHub delivers the cleanest VTT data, bypasses the YouTube API limit, and enables bulk subtitle downloads for any data project.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/mastering-vtt-data-analysis/",
  },
};

export default async function MasteringVttDataAnalysisLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/mastering-vtt-data-analysis", "Mastering VTT Data Analysis");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}