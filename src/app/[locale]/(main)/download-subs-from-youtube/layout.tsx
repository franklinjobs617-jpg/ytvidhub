import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import BreadcrumbSchema, { toolBreadcrumbs } from '@/components/seo/BreadcrumbSchema';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Download YouTube Transcript | TXT, SRT, VTT Free (2026)',
        description: 'Download YouTube transcript in seconds. Paste a video URL and export transcript as TXT, SRT, or VTT. Fast online workflow for research, AI, and editing.',
        keywords: ['youtube transcript download', 'download youtube transcript', 'transcript youtube download', 'download transcript youtube', 'how to download transcript from youtube'],
        openGraph: {
            title: 'Download YouTube Transcript | TXT, SRT, VTT Free (2026)',
            description: 'Download YouTube transcript in seconds and export as TXT, SRT, or VTT format.',
            type: 'website',
        },
        alternates: buildAlternates(locale, '/download-subs-from-youtube'),
    };
}

export default async function DownloadSubsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const items = toolBreadcrumbs(locale, '/download-subs-from-youtube', 'YouTube Transcript Download');
    return (
        <>
            <BreadcrumbSchema items={items} />
            {children}
        </>
    );
}

