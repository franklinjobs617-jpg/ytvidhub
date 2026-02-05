import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Hidden Problem in Your Data Pipeline: Why Multilingual Subtitles are Rarely 'Ready-to-Use'",
  description: "YTVidHub supports all languages, but we analyze why auto-generated multilingual subtitles have low accuracy. A must-read for researchers and data analysts before data prep.",
  alternates: {
    canonical: "https://ytvidhub.com/blog/subtitle-accuracy-problem",
  },
};

export default function SubtitleAccuracyLayout({ children }: { children: React.ReactNode }) {
  return children;
}