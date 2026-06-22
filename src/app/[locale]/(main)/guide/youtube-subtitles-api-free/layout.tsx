import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/youtube-subtitles-api-free");
  const canonicalUrl = alternates.canonical;

  // ⚠️ TDH改动 — 原因：排名9.0但CTR仅0.25%，Title过于技术化缺少行动诱因
  // 改法：保留核心词"YouTube Subtitles API"，加入"Free"、"No OAuth"、"Instant"
  //       让搜索意图（想要免费API替代方案）在标题里得到即时确认
  // 原Title: "Free YouTube Subtitles API Alternative - Export JSON, TXT, SRT"
  // 原Desc:  "Use a free YouTube subtitles API alternative to export..."
  const title = "Free YouTube Subtitles API — No OAuth, No Quota Limits | YTVidHub";
  const description = "Skip the YouTube Data API setup. Download YouTube subtitles as SRT, VTT, TXT, or JSON instantly — no OAuth, no 10,000 unit quota, no captions.download costs. Free to start.";

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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

export default async function YouTubeSubtitlesAPIFreeLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/youtube-subtitles-api-free", "YouTube Subtitles API Alternatives");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
