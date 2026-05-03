import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Extract YouTube Subtitles Online Free | No Signup (2026)',
    description: 'Use our online subtitle extractor to parse YouTube videos and export SRT, VTT, or TXT. Best for extraction flow, quick checks, and format selection.',
    keywords: ['extract youtube subtitles online', 'youtube subtitle extractor', 'subtitle extractor online tool', 'youtube caption extractor online', 'extract subtitles from youtube video'],
    openGraph: {
      title: 'Extract YouTube Subtitles Online Free | No Signup (2026)',
      description: 'Parse YouTube subtitles online and export SRT, VTT, or TXT in a guided extraction workflow.',
      type: 'website',
    },
    alternates: buildAlternates(locale, '/extract-youtube-subtitles-online-tool'),
  };
}

export default async function ExtractToolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, '/extract-youtube-subtitles-online-tool', 'Extract Subtitles Online');
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
