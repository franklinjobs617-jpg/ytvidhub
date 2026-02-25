import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'How to Use Our YouTube Subtitle Downloader | YTVidHub',
    description: 'A step-by-step guide on how to download YouTube subtitles. Learn to use our tool for single videos, bulk downloads with unlimited URLs for Pro users, and choosing the right format.',
    alternates: buildAlternates(locale, '/how-to-use'),
  };
}

export default function HowToUseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
