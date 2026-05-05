import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/data-prep-guide");

  const title = "LLM Data Preparation Guide: YouTube Transcript Extraction | YTVidHub";
  const description = "Master YouTube transcript extraction and cleaning for LLM training. Advanced techniques to eliminate ASR noise and build better AI datasets.";

  return {
    title,
    description,
    keywords: [
      "LLM data preparation",
      "YouTube transcript extraction",
      "ASR noise cleaning",
      "AI training data",
      "machine learning datasets",
      "subtitle data cleaning",
      "RAG system data",
      "NLP data preprocessing",
      "YouTube data for AI",
      "transcript cleaning pipeline",
    ],
    authors: [{ name: "Franklin Jobs" }],
    openGraph: {
      title: "The Definitive LLM Data Preparation Guide | YTVidHub",
      description: "Learn advanced techniques for extracting and cleaning YouTube transcripts for AI training. From bulk download to structured datasets.",
      url: alternates.canonical,
      type: "article",
      publishedTime: "2025-10-01T00:00:00.000Z",
      modifiedTime: "2025-10-15T00:00:00.000Z",
      authors: ["Franklin Jobs"],
      section: "Engineering",
      tags: ["LLM", "Data Preparation", "AI", "Machine Learning", "YouTube"],
      images: [{ url: "/image/data-prep-guide-og.webp", width: 1200, height: 630, alt: "LLM Data Preparation Guide - YouTube Transcript Extraction" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "LLM Data Preparation Guide | YTVidHub",
      description: "Master YouTube transcript extraction for AI training. Advanced cleaning techniques and pipeline optimization.",
      images: ["/image/data-prep-guide-og.webp"],
      creator: "@ytvidhub",
    },
    alternates,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
    other: {
      "article:author": "Franklin Jobs",
      "article:section": "Engineering",
      "article:published_time": "2025-10-01T00:00:00.000Z",
      "article:modified_time": "2025-10-15T00:00:00.000Z",
      "article:tag": "LLM, Data Preparation, AI, Machine Learning, YouTube",
    },
  };
}

export default function DataPrepGuideLayout({ children }: Props) {
  return children;
}