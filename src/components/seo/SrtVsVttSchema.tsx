import Script from 'next/script';

export default function SrtVsVttSchema() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SRT vs VTT: Complete Comparison Guide for Developers",
    "description": "Comprehensive technical comparison of SRT and WebVTT subtitle formats for AI training, web development, and bulk subtitle extraction.",
    "image": [
      "https://ytvidhub.com/image/srt-vs-vtt-comparison-matrix.webp",
      "https://ytvidhub.com/image/srt-syntax-example.webp",
      "https://ytvidhub.com/image/vtt-syntax-example.webp"
    ],
    "author": {
      "@type": "Organization",
      "name": "YTVidHub Technical Team",
      "url": "https://ytvidhub.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "YTVidHub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ytvidhub.com/logo.png"
      }
    },
    "datePublished": "2025-01-01T00:00:00.000Z",
    "dateModified": "2025-01-30T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://ytvidhub.com/guide/srt-vs-vtt"
    },
    "articleSection": "Technical Guides",
    "keywords": [
      "SRT vs VTT",
      "subtitle format comparison",
      "WebVTT vs SubRip",
      "subtitle file formats",
      "AI training subtitle data"
    ],
    "wordCount": 3500,
    "timeRequired": "PT12M",
    "about": [
      {
        "@type": "Thing",
        "name": "SRT Format",
        "description": "SubRip subtitle format for video captions"
      },
      {
        "@type": "Thing", 
        "name": "WebVTT Format",
        "description": "Web Video Text Tracks format for HTML5 video"
      }
    ]
  };

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "SRT vs VTT Technical Comparison",
    "description": "Detailed technical comparison between SRT and WebVTT subtitle formats",
    "about": [
      {
        "@type": "SoftwareApplication",
        "name": "SRT Format",
        "applicationCategory": "Subtitle Format",
        "operatingSystem": "Cross-platform"
      },
      {
        "@type": "SoftwareApplication", 
        "name": "WebVTT Format",
        "applicationCategory": "Web Subtitle Format",
        "operatingSystem": "Web browsers"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Choose Between SRT and VTT Formats",
    "description": "Step-by-step guide to selecting the right subtitle format for your project needs",
    "image": "https://ytvidhub.com/image/srt-vs-vtt-decision-tree.webp",
    "totalTime": "PT5M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Identify Your Use Case",
        "text": "Determine if you need subtitles for web video players, AI training, or offline video editing.",
        "image": "https://ytvidhub.com/image/step1-identify-use-case.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Consider Technical Requirements",
        "text": "Evaluate if you need styling, positioning, or metadata support in your subtitle files.",
        "image": "https://ytvidhub.com/image/step2-technical-requirements.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Choose the Right Format",
        "text": "Select SRT for AI training and bulk processing, or VTT for web video players with styling needs.",
        "image": "https://ytvidhub.com/image/step3-choose-format.webp"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between SRT and VTT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRT uses comma separators for milliseconds (00:01:12,450) while VTT uses dots (00:01:12.450). VTT also supports CSS styling and metadata, while SRT is purely text-based."
        }
      },
      {
        "@type": "Question",
        "name": "Which format is better for AI training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRT is generally better for AI training because it has minimal metadata overhead and provides cleaner text data with 99.8% signal quality compared to VTT's 88.2%."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert between SRT and VTT formats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can convert between formats, but be aware that VTT's styling and metadata will be lost when converting to SRT, and timestamp separators need to be changed."
        }
      },
      {
        "@type": "Question",
        "name": "Which format has better browser support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VTT has native browser support through the HTML5 <track> element, while SRT requires conversion or JavaScript libraries for web playback."
        }
      },
      {
        "@type": "Question",
        "name": "What about file encoding differences?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRT files often include Byte Order Mark (BOM) which can cause parsing issues. VTT follows modern UTF-8 standards without BOM, making it more reliable for web applications."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ytvidhub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": "https://ytvidhub.com/guide"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SRT vs VTT Comparison",
        "item": "https://ytvidhub.com/guide/srt-vs-vtt"
      }
    ]
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <Script
        id="comparison-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonSchema),
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}