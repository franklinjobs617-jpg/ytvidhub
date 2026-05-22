import Script from 'next/script';

type SubtitleSchemaVariant = "subtitle" | "caption" | "online" | "vtt";

type SubtitleDownloaderSchemaProps = {
  variant?: SubtitleSchemaVariant;
};

const schemaByVariant: Record<
  SubtitleSchemaVariant,
  {
    name: string;
    description: string;
    url: string;
    featureList: string[];
    faq: Array<{ name: string; text: string }>;
  }
> = {
  subtitle: {
    name: "YouTube Subtitle Downloader",
    description:
      "Free online YouTube subtitle downloader for SRT, VTT, and TXT caption exports. Paste a video URL and extract available subtitles or auto-generated captions in your browser.",
    url: "https://ytvidhub.com/youtube-subtitle-downloader/",
    featureList: [
      "Download YouTube subtitles in SRT format",
      "Extract VTT captions for web players",
      "Generate clean TXT transcripts",
      "Support for auto-generated captions",
      "Multiple language subtitle support",
      "No registration required for basic use",
    ],
    faq: [
      {
        name: "Can I download subtitles from one YouTube video?",
        text: "Yes. Paste a YouTube video URL, choose an available caption language, and export the subtitle file as SRT, VTT, or TXT.",
      },
      {
        name: "Which format should I choose: SRT, VTT, or TXT?",
        text: "Choose SRT for video editors and desktop players, VTT for HTML5 video and web players, and TXT when you need readable transcript text without timing markup.",
      },
      {
        name: "Does this work with auto-generated YouTube captions?",
        text: "Yes. The downloader can extract available auto-generated captions as well as manually uploaded subtitle tracks, although accuracy depends on the source caption quality.",
      },
    ],
  },
  caption: {
    name: "YouTube Caption Downloader",
    description:
      "Download YouTube captions and closed caption tracks as SRT, VTT, or TXT for accessibility reviews, editing, and web publishing.",
    url: "https://ytvidhub.com/youtube-caption-downloader/",
    featureList: [
      "Download YouTube closed captions",
      "Export CC tracks as SRT",
      "Export captions as VTT for web players",
      "Save clean TXT caption text",
      "Support available caption languages",
    ],
    faq: [
      {
        name: "What is a YouTube caption downloader?",
        text: "A YouTube caption downloader extracts the caption or CC track attached to a YouTube video and saves it as SRT, VTT, or TXT.",
      },
      {
        name: "Can I download YouTube closed captions as SRT?",
        text: "Yes. If the video has an available caption or CC track, you can export it as SRT for editing, playback, or accessibility review.",
      },
      {
        name: "Are captions different from subtitles?",
        text: "Captions usually include speech plus accessibility cues such as speaker labels or sound notes when available. Subtitles are often focused on translated or time-aligned dialogue.",
      },
    ],
  },
  online: {
    name: "Download YouTube Subtitles Online",
    description:
      "Browser-based YouTube subtitle download workflow for exporting available captions as SRT, VTT, or TXT without installing software.",
    url: "https://ytvidhub.com/download-youtube-subtitles-online/",
    featureList: [
      "Online YouTube subtitle download",
      "No desktop software required",
      "Single-video SRT export",
      "Single-video VTT export",
      "Clean TXT transcript export",
    ],
    faq: [
      {
        name: "How do I download YouTube subtitles online?",
        text: "Copy the YouTube video URL, paste it into the online downloader, choose an available caption language, and export SRT, VTT, or TXT.",
      },
      {
        name: "Do I need to install software?",
        text: "No. The online downloader runs in the browser, so you can export available subtitles without installing desktop software.",
      },
      {
        name: "When should I use the bulk downloader instead?",
        text: "Use the bulk downloader when you need subtitles from a playlist, channel, or many video URLs in one organized package.",
      },
    ],
  },
  vtt: {
    name: "YouTube VTT Downloader",
    description:
      "Download YouTube captions as WebVTT files for HTML5 video, browser players, and online course platforms.",
    url: "https://ytvidhub.com/youtube-vtt-downloader/",
    featureList: [
      "Export YouTube captions as VTT",
      "WebVTT output for HTML5 players",
      "Browser caption workflow",
      "Available caption language selection",
    ],
    faq: [
      {
        name: "Can I download YouTube captions as VTT?",
        text: "Yes. If captions are available for the YouTube video, you can export them as a VTT file for web video workflows.",
      },
      {
        name: "Should I use VTT or SRT?",
        text: "Use VTT for web players and HTML5 video. Use SRT when you need maximum compatibility with desktop players and video editing tools.",
      },
    ],
  },
};

export default function SubtitleDownloaderSchema({
  variant = "subtitle",
}: SubtitleDownloaderSchemaProps) {
  const config = schemaByVariant[variant];
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": config.name,
    "description": config.description,
    "url": config.url,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": config.featureList,
    "screenshot": "https://ytvidhub.com/image/yytvidhub-download.gif",
    "softwareVersion": "2.0",
    "author": {
      "@type": "Organization",
      "name": "YTVidHub",
      "url": "https://ytvidhub.com"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "YTVidHub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ytvidhub.com/logo.png"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faq.map((item) => ({
      "@type": "Question",
      "name": item.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.text,
      },
    })),
  };

  return (
    <>
      <Script
        id="subtitle-downloader-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      <Script
        id="subtitle-downloader-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
