import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/add-on");

  const title = "YTVidHub Browser Extension — Download YouTube Subtitles in One Click";
  const description = "Install the free YTVidHub Chrome extension to download YouTube subtitles directly from any video page. One-click SRT, VTT, and TXT export without leaving YouTube.";

  return {
    title,
    description,
    keywords: [
      "youtube subtitle downloader extension",
      "chrome extension youtube subtitles",
      "download youtube subtitles chrome",
      "youtube caption downloader extension",
      "browser extension youtube transcript",
    ],
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function AddOnLayout({ children }: Props) {
  return children;
}
