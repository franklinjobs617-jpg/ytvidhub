import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export default async function HowToDownloadStudioSubtitlesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/how-to-download-youtube-studio-subtitles", "YouTube Studio Subtitles");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
