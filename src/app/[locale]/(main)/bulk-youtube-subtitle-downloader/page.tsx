import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BulkDownloaderClient from "./BulkDownloaderClient";
import { buildAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/bulk-youtube-subtitle-downloader";
  const t = await getTranslations({ locale, namespace: "bulkDownloaderPage" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: buildAlternates(locale, pathname),
  };
}

export default async function BulkDownloaderPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="article-body">
      <BulkDownloaderClient locale={locale} />
    </div>
  );
}
