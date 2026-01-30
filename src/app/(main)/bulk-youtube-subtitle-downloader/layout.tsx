import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bulk YouTube Subtitle Downloader | Extract SRT, TXT & Playlist Captions | YTVidHub',
    description: 'The best bulk YouTube subtitle downloader to extract SRT, VTT, and TXT transcripts from multiple videos or entire playlists. High-speed batch processing for AI datasets and creators.',
    alternates: {
        canonical: 'https://ytvidhub.com/bulk-youtube-subtitle-downloader',
    },
};

export default function BulkDownloaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
