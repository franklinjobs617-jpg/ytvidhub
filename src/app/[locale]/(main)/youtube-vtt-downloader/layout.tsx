import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/youtube-vtt-downloader";
  const alternates = buildAlternates(locale, pathname);
  const title = "YouTube VTT Downloader Free - Download WebVTT Captions";
  const description =
    "Download YouTube subtitles as VTT files for HTML5 video and web players. Paste a YouTube URL and export WebVTT captions online.";

  return {
    title,
    description,
    keywords:
      "youtube vtt downloader, vtt download, vtt subtitles download, download youtube vtt, webvtt captions",
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
      images: [{ url: "/image/og-image.webp", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/og-image.webp"],
    },
  };
}

export default async function YouTubeVttDownloaderLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/youtube-vtt-downloader", "YouTube VTT Downloader");

  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
