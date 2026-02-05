import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Creator Tutorials: Mastering YouTube Subtitles for Content Creation",
  description: "Learn how to leverage YouTube subtitles for content creation, repurposing, and audience engagement with YTVidHub's comprehensive tutorials.",
  alternates: {
    canonical: "https://ytvidhub.com/blog/creator-tutorials",
  },
};

export default function CreatorTutorialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}