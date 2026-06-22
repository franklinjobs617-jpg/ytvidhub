import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/add-on");

  // ⚠️ TDH改动 — 原因：排名6.6但CTR仅0.68%，Title缺少用户点击诱因
  // 改法：保留核心词"YouTube Subtitle Downloader Extension"，
  //       加入"Free"、"10,000+ users"提升可信度和点击欲望
  // 原Title: "YTVidHub Browser Extension — Download YouTube Subtitles in One Click"
  // 原Desc:  "Install the free YTVidHub Chrome extension..."
  const title = "Free YouTube Subtitle Downloader Extension — 10,000+ Users | YTVidHub";
  const description = "The free Chrome extension to download YouTube subtitles in one click — SRT, VTT, TXT. No copy-paste, no page switching. Trusted by 10,000+ users. Install in 5 seconds.";

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
