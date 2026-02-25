import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Extract YouTube Subtitles Online Free | SRT, VTT, TXT | YTVidHub',
        description: 'Extract subtitles from any YouTube video online for free. Get clean SRT, VTT, or TXT files instantly. No software needed — paste a URL and download.',
        alternates: buildAlternates(locale, '/extract-youtube-subtitles-online-tool'),
    };
}

export default function ExtractToolLayout({ children }: { children: React.ReactNode }) {
    return children;
}
