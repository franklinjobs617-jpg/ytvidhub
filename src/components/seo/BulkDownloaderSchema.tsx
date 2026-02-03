import React from 'react';

export default function BulkDownloaderSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Bulk YouTube Subtitle Downloader",
    "description": "Professional bulk YouTube subtitle downloader for extracting SRT, VTT, and TXT transcripts from multiple videos, playlists, and channels.",
    "url": "https://ytvidhub.com/bulk-youtube-subtitle-downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Bulk YouTube subtitle extraction",
      "Playlist subtitle download",
      "Channel subtitle extraction", 
      "SRT format support",
      "VTT format support",
      "TXT format support",
      "Batch processing",
      "ZIP file delivery"
    ],
    "screenshot": "https://ytvidhub.com/image/bulk-youtube-subtitle-downloader-screenshot.webp"
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download YouTube Subtitles in Bulk",
    "description": "Step-by-step guide to download subtitles from multiple YouTube videos, playlists, or channels at once.",
    "image": "https://ytvidhub.com/image/bulk-guide-step1-paste-url.webp",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "YouTube playlist or channel URL"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "YTVidHub Bulk Downloader"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Paste URLs",
        "text": "Copy and paste your YouTube playlist, channel, or multiple video URLs into the bulk downloader.",
        "image": "https://ytvidhub.com/image/bulk-guide-step1-paste-url.webp"
      },
      {
        "@type": "HowToStep", 
        "name": "Select Format",
        "text": "Choose your preferred subtitle format: SRT for video players, VTT for web, or TXT for clean text.",
        "image": "https://ytvidhub.com/image/bulk-guide-step2-select-format.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Download ZIP",
        "text": "Click download and receive a ZIP file with all subtitles organized by video title.",
        "image": "https://ytvidhub.com/image/bulk-guide-step3-download-zip.webp"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I download an entire YouTube playlist with subtitles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To download a YouTube playlist with subtitles, simply copy the playlist URL from your browser and paste it into YTVidHub's bulk tool. Our engine will crawl the entire list, extract the captions for each video, and bundle them into a ZIP file for you."
        }
      },
      {
        "@type": "Question",
        "name": "Can I extract subtitles from multiple YouTube videos at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can paste a list of multiple individual video URLs or a channel link. YTVidHub is the leading batch youtube subtitle downloader, allowing for unlimited URLs for Pro members."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats do you support for captions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support the three most common formats: SRT (SubRip), VTT (WebVTT), and Clean TXT. You can toggle between these formats before starting your bulk download."
        }
      },
      {
        "@type": "Question",
        "name": "Does this tool support auto-generated YouTube subtitles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our youtube transcript downloader can extract both manually uploaded subtitles and YouTube's auto-generated closed captions (CC) in any available language."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a limit to how many subtitles I can download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free users have a daily quota. Pro members enjoy unlimited bulk extraction, allowing them to download subtitles for thousands of videos in a single operation."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}