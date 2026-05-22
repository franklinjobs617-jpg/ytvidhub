import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/download-youtube-subtitles-online";
  const alternates = buildAlternates(locale, pathname);
  const title = "Download YouTube Subtitles Online Free - SRT, VTT, TXT";
  const description =
    "Download YouTube subtitles online for free. Paste any YouTube video URL and export captions as SRT, VTT, or TXT without installing software.";

  return {
    title,
    description,
    keywords:
      "download youtube subtitles online, download youtube subtitles free, download youtube subs, youtube subtitle download online",
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

export default async function DownloadYouTubeSubtitlesOnlineLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/download-youtube-subtitles-online", "Download YouTube Subtitles Online");

  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
