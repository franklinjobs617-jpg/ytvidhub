import React from 'react';

export default function BulkDownloaderSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Bulk YouTube Subtitle Downloader",
    "description": "Bulk YouTube subtitle downloader for exporting SRT, VTT, and TXT files from multiple videos, playlists, and channels in one organized workflow.",
    "url": "https://ytvidhub.com/bulk-youtube-subtitle-downloader/",
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
      "Organized ZIP file delivery"
    ],
    "screenshot": "https://ytvidhub.com/image/bulk-youtube-subtitle-downloader-screenshot.webp"
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
          "text": "To download subtitles from a YouTube playlist, copy the playlist URL and paste it into YTVidHub's bulk tool. The workflow extracts available captions for the videos and bundles the results into an organized ZIP file."
        }
      },
      {
        "@type": "Question",
        "name": "Can I extract subtitles from multiple YouTube videos at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can paste multiple individual video URLs, a playlist URL, or a channel link to export available subtitles in one batch workflow."
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
          "text": "Yes. The bulk downloader can extract both manually uploaded subtitles and YouTube's auto-generated closed captions when those tracks are available."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a limit to how many subtitles I can download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free users have a daily quota. Paid plans are available for larger recurring batches and higher-volume subtitle workflows."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
