import Script from 'next/script';

export default function DataPrepGuideSchema() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Definitive Guide to LLM Data Preparation",
    "description": "Master YouTube transcript extraction and cleaning for LLM training. Advanced techniques to eliminate ASR noise and build better AI datasets.",
    "image": [
      "https://ytvidhub.com/image/data-prep-pipeline-flowchart.webp",
      "https://ytvidhub.com/image/subtitle-format-comparison-table.webp",
      "https://ytvidhub.com/image/llm-rag-data-injection.webp"
    ],
    "author": {
      "@type": "Person",
      "name": "Franklin Jobs",
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
    "datePublished": "2025-10-01T00:00:00.000Z",
    "dateModified": "2025-10-15T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://ytvidhub.com/data-prep-guide"
    },
    "articleSection": "Engineering",
    "keywords": [
      "LLM data preparation",
      "YouTube transcript extraction",
      "ASR noise cleaning", 
      "AI training data",
      "machine learning datasets"
    ],
    "wordCount": 2500,
    "timeRequired": "PT8M",
    "articleBody": "Welcome to the definitive guide. If you are looking to scale your LLM or NLP projects using real-world conversational data from YouTube..."
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Prepare YouTube Data for LLM Training",
    "description": "Step-by-step process for extracting and cleaning YouTube transcripts for machine learning applications",
    "image": "https://ytvidhub.com/image/data-prep-pipeline-flowchart.webp",
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "YouTube video URLs or playlist"
      },
      {
        "@type": "HowToSupply",
        "name": "YTVidHub bulk downloader tool"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "YTVidHub Bulk Subtitle Downloader"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Extract Raw Subtitles",
        "text": "Use bulk download tools to extract SRT/VTT files from YouTube videos or entire playlists.",
        "image": "https://ytvidhub.com/image/step1-bulk-download.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Clean ASR Noise",
        "text": "Remove timestamps, speaker labels, and other metadata that can interfere with LLM training.",
        "image": "https://ytvidhub.com/image/step2-clean-data.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Structure for Training",
        "text": "Format cleaned text into appropriate structure for your specific LLM training pipeline.",
        "image": "https://ytvidhub.com/image/step3-structure-data.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Integrate into RAG System",
        "text": "Feed processed data into vector databases for retrieval-augmented generation applications.",
        "image": "https://ytvidhub.com/image/step4-rag-integration.webp"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is data cleaning essential for LLMs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LLMs are sensitive to 'noise' in data. Timestamps and speaker tags increase token consumption and can mislead the model's understanding of sentence structure and flow."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best format for fine-tuning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clean TXT is generally best for fine-tuning as it maximizes data density. For RAG systems, JSON or VTT may be preferred to maintain source traceability."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle ASR noise in YouTube transcripts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remove timestamps, speaker labels, and metadata tags. Focus on preserving semantic content while eliminating formatting artifacts that can confuse language models."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between SRT and clean TXT for AI training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SRT files contain timestamps and formatting that increase token count without adding semantic value. Clean TXT maximizes data density and reduces noise for better training efficiency."
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
        "name": "LLM Data Preparation Guide",
        "item": "https://ytvidhub.com/data-prep-guide"
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