import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'YouTube Transcript for ChatGPT - Extract & Summarize Videos with AI | YTVidHub',
        description: 'Get YouTube video transcripts ready for ChatGPT, Claude, and Gemini. Extract, copy, and paste any YouTube transcript into AI chatbots for summarization, translation, and analysis.',
        keywords: ['youtube transcript for chatgpt', 'youtube transcript to chatgpt', 'youtube video summarizer', 'extract youtube transcript for ai', 'youtube to chatgpt'],
        openGraph: {
            title: 'YouTube Transcript for ChatGPT - Extract & Summarize Videos with AI',
            description: 'Get YouTube video transcripts ready for ChatGPT, Claude, and Gemini. Extract and summarize any video in seconds.',
            type: 'website',
        },
        alternates: buildAlternates(locale, '/youtube-transcript-for-chatgpt'),
    };
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How do I get a YouTube transcript for ChatGPT?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Paste the YouTube video URL into YTVidHub, select TXT format, and click Extract. You get a clean, timestamp-free transcript you can copy directly into ChatGPT, Claude, or any other AI tool.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can ChatGPT read YouTube videos directly?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT cannot watch or listen to YouTube videos directly. You need to extract the transcript first and paste it as text. YTVidHub extracts the full transcript in seconds so you can use it with any AI.',
            },
        },
        {
            '@type': 'Question',
            name: 'What can I do with a YouTube transcript in ChatGPT?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'With a YouTube transcript in ChatGPT you can: summarize long videos, translate content to any language, extract key points and action items, generate blog posts or articles, create quiz questions, and analyze the speaker\'s arguments.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is there a free way to get YouTube transcripts?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. YTVidHub is free to use with no login required. Paste any YouTube URL and get the full transcript instantly in TXT, SRT, or VTT format.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long can a YouTube transcript be for ChatGPT?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ChatGPT has a context window limit. For GPT-4, this is around 128,000 tokens (~100,000 words). Most YouTube videos are well within this limit. For very long videos (3+ hours), consider splitting the transcript into sections.',
            },
        },
    ],
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get a YouTube Transcript for ChatGPT',
    description: 'Extract a YouTube video transcript and use it with ChatGPT in 3 steps.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Copy the YouTube video URL',
            text: 'Open the YouTube video you want to analyze. Copy the URL from your browser address bar.',
        },
        {
            '@type': 'HowToStep',
            name: 'Extract the transcript on YTVidHub',
            text: 'Paste the URL into YTVidHub and select TXT format. Click Extract to get the clean, timestamp-free transcript.',
        },
        {
            '@type': 'HowToStep',
            name: 'Paste into ChatGPT',
            text: 'Copy the transcript text and paste it into ChatGPT with your prompt, such as "Summarize this video transcript:" or "Extract the key points from this:".',
        },
    ],
};

export default function YouTubeTranscriptForChatGPTLayout({
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            {children}
        </>
    );
}
