import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Bulk YouTube Subtitle Extraction for LLM Datasets: The Technical Guide | YTVidHub",
  description: "A deep dive into extracting clean, high-signal conversational data from YouTube for Llama-3, GPT-4, and Mistral training. Learn to optimize token efficiency and scale dataset preparation.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/youtube-subtitles-for-llm-data/",
  },
};

export default async function YouTubeSubtitlesForLLMDataLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/youtube-subtitles-for-llm-data", "YouTube Subtitles for LLM Data");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}