import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mastering VTT Subtitles: Clean Downloads for Data Analysis",
  description: "Stop manually cleaning WebVTT (.vtt) files. Learn how YTVidHub delivers the cleanest VTT data, bypasses the YouTube API limit, and enables bulk subtitle downloads for any data project.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/mastering-vtt-data-analysis",
  },
};

export default function MasteringVttDataAnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}