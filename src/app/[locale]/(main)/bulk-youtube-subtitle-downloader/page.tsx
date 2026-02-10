import { Metadata } from "next";
import BulkDownloaderClient from "./BulkDownloaderClient";
import { buildCanonicalUrl } from "@/lib/url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const pathname = "/bulk-youtube-subtitle-downloader";
  const canonicalUrl = buildCanonicalUrl({ locale, pathname });

  return {
    title: "Bulk YouTube Subtitle Downloader | Extract Captions from Playlists | YTVidHub",
    description: "Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT captions from entire playlists, channels, and multiple videos.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname }),
        'es': buildCanonicalUrl({ locale: 'es', pathname }),
      },
    },
  };
}

export default async function BulkDownloaderPage({ params }: Props) {
  const { locale } = await params;
  return <BulkDownloaderClient locale={locale} />;
}