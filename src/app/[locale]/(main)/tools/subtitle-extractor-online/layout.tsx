import { Metadata } from "next";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "The Essential YouTube Subtitle Extractor Online: Cut the Crap, Get the Text",
  description: "Professional YouTube Subtitle Extractor Online. Extract clean SRT, TXT, and VTT data for LLM training and research. Bulk process entire playlists without ASR noise.",
  alternates: {
    canonical: "https://ytvidhub.com/tools/subtitle-extractor-online/",
  },
};

export default async function SubtitleExtractorOnlineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/tools/subtitle-extractor-online", "Subtitle Extractor Online");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}