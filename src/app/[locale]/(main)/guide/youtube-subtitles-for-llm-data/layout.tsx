import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk YouTube Subtitle Extraction for LLM Datasets: The Technical Guide | YTVidHub",
  description: "A deep dive into extracting clean, high-signal conversational data from YouTube for Llama-3, GPT-4, and Mistral training. Learn to optimize token efficiency and scale dataset preparation.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/youtube-subtitles-for-llm-data",
  },
};

export default function YouTubeSubtitlesForLLMDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}