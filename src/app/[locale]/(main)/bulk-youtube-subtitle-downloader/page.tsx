/*
 * @Author: admin 2270669689@qq.com
 * @Date: 2026-02-25 12:14:32
 * @LastEditors: admin 2270669689@qq.com
 * @LastEditTime: 2026-02-27 18:36:57
 * @FilePath: \ytvidhub\src\app\[locale]\(main)\bulk-youtube-subtitle-downloader\page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Metadata } from "next";
import BulkDownloaderClient from "./BulkDownloaderClient";
import { buildCanonicalUrl } from "@/lib/url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const pathname = "/bulk-youtube-subtitle-downloader";
  const canonicalUrl = buildCanonicalUrl({ locale, pathname });

  return {
    title: "Bulk YouTube Subtitle Downloader | Extract Captions from Playlists | YTVidHub",
    description: "Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT captions from entire playlists, channels, and multiple videos.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname }),
        'es': buildCanonicalUrl({ locale: 'es', pathname }),
        'de': buildCanonicalUrl({ locale: 'de', pathname }),
        'ko': buildCanonicalUrl({ locale: 'ko', pathname }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname }),
      },
    },
  };
}

export default async function BulkDownloaderPage({ params }: Props) {
  const { locale } = await params;
  return <BulkDownloaderClient locale={locale} />;
}