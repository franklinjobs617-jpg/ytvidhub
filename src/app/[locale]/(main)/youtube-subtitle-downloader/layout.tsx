import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function YouTubeSubtitleDownloaderLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/youtube-subtitle-downloader", "YouTube Subtitle Downloader");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
