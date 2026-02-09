import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Essential YouTube Subtitle Extractor Online: Cut the Crap, Get the Text",
  description: "Professional YouTube Subtitle Extractor Online. Extract clean SRT, TXT, and VTT data for LLM training and research. Bulk process entire playlists without ASR noise.",
  alternates: {
    canonical: "https://ytvidhub.com/tools/subtitle-extractor-online/",
  },
};

export default function SubtitleExtractorOnlineLayout({ children }: { children: React.ReactNode }) {
  return children;
}