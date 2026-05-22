import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { resourceBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/downsub-alternative";
  const alternates = buildAlternates(locale, pathname);
  const title = "DownSub Alternative for YouTube Subtitles | YTVidHub";
  const description =
    "Compare YTVidHub as a DownSub alternative for downloading YouTube subtitles, captions, SRT, VTT, TXT, playlists, and AI-ready transcript workflows.";

  return {
    title,
    description,
    keywords:
      "downsub alternative, downsub vs ytvidhub, sites like downsub, youtube subtitle downloader alternative",
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "article",
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

export default async function DownSubAlternativeLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = resourceBreadcrumbs(locale, "/downsub-alternative", "DownSub Alternative");

  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
