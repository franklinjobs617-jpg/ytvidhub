import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'What is an SRT File? | Complete Guide to Subtitles | YTVidHub',
    description: 'Everything you need to know about SRT (SubRip) files. Learn how to open, edit, and create SRT subtitles for YouTube and video players.',
    alternates: {
        canonical: 'https://ytvidhub.com/what-is-an-srt-file',
    },
};

export default function SRTFileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
