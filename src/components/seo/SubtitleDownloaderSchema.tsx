import Script from 'next/script';

export default function SubtitleDownloaderSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Subtitle Downloader",
    "description": "Free tool to download YouTube subtitles in SRT, VTT, and TXT formats. Extract captions from any YouTube video instantly.",
    "url": "https://ytvidhub.com/youtube-subtitle-downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Download YouTube subtitles in SRT format",
      "Extract VTT captions for web players", 
      "Generate clean TXT transcripts",
      "Support for auto-generated captions",
      "Multiple language subtitle support",
      "Bulk playlist subtitle downloads",
      "No registration required for basic use"
    ],
    "screenshot": "https://ytvidhub.com/image/subtitle-downloader-screenshot.webp",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it legal to download YouTube subtitles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, downloading subtitles for personal use, accessibility, research, and educational purposes is generally considered fair use. However, always respect copyright laws and YouTube's terms of service when using downloaded content."
        }
      },
      {
        "@type": "Question", 
        "name": "What's the difference between SRT and VTT formats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRT (SubRip) is the most common subtitle format, widely supported by video players and editing software. VTT (WebVTT) is designed for web browsers and HTML5 video players, offering more styling options and web-specific features."
        }
      },
      {
        "@type": "Question",
        "name": "Do you support auto-generated YouTube captions?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our YouTube subtitle downloader works with both manually uploaded subtitles and YouTube's automatically generated captions. Auto-generated captions may have lower accuracy but are still useful for many applications."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download subtitles in different languages?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Absolutely! If a YouTube video has subtitles available in multiple languages, you can select and download any available language track. This includes both original language subtitles and translated versions."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download YouTube Subtitles",
    "description": "Step-by-step guide to download subtitles from YouTube videos in SRT, VTT, or TXT format",
    "image": "https://ytvidhub.com/image/how-to-download-subtitles.webp",
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "YouTube video URL"
      },
      {
        "@type": "HowToSupply", 
        "name": "Internet connection"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "YTVidHub Subtitle Downloader"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Copy YouTube URL",
        "text": "Copy the URL of any YouTube video that has captions or subtitles available.",
        "image": "https://ytvidhub.com/image/step1-copy-url.webp"
      },
      {
        "@type": "HowToStep", 
        "name": "Paste and Select Format",
        "text": "Paste the URL into our tool and choose your preferred format: SRT, VTT, or TXT.",
        "image": "https://ytvidhub.com/image/step2-select-format.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Download Instantly", 
        "text": "Click download and get your subtitle file immediately. No registration required for basic use.",
        "image": "https://ytvidhub.com/image/step3-download.webp"
      }
    ]
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
      <Script
        id="subtitle-downloader-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
    </>
  );
}