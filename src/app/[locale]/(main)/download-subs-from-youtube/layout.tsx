import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'YouTube Transcript Download - TXT, SRT, VTT Export | YTVidHub',
        description: 'Download YouTube transcript in seconds. Paste a video URL and export transcript as TXT, SRT, or VTT. Fast online workflow for research, AI, and editing.',
        keywords: ['youtube transcript download', 'download youtube transcript', 'transcript youtube download', 'download transcript youtube', 'how to download transcript from youtube'],
        openGraph: {
            title: 'YouTube Transcript Download - Download YouTube Transcript as TXT, SRT',
            description: 'Download YouTube transcript in seconds and export as TXT, SRT, or VTT format.',
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

