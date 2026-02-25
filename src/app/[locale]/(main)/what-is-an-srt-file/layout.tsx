import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
    description: 'SRT timestamp format: HH:MM:SS,ms (comma, not dot). Complete syntax rules, sequence numbering & examples. Plus: free tool to extract SRT files from any YouTube video instantly.',
    alternates: {
        canonical: 'https://ytvidhub.com/what-is-an-srt-file/',
    },
    openGraph: {
        title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
        description: 'SRT timestamp format: HH:MM:SS,ms (comma, not dot). Complete syntax rules, sequence numbering & examples. Plus: free tool to extract SRT files from any YouTube video instantly.',
        type: 'article',
        publishedTime: '2026-01-01',
        modifiedTime: '2026-01-01',
        authors: ['YTVidHub'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SRT File Format Guide 2026: Complete Tutorial for Subtitles & AI Applications',
        description: 'SRT timestamp format: HH:MM:SS,ms (comma, not dot). Complete syntax rules, sequence numbering & examples. Plus: free tool to extract SRT files from any YouTube video instantly.',
    },
};

export default function SRTFileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
