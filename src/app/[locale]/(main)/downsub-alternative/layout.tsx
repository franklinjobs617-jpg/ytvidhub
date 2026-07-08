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

// FAQPage Schema — AI GEO + 규칙 파일 요구사항
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good free alternative to DownSub?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YTVidHub is a free DownSub alternative for downloading YouTube subtitles, captions, and transcripts. It supports SRT, VTT, and TXT formats, bulk playlist and channel downloads, and AI-powered video summaries. Free accounts get 5 credits on signup.",
      },
    },
    {
      "@type": "Question",
      name: "How does YTVidHub compare to DownSub?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both tools support YouTube subtitle downloads. YTVidHub adds bulk playlist and channel downloads, clean TXT transcript export, AI video summaries, study card generation, and a workspace for managing multiple videos. DownSub is primarily a single-video subtitle download utility.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download subtitles from a YouTube playlist without DownSub?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub supports bulk subtitle and transcript downloads from entire YouTube playlists and channels. Paste a playlist URL and download all subtitle files at once as a ZIP — no video-by-video repetition.",
      },
    },
    {
      "@type": "Question",
      name: "Does YTVidHub support SRT and VTT like DownSub?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub exports YouTube subtitles as SRT (for video editing and broad compatibility), VTT (for HTML5 web video and course platforms), and TXT (clean text for notes, research, and AI tools).",
      },
    },
    {
      "@type": "Question",
      name: "Is YTVidHub free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub is free to start. Guest users get 2 free tries per 24 hours. Free accounts get 5 credits on signup with no credit card required. Pro plans start at $19.99/month for 500 credits.",
      },
    },
  ],
};

export default async function DownSubAlternativeLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = resourceBreadcrumbs(locale, "/downsub-alternative", "DownSub Alternative");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
