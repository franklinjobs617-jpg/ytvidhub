import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export default async function HowToDownloadSubtitlesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/how-to-download-youtube-subtitles-complete-guide", "How to Download YouTube Subtitles");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
