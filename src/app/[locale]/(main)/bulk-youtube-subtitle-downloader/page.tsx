import { Metadata } from "next";
import BulkDownloaderClient from "./BulkDownloaderClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = "https://ytvidhub.com";
  const path = "/bulk-youtube-subtitle-downloader/";
  const localePath = locale === 'en' ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}${path}/`;

  return {
    title: "Bulk YouTube Subtitle Downloader | Extract Captions from Playlists | YTVidHub",
    description: "Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT captions from entire playlists, channels, and multiple videos.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}${path}/`,
        'es': `${baseUrl}/es${path}/`,
      },
    },
  };
}

export default async function BulkDownloaderPage({ params }: Props) {
  const { locale } = await params;
  return <BulkDownloaderClient locale={locale} />;
}