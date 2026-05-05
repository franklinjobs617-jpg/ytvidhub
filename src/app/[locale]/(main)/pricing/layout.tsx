import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/pricing");

  return {
    title: "Pricing | YTVidHub - Bulk YouTube Subtitle Downloader",
    description:
      "Choose the perfect plan for your research or content creation. From free starter plans to high-volume researcher packages.",
    alternates,
  };
}

export default function PricingLayout({ children }: Props) {
  return <>{children}</>;
}
