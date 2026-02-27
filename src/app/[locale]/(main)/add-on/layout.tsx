import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YTVidHub Browser Extension — Download YouTube Subtitles in One Click",
  description:
    "Install the free YTVidHub Chrome extension to download YouTube subtitles directly from any video page. One-click SRT, VTT, and TXT export without leaving YouTube.",
  keywords: [
    "youtube subtitle downloader extension",
    "chrome extension youtube subtitles",
    "download youtube subtitles chrome",
    "youtube caption downloader extension",
    "browser extension youtube transcript",
  ],
  alternates: {
    canonical: "https://ytvidhub.com/add-on/",
  },
  openGraph: {
    title: "YTVidHub Browser Extension — Download YouTube Subtitles in One Click",
    description:
      "Free Chrome extension to download YouTube subtitles directly from any video page. SRT, VTT, TXT export in one click.",
    url: "https://ytvidhub.com/add-on/",
    type: "website",
  },
};

export default function AddOnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
