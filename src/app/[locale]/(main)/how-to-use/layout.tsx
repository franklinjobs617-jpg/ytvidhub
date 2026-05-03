import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import BreadcrumbSchema, { guideBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'How to Use Our YouTube Subtitle Downloader | YTVidHub',
    description: 'A step-by-step guide on how to download YouTube subtitles. Learn to use our tool for single videos, bulk downloads with unlimited URLs for Pro users, and choosing the right format.',
    keywords: [
      'how to use youtube subtitle downloader',
      'how to download youtube subtitles',
      'youtube subtitle tutorial',
      'youtube subtitle guide',
      'ythow to download youtube subtitles',
    ],
    alternates: buildAlternates(locale, '/how-to-use'),
  };
}

export default async function HowToUseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, '/how-to-use', 'How to Use');
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
