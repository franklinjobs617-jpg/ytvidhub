import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LLM Data Preparation Guide: YouTube Transcript Extraction | YTVidHub",
    description: "Master YouTube transcript extraction and cleaning for LLM training. Advanced techniques to eliminate ASR noise and build better AI datasets.",

    keywords: [
        "LLM data preparation",
        "YouTube transcript extraction",
        "ASR noise cleaning",
        "AI training data",
        "machine learning datasets",
        "subtitle data cleaning",
        "RAG system data",
        "NLP data preprocessing",
        "YouTube data for AI",
        "transcript cleaning pipeline"
    ],

    authors: [{ name: "Franklin Jobs" }],

    openGraph: {
        title: "The Definitive LLM Data Preparation Guide | YTVidHub",
        description: "Learn advanced techniques for extracting and cleaning YouTube transcripts for AI training. From bulk download to structured datasets.",
        url: "https://ytvidhub.com/data-prep-guide",
        type: "article",
        publishedTime: "2025-10-01T00:00:00.000Z",
        modifiedTime: "2025-10-15T00:00:00.000Z",
        authors: ["Franklin Jobs"],
        section: "Engineering",
        tags: ["LLM", "Data Preparation", "AI", "Machine Learning", "YouTube"],
        images: [
            {
                url: "/image/data-prep-guide-og.webp",
                width: 1200,
                height: 630,
                alt: "LLM Data Preparation Guide - YouTube Transcript Extraction",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "LLM Data Preparation Guide | YTVidHub",
        description: "Master YouTube transcript extraction for AI training. Advanced cleaning techniques and pipeline optimization.",
        images: ["/image/data-prep-guide-og.webp"],
        creator: "@ytvidhub",
    },

    alternates: {
        canonical: "https://ytvidhub.com/data-prep-guide/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    other: {
        "article:author": "Franklin Jobs",
        "article:section": "Engineering",
        "article:published_time": "2025-10-01T00:00:00.000Z",
        "article:modified_time": "2025-10-15T00:00:00.000Z",
        "article:tag": "LLM, Data Preparation, AI, Machine Learning, YouTube",
    },
};

export default function DataPrepGuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}