import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/youtube-subtitles-for-llm-data");
  const title = "Bulk YouTube Subtitle Extraction for LLM Datasets: The Technical Guide | YTVidHub";
  const description = "A deep dive into extracting clean, high-signal conversational data from YouTube for Llama-3, GPT-4, and Mistral training. Learn to optimize token efficiency and scale dataset preparation.";
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function YouTubeSubtitlesForLLMDataLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/youtube-subtitles-for-llm-data", "YouTube Subtitles for LLM Data");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}