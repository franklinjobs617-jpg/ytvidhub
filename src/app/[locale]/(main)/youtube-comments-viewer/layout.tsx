import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/youtube-comments-viewer";
  const alternates = buildAlternates(locale, pathname);
  const title = "YouTube Comments Viewer - Read and Analyze Comments Free | YTVidHub";
  const description =
    "View all comments on any YouTube video. Sort by date or likes, filter by date range, browse replies, and see comment trends on an interactive graph. Free, no login.";

  return {
    title,
    description,
    keywords:
      "youtube comments viewer, view youtube comments, see oldest youtube comments, sort youtube comments by likes, youtube comment filter by date, youtube comment trends, youtube comment graph, all youtube comments, youtube comments sorter, free youtube comments viewer",
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

export default async function YouTubeCommentsViewerLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/youtube-comments-viewer", "YouTube Comments Viewer");

  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
