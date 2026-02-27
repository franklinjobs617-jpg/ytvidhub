import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'What Is an SRT File? How to Open, Edit & Download SRT Subtitles',
    description: 'An SRT (SubRip Text) file is the most popular subtitle format for videos. Learn what SRT files are, how to open and edit them, and download SRT subtitles from any YouTube video for free.',
    alternates: {
        canonical: 'https://ytvidhub.com/what-is-an-srt-file/',
    },
    openGraph: {
        title: 'What Is an SRT File? How to Open, Edit & Download SRT Subtitles',
        description: 'An SRT (SubRip Text) file is the most popular subtitle format for videos. Learn what SRT files are, how to open and edit them, and download SRT subtitles from any YouTube video for free.',
        type: 'article',
        publishedTime: '2026-01-01',
        modifiedTime: '2026-01-01',
        authors: ['YTVidHub'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'What Is an SRT File? How to Open, Edit & Download SRT Subtitles',
        description: 'An SRT (SubRip Text) file is the most popular subtitle format for videos. Learn what SRT files are, how to open and edit them, and download SRT subtitles from any YouTube video for free.',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is the SRT timestamp format?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The SRT timestamp format is HH:MM:SS,ms (hours:minutes:seconds,milliseconds). The separator between seconds and milliseconds is a comma, not a dot. Example: 00:01:23,456 --> 00:01:26,789',
            },
        },
        {
            '@type': 'Question',
            name: 'What does SRT stand for?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SRT stands for SubRip Text. It is a plain-text subtitle format originally created by the SubRip software, now the most widely supported subtitle format across all video players and platforms.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between SRT and VTT?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'SRT uses a comma as the millisecond separator (00:00:01,000) while VTT uses a dot (00:00:01.000). VTT (WebVTT) is designed for web browsers and supports additional styling features. SRT has broader compatibility with desktop video players like VLC.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I download YouTube subtitles as an SRT file?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can download YouTube subtitles as SRT files using YTVidHub. Paste the YouTube video URL, select SRT as the output format, and click download. No software installation required — works directly in your browser.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I use SRT files for AI training data?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. SRT files are commonly used for AI training data, especially for speech recognition and LLM fine-tuning. You can strip the timestamps to get clean plain text, or keep them for time-aligned training datasets.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the correct SRT file structure?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Each SRT subtitle block has three parts: (1) a sequence number starting from 1, (2) a timestamp line in the format HH:MM:SS,ms --> HH:MM:SS,ms, and (3) the subtitle text. Blocks are separated by a blank line.',
            },
        },
    ],
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'What Is an SRT File? How to Open, Edit & Download SRT Subtitles',
    description: 'An SRT (SubRip Text) file is the most popular subtitle format for videos. Learn what SRT files are, how to open and edit them, and download SRT subtitles from any YouTube video for free.',
    url: 'https://ytvidhub.com/what-is-an-srt-file/',
    datePublished: '2026-01-01',
    dateModified: '2026-02-01',
    author: { '@type': 'Organization', name: 'YTVidHub', url: 'https://ytvidhub.com' },
    publisher: { '@type': 'Organization', name: 'YTVidHub', url: 'https://ytvidhub.com' },
};

export default function SRTFileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {children}
        </>
    );
}
