import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Get Transcript of YouTube Video (2026 Guide) | YTVidHub",
    description: "Learn how to get transcript of YouTube video using Show Transcript, manual copy, or instant download tools. Includes TXT, SRT, and fast workflow tips.",
    alternates: buildAlternates(locale, '/blog/how-to-get-youtube-video-transcript'),
  };
}

export default function HowToGetYouTubeTranscriptLayout({ children }: { children: React.ReactNode }) {
  return children;
}

