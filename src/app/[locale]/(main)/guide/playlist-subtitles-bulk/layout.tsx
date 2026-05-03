import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Bulk Download: How to Get All YouTube Playlist Subtitles in 1 ZIP",
  description: "The fastest way to download all YouTube playlist subtitles in bulk. Use YTVidHub to get clean, research-ready TXT files instantly.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/playlist-subtitles-bulk/",
  },
};

export default async function PlaylistSubtitlesBulkLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/playlist-subtitles-bulk", "Playlist Subtitles Bulk");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}