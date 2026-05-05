import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, '/bulk-youtube-subtitle-downloader');

  const title = 'Bulk YouTube Subtitle Downloader | Playlist Extract Free';
  const description = 'Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT transcripts from multiple videos, playlists, and channels. Perfect for AI training, content creation, and accessibility. Download thousands of subtitles in one click.';

  return {
    title,
    description,
    keywords: [
      'bulk youtube subtitle downloader',
      'youtube playlist subtitle downloader',
      'batch youtube subtitle extractor',
      'download youtube subtitles bulk',
      'youtube transcript downloader bulk',
      'extract youtube captions bulk',
      'youtube subtitle batch download',
      'bulk srt downloader youtube',
      'youtube playlist captions download',
      'bulk youtube transcript extractor',
      'youtube subtitle scraper bulk',
      'download multiple youtube subtitles',
    ],
    authors: [{ name: 'YTVidHub Team' }],
    openGraph: {
      title: 'Bulk YouTube Subtitle Downloader | Playlist Extract Free',
      description: 'Download subtitles from thousands of YouTube videos at once. Professional bulk extraction tool for SRT, VTT, and TXT formats. Perfect for AI training and content creation.',
      url: alternates.canonical,
      type: 'website',
      images: [{ url: '/image/bulk-youtube-subtitle-downloader-og.webp', width: 1200, height: 630, alt: 'Bulk YouTube Subtitle Downloader Tool Interface' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bulk YouTube Subtitle Downloader | Playlist Extract Free',
      description: 'Download subtitles from entire YouTube playlists and channels. Professional bulk extraction for SRT, VTT, and TXT formats.',
      images: ['/image/bulk-youtube-subtitle-downloader-og.webp'],
      creator: '@ytvidhub',
    },
    alternates,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function BulkDownloaderLayout({ children, params }: Props) {
    const { locale } = await params;
    const items = toolBreadcrumbs(locale, '/bulk-youtube-subtitle-downloader', 'Bulk Subtitle Downloader');
    return (
        <>
            <BreadcrumbSchema items={items} />
            {children}
        </>
    );
}
