import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Extract YouTube Subtitles Online - Free Subtitle Extractor Tool | YTVidHub',
        description: 'Extract subtitles from YouTube videos online for free. Get clean SRT, VTT, or TXT files instantly with our professional subtitle extraction tool. No software needed.',
        keywords: ['extract youtube subtitles', 'youtube subtitle extractor', 'extract subtitles online', 'youtube caption extractor online', 'get subtitles from youtube'],
        openGraph: {
            title: 'Extract YouTube Subtitles Online - Free Subtitle Extractor Tool',
            description: 'Extract subtitles from YouTube videos online for free. Get clean SRT, VTT, or TXT files instantly.',
            type: 'website',
        },
        alternates: buildAlternates(locale, '/extract-youtube-subtitles-online-tool'),
    };
}

export default function ExtractToolLayout({ children }: { children: React.ReactNode }) {
    return children;
}
