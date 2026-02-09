import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
    description: 'Master the SRT file format with our comprehensive 2026 guide. Learn to create, edit, and convert .srt subtitles for YouTube, video editing, and AI training.',
    alternates: {
        canonical: 'https://ytvidhub.com/what-is-an-srt-file/',
    },
    openGraph: {
        title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
        description: 'Master the SRT file format with our comprehensive 2026 guide. Learn to create, edit, and convert .srt subtitles for YouTube, video editing, and AI training.',
        type: 'article',
        publishedTime: '2026-01-01',
        modifiedTime: '2026-01-01',
        authors: ['YTVidHub'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
        description: 'Master the SRT file format with our comprehensive 2026 guide. Learn to create, edit, and convert .srt subtitles for YouTube, video editing, and AI training.',
    },
};

export default function SRTFileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
