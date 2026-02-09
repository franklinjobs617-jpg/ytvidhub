import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Top Spanish YouTube Channels for Language Learning Subtitles",
  description: "Find the best Spanish YouTube channels with quality subtitles for language learning. Download transcripts easily for study materials.",
  alternates: {
    canonical: "https://ytvidhub.com/blog/spanish-yt-channels-subtitles/",
  },
};

export default function SpanishYTChannelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}