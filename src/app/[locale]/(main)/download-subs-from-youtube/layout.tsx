import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Download Subtitles from YouTube Videos - Free Caption Extractor | YTVidHub',
        description: 'Download subtitles from any YouTube video in SRT, VTT, or TXT format. Fast, free, and easy-to-use YouTube caption extractor for video editing, AI training, and content creation.',
        keywords: ['download subtitles from youtube', 'download subs from youtube', 'youtube caption extractor', 'free caption downloader', 'youtube subtitle download free'],
        openGraph: {
            title: 'Download Subtitles from YouTube Videos - Free Caption Extractor',
            description: 'Download subtitles from any YouTube video in SRT, VTT, or TXT format. Fast, free YouTube caption extractor.',
            type: 'website',
        },
        alternates: buildAlternates(locale, '/download-subs-from-youtube'),
    };
}

export default function DownloadSubsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
