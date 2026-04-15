import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Extract YouTube Subtitles Online - Subtitle Extractor Workflow | YTVidHub',
        description: 'Use our online subtitle extractor to parse YouTube videos and export SRT, VTT, or TXT. Best for extraction flow, quick checks, and format selection.',
        keywords: ['extract youtube subtitles online', 'youtube subtitle extractor', 'subtitle extractor online tool', 'youtube caption extractor online', 'extract subtitles from youtube video'],
        openGraph: {
            title: 'Extract YouTube Subtitles Online - Subtitle Extractor Workflow',
            description: 'Parse YouTube subtitles online and export SRT, VTT, or TXT in a guided extraction workflow.',
            type: 'website',
        },
        alternates: buildAlternates(locale, '/extract-youtube-subtitles-online-tool'),
    };
}

export default function ExtractToolLayout({ children }: { children: React.ReactNode }) {
    return children;
}
