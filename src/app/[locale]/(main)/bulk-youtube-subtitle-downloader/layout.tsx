import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bulk YouTube Subtitle Downloader | Extract SRT, VTT & TXT Captions from Playlists | YTVidHub',
    description: 'Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT transcripts from multiple videos, playlists, and channels. Perfect for AI training, content creation, and accessibility. Download thousands of subtitles in one click.',
    
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
        'download multiple youtube subtitles'
    ],

    authors: [{ name: 'YTVidHub Team' }],
    
    openGraph: {
        title: 'Bulk YouTube Subtitle Downloader | Extract Captions from Playlists & Channels',
        description: 'Download subtitles from thousands of YouTube videos at once. Professional bulk extraction tool for SRT, VTT, and TXT formats. Perfect for AI training and content creation.',
        url: 'https://ytvidhub.com/bulk-youtube-subtitle-downloader',
        type: 'website',
        images: [
            {
                url: '/image/bulk-youtube-subtitle-downloader-og.webp',
                width: 1200,
                height: 630,
                alt: 'Bulk YouTube Subtitle Downloader Tool Interface',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Bulk YouTube Subtitle Downloader | Extract Captions at Scale',
        description: 'Download subtitles from entire YouTube playlists and channels. Professional bulk extraction for SRT, VTT, and TXT formats.',
        images: ['/image/bulk-youtube-subtitle-downloader-og.webp'],
        creator: '@ytvidhub',
    },

    alternates: {
        canonical: 'https://ytvidhub.com/bulk-youtube-subtitle-downloader',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    other: {
        'article:author': 'YTVidHub Team',
        'article:section': 'Tools',
        'article:tag': 'YouTube, Subtitles, Bulk Download, SRT, VTT, Captions, AI Training',
    },
};

export default function BulkDownloaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
