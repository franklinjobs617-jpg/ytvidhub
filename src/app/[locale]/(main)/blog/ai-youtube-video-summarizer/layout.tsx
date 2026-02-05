import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI YouTube Video Summarizer | Fast Bulk Summaries | YTvidHub",
  description: "Transform YouTube videos into actionable insights with YTVidHub AI Summarizer. Get fast bulk summaries, structured transcripts, and interactive analysis instantly.",
  alternates: {
    canonical: "https://ytvidhub.com/blog/ai-youtube-video-summarizer",
  },
};

export default function AIYouTubeVideoSummarizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}