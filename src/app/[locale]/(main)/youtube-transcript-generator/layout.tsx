import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export default async function YouTubeTranscriptGeneratorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, '/youtube-transcript-generator', 'YouTube Transcript Generator');
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
