import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download YouTube Transcript as Text (No Timestamps) | YTVidHub",
  description: "Learn how to download YouTube transcript as text and remove timestamps in seconds. Create clean transcript files for AI, notes, and research workflows.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/clean-transcript-no-timestamp/",
  },
};

export default function CleanTranscriptNoTimestampLayout({ children }: { children: React.ReactNode }) {
  return children;
}
