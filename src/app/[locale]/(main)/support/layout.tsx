import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Support & Help Center | YTVidHub YouTube Subtitle Downloader',
    description: 'Get help with YTVidHub YouTube subtitle downloader. Contact our support team, find answers to common questions, and learn how to use our bulk download features.',
    alternates: buildAlternates(locale, '/support'),
  };
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
