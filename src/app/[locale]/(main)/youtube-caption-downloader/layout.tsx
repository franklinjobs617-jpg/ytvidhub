import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/youtube-caption-downloader";
  const alternates = buildAlternates(locale, pathname);
  const title = "YouTube Caption Downloader Free - Download CC as SRT, VTT, TXT";
  const description =
    "Download YouTube captions and CC tracks online as SRT, VTT, or TXT. Paste a video URL and export available captions free with no software install.";

  return {
    title,
    description,
    keywords:
      "youtube caption downloader, youtube cc downloader, download youtube captions, youtube closed captions download, caption downloader",
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

export default async function YouTubeCaptionDownloaderLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/youtube-caption-downloader", "YouTube Caption Downloader");

  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
