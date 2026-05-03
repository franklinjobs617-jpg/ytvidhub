import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Download YouTube Transcript as Text (No Timestamps) | YTVidHub",
  description: "Learn how to download YouTube transcript as text and remove timestamps in seconds. Create clean transcript files for AI, notes, and research workflows.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/clean-transcript-no-timestamp/",
  },
};

export default async function CleanTranscriptNoTimestampLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/clean-transcript-no-timestamp", "Clean Transcript (No Timestamps)");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
