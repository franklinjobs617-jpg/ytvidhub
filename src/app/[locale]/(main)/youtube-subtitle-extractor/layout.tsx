import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export default async function YouTubeSubtitleExtractorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, '/youtube-subtitle-extractor', 'YouTube Subtitle Extractor');
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
