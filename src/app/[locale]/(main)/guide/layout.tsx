import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "youtube subtitle guide",
    "youtube transcript tutorial",
    "srt vtt txt guide",
    "bulk subtitle download guide",
    "clean transcript workflow",
    "ytvidhub guides",
  ],
  openGraph: {
    siteName: "YTVidHub",
    type: "website",
    images: [
      {
        url: "/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "YTVidHub guides and tutorials cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/image/og-image.webp"],
  },
};

export default function GuideGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="editorial-route">{children}</div>;
}
