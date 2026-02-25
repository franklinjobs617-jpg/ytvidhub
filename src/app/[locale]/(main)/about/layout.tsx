import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About YTVidHub | Our Mission & Contact Information',
    description: 'Learn about the mission behind YTVidHub, the team dedicated to providing the best free subtitle downloader, and how you can contact us for support or feedback.',
    alternates: buildAlternates(locale, '/about'),
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
