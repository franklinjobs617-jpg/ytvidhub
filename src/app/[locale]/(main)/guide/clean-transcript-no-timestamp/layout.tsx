import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean Subtitles: Remove Timestamps for Research & LLM Data",
  description: "Learn the best method to remove timestamps and ASR noise from YouTube subtitles. Get research-ready, clean text data for your projects.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/clean-transcript-no-timestamp",
  },
};

export default function CleanTranscriptNoTimestampLayout({ children }: { children: React.ReactNode }) {
  return children;
}