import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Get a Transcript of a YouTube Video: 3 Easy Ways in 2026 | YTVidHub",
    description: "Learn how to get a transcript of a YouTube video using YouTube's built-in feature or automatically with YTVidHub. Download transcripts in multiple formats for AI training, content repurposing, and more.",
    alternates: buildAlternates(locale, '/blog/how-to-get-youtube-video-transcript'),
  };
}

export default function HowToGetYouTubeTranscriptLayout({ children }: { children: React.ReactNode }) {
  return children;
}