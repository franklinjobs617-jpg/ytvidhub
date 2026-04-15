import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "DMCA Policy | YTVidHub",
    description:
      "Read YTVidHub's DMCA Policy for copyright notices, counter-notices, repeat infringer policy, and contact process.",
    alternates: buildAlternates(locale, "/dmca-policy"),
  };
}

export default function DmcaPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
