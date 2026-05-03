import { Metadata } from "next";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "YouTube Subtitles API Alternatives: Free Export to JSON/TXT",
  description: "Discover free alternatives to the YouTube Subtitles API. Export clean subtitles directly to JSON or TXT format for development or research.",
  alternates: {
    canonical: "https://ytvidhub.com/guide/youtube-subtitles-api-free/",
  },
};

export default async function YouTubeSubtitlesAPIFreeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/youtube-subtitles-api-free", "YouTube Subtitles API Alternatives");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}