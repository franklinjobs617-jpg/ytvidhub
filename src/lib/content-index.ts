export type ContentEntry = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  readTime: string;
  tag: string;
};

export const blogEntries: ContentEntry[] = [
  {
    slug: "how-to-get-youtube-video-transcript",
    title: "How to Get Transcript of YouTube Video",
    excerpt:
      "A practical walkthrough for extracting transcripts quickly, with a side-by-side workflow comparison.",
    updatedAt: "2026-01-08",
    readTime: "8 min",
    tag: "Workflow",
  },
  {
    slug: "ai-youtube-video-summarizer",
    title: "Decode YouTube Videos With AI Intelligence",
    excerpt:
      "How transcript quality changes downstream summary quality for research, study, and content operations.",
    updatedAt: "2025-12-02",
    readTime: "7 min",
    tag: "AI",
  },
  {
    slug: "subtitle-accuracy-problem",
    title: "Why YouTube Subtitles Are Sometimes Wrong",
    excerpt:
      "A diagnostic view of ASR errors, where they come from, and how to clean noisy subtitle streams.",
    updatedAt: "2025-11-15",
    readTime: "6 min",
    tag: "Quality",
  },
  {
    slug: "creator-tutorials",
    title: "From Pain Point to Production",
    excerpt:
      "Inside the engineering tradeoffs behind high-volume subtitle extraction and clean text output.",
    updatedAt: "2025-10-28",
    readTime: "7 min",
    tag: "Engineering",
  },
  {
    slug: "engineering-decisions-ytvidhub",
    title: "Engineering Decisions at YTVidHub",
    excerpt:
      "Architecture, queue strategy, and data-shaping decisions that improve stability under heavy load.",
    updatedAt: "2025-10-26",
    readTime: "9 min",
    tag: "System Design",
  },
  {
    slug: "spanish-yt-channels-subtitles",
    title: "Learn Spanish With YouTube Subtitles",
    excerpt:
      "A practical language-learning setup using subtitle extraction, clean text mode, and replay loops.",
    updatedAt: "2025-10-20",
    readTime: "6 min",
    tag: "Use Case",
  },
];

export const guideEntries: ContentEntry[] = [
  {
    slug: "how-to-download-youtube-subtitles-complete-guide",
    title: "How to Download YouTube Subtitles: Complete Guide",
    excerpt:
      "Compares manual extraction, browser extensions, and automated bulk workflows in one playbook.",
    updatedAt: "2026-01-12",
    readTime: "10 min",
    tag: "Beginner",
  },
  {
    slug: "srt-vs-vtt",
    title: "SRT vs VTT: Technical Comparison Guide",
    excerpt:
      "Format-level differences, compatibility tradeoffs, and which subtitle format to use by scenario.",
    updatedAt: "2026-02-01",
    readTime: "9 min",
    tag: "Technical",
  },
  {
    slug: "clean-transcript-no-timestamp",
    title: "How to Clean Transcript and Remove Timestamps",
    excerpt:
      "A focused workflow for producing model-ready plain text from noisy timed subtitle files.",
    updatedAt: "2025-12-22",
    readTime: "7 min",
    tag: "Data Cleaning",
  },
  {
    slug: "youtube-subtitles-for-llm-data",
    title: "Prepare YouTube Subtitles for LLM Data",
    excerpt:
      "How to structure subtitle exports for embedding, chunking, retrieval, and prompt workflows.",
    updatedAt: "2025-12-06",
    readTime: "8 min",
    tag: "LLM",
  },
  {
    slug: "youtube-subtitles-api-free",
    title: "Free YouTube Subtitles API Alternative",
    excerpt:
      "Reduce API quota dependence with bulk extraction and consistent JSON/TXT export pipelines.",
    updatedAt: "2025-11-28",
    readTime: "7 min",
    tag: "API",
  },
  {
    slug: "playlist-subtitles-bulk",
    title: "Download Playlist Subtitles in Bulk",
    excerpt:
      "A speed-first guide to processing full playlists without repetitive manual URL handling.",
    updatedAt: "2025-11-14",
    readTime: "6 min",
    tag: "Bulk",
  },
  {
    slug: "mastering-vtt-data-analysis",
    title: "Mastering VTT Data Analysis",
    excerpt:
      "Turn raw VTT tracks into usable analytics and downstream NLP inputs with a repeatable method.",
    updatedAt: "2025-11-03",
    readTime: "9 min",
    tag: "Analytics",
  },
  {
    slug: "data-prep-toolkit",
    title: "The Advanced Data Prep Toolkit",
    excerpt:
      "An end-to-end toolkit view for ingestion, cleaning, export, and validation at research scale.",
    updatedAt: "2025-10-30",
    readTime: "10 min",
    tag: "Toolkit",
  },
  {
    slug: "how-to-download-youtube-studio-subtitles",
    title: "How to Download YouTube Studio Subtitles",
    excerpt:
      "A channel-owner tutorial covering Studio export steps and a faster alternative for larger volume.",
    updatedAt: "2025-10-18",
    readTime: "7 min",
    tag: "Studio",
  },
];
