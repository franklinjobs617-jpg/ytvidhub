import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/playlist-subtitles-bulk");
  const title = "Bulk Download: How to Get All YouTube Playlist Subtitles in 1 ZIP";
  const description = "The fastest way to download all YouTube playlist subtitles in bulk. Use YTVidHub to get clean, research-ready TXT files instantly.";
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PlaylistSubtitlesBulkLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/playlist-subtitles-bulk", "Playlist Subtitles Bulk");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}