import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "youtube subtitle workflow",
    "youtube transcript blog",
    "subtitle quality analysis",
    "youtube caption engineering",
    "video transcript operations",
    "ytvidhub blog",
  ],
  openGraph: {
    siteName: "YTVidHub",
    type: "website",
    images: [
      {
        url: "/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "YTVidHub blog and editorial cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/image/og-image.webp"],
  },
};

export default function BlogGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="editorial-route">{children}</div>;
}
