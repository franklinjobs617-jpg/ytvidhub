import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download YouTube Subtitles | Extract SRT, VTT, TXT Free | YTVidHub',
    description: 'The leading free online tool to download YouTube subtitles. Instantly extract high-accuracy SRT, VTT, and Text files for AI training, video editing, and content creation.',
    keywords: ['download subs from youtube', 'YouTube subtitle downloader', 'extract SRT from YouTube', 'YouTube transcript exporter', 'free caption downloader'],
    openGraph: {
        title: 'Download YouTube Subtitles | Extract SRT, VTT, TXT Free',
        description: 'Extract high-accuracy subtitles from any YouTube video instantly. Supports multiple formats and AI-ready text.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://ytvidhub.com/download-subs-from-youtube/',
    },
};

export default function DownloadSubsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
