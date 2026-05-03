import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "YouTube Transcript to Text | No Timestamps, Clean TXT",
    description:
      "Download YouTube transcript as text in seconds. Remove timestamps and export clean TXT for AI workflows, notes, and research.",
    keywords: [
      "download youtube transcript as text",
      "download youtube transcript without timestamp",
      "youtube transcript no timestamps",
      "youtube transcript txt download",
      "clean youtube transcript text",
    ],
    openGraph: {
      title: "YouTube Transcript to Text | No Timestamps, Clean TXT",
      description:
        "Export clean YouTube transcript text without timestamps. Ideal for AI training, notes, and content repurposing.",
      type: "article",
    },
    alternates: buildAlternates(locale, "/download-youtube-transcript-as-text"),
  };
}

export default async function DownloadYouTubeTranscriptAsTextLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/download-youtube-transcript-as-text", "Transcript as Text");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}

