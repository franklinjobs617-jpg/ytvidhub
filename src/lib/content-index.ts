export type ContentEntry = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  readTime: string;
  tag: string;
  coverImage?: string;
  coverAlt?: string;
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
    coverImage: "/image/blog/youtube-transcript-workflow-comparison.webp",
    coverAlt:
      "Workflow comparison graphic for getting YouTube video transcripts faster",
  },
  {
    slug: "ai-youtube-video-summarizer",
    title: "Decode YouTube Videos With AI Intelligence",
    excerpt:
      "How transcript quality changes downstream summary quality for research, study, and content operations.",
    updatedAt: "2025-12-02",
    readTime: "7 min",
    tag: "AI",
    coverImage: "/image/blog/ai-youtube-summary-quality-workflow.webp",
    coverAlt:
      "Illustration about AI YouTube summarizer quality driven by transcript quality",
  },
  {
    slug: "subtitle-accuracy-problem",
    title: "Why YouTube Subtitles Are Sometimes Wrong",
    excerpt:
      "A diagnostic view of ASR errors, where they come from, and how to clean noisy subtitle streams.",
    updatedAt: "2025-11-15",
    readTime: "6 min",
    tag: "Quality",
    coverImage: "/image/blog/youtube-subtitle-accuracy-error-diagnosis.webp",
    coverAlt:
      "Visual about diagnosing YouTube subtitle accuracy issues and ASR errors",
  },
  {
    slug: "creator-tutorials",
    title: "From Pain Point to Production",
    excerpt:
      "Inside the engineering tradeoffs behind high-volume subtitle extraction and clean text output.",
    updatedAt: "2025-10-28",
    readTime: "7 min",
    tag: "Engineering",
    coverImage:
      "/image/blog/subtitle-workflow-from-pain-point-to-production.webp",
    coverAlt:
      "Diagram showing subtitle pipeline progress from manual pain points to production workflow",
  },
  {
    slug: "engineering-decisions-ytvidhub",
    title: "Engineering Decisions at YTVidHub",
    excerpt:
      "Architecture, queue strategy, and data-shaping decisions that improve stability under heavy load.",
    updatedAt: "2025-10-26",
    readTime: "9 min",
    tag: "System Design",
    coverImage:
      "/image/blog/ytvidhub-engineering-system-architecture-decisions.webp",
    coverAlt:
      "System architecture concept for YTVidHub engineering decisions under load",
  },
  {
    slug: "spanish-yt-channels-subtitles",
    title: "Learn Spanish With YouTube Subtitles",
    excerpt:
      "A practical language-learning setup using subtitle extraction, clean text mode, and replay loops.",
    updatedAt: "2025-10-20",
    readTime: "6 min",
    tag: "Use Case",
    coverImage:
      "/image/blog/learn-spanish-with-youtube-subtitles-workflow.webp",
    coverAlt:
      "Language-learning setup using YouTube subtitles for Spanish listening and replay practice",
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
    coverImage:
      "/image/guides/youtube-subtitles-complete-download-guide-cover.webp",
    coverAlt:
      "Complete guide cover for downloading YouTube subtitles across formats and workflows",
  },
  {
    slug: "srt-vs-vtt",
    title: "SRT vs VTT: Technical Comparison Guide",
    excerpt:
      "Format-level differences, compatibility tradeoffs, and which subtitle format to use by scenario.",
    updatedAt: "2026-02-01",
    readTime: "9 min",
    tag: "Technical",
    coverImage:
      "/image/guides/srt-vs-vtt-technical-comparison-guide-cover.webp",
    coverAlt:
      "Technical SRT vs VTT comparison cover showing subtitle format differences",
  },
  {
    slug: "clean-transcript-no-timestamp",
    title: "How to Clean Transcript and Remove Timestamps",
    excerpt:
      "A focused workflow for producing model-ready plain text from noisy timed subtitle files.",
    updatedAt: "2025-12-22",
    readTime: "7 min",
    tag: "Data Cleaning",
    coverImage:
      "/image/guides/clean-transcript-remove-timestamps-guide-cover.webp",
    coverAlt:
      "Guide cover about cleaning transcripts and removing subtitle timestamps",
  },
  {
    slug: "youtube-subtitles-for-llm-data",
    title: "Prepare YouTube Subtitles for LLM Data",
    excerpt:
      "How to structure subtitle exports for embedding, chunking, retrieval, and prompt workflows.",
    updatedAt: "2025-12-06",
    readTime: "8 min",
    tag: "LLM",
    coverImage:
      "/image/guides/youtube-subtitles-for-llm-data-preparation-guide-cover.webp",
    coverAlt:
      "LLM data preparation guide cover using YouTube subtitles for training pipelines",
  },
  {
    slug: "youtube-subtitles-api-free",
    title: "Free YouTube Subtitles API Alternative",
    excerpt:
      "Reduce API quota dependence with bulk extraction and consistent JSON/TXT export pipelines.",
    updatedAt: "2025-11-28",
    readTime: "7 min",
    tag: "API",
    coverImage:
      "/image/guides/youtube-subtitles-api-alternative-guide-cover.webp",
    coverAlt:
      "Guide cover for YouTube subtitles API alternatives and extraction workflows",
  },
  {
    slug: "playlist-subtitles-bulk",
    title: "Download Playlist Subtitles in Bulk",
    excerpt:
      "A speed-first guide to processing full playlists without repetitive manual URL handling.",
    updatedAt: "2025-11-14",
    readTime: "6 min",
    tag: "Bulk",
    coverImage:
      "/image/guides/playlist-subtitles-bulk-download-guide-cover.webp",
    coverAlt:
      "Bulk playlist subtitle download guide cover for high-volume extraction",
  },
  {
    slug: "mastering-vtt-data-analysis",
    title: "Mastering VTT Data Analysis",
    excerpt:
      "Turn raw VTT tracks into usable analytics and downstream NLP inputs with a repeatable method.",
    updatedAt: "2025-11-03",
    readTime: "9 min",
    tag: "Analytics",
    coverImage:
      "/image/guides/mastering-vtt-data-analysis-guide-cover.webp",
    coverAlt:
      "Mastering VTT data analysis guide cover for subtitle analytics workflows",
  },
  {
    slug: "data-prep-toolkit",
    title: "The Advanced Data Prep Toolkit",
    excerpt:
      "An end-to-end toolkit view for ingestion, cleaning, export, and validation at research scale.",
    updatedAt: "2025-10-30",
    readTime: "10 min",
    tag: "Toolkit",
    coverImage:
      "/image/guides/advanced-data-prep-toolkit-guide-cover.webp",
    coverAlt:
      "Advanced data preparation toolkit guide cover for transcript processing pipelines",
  },
  {
    slug: "how-to-download-youtube-studio-subtitles",
    title: "How to Download YouTube Studio Subtitles",
    excerpt:
      "A channel-owner tutorial covering Studio export steps and a faster alternative for larger volume.",
    updatedAt: "2025-10-18",
    readTime: "7 min",
    tag: "Studio",
    coverImage:
      "/image/guides/youtube-studio-subtitles-download-guide-cover.webp",
    coverAlt:
      "YouTube Studio subtitles download guide cover for channel-owner workflow",
  },
];
