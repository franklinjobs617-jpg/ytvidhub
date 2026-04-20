import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/engineering-decisions-ytvidhub");
  const canonicalUrl = alternates.canonical;

  const title = "Engineering Decisions Behind YTVidHub | Blog";
  const description =
    "Technical insights into how we built the world's fastest bulk YouTube subtitle downloader. Scaling, performance, and architecture decisions.";

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: "/image/ytvidhub-bulk-downloader-architecture-flow.png",
          width: 1200,
          height: 630,
          alt: "YTVidHub architecture flow",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/ytvidhub-bulk-downloader-architecture-flow.png"],
    },
  };
}

export default function EngineeringDecisionsLayout({ children }: Props) {
  return children;
}
