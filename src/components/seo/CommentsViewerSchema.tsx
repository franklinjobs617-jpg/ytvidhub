const config = {
  name: "YouTube Comments Viewer",
  description:
    "Free online YouTube comments viewer. Load the full comment history of any video, sort by date or likes, filter by date range, browse replies, and chart comment trends over time — no login required.",
  url: "https://ytvidhub.com/youtube-comments-viewer/",
  featureList: [
    "Load all comments on any YouTube video",
    "Sort comments by date, oldest or newest first",
    "Sort comments by likes, most or least liked",
    "Filter comments by date range",
    "Expand and read comment replies",
    "Comment trend graph by hour, day, month, or year",
    "No registration required",
  ],
  faq: [
    {
      name: "How can I see the oldest comments on a YouTube video?",
      text: "Paste the video URL into the YouTube Comments Viewer, click Load all comments, and choose Date (oldest first) to read the comment history chronologically from the day the video was published.",
    },
    {
      name: "Can I sort YouTube comments by likes?",
      text: "Yes. The comments viewer loads the complete comment history and lets you sort by likes, most-liked first or least-liked first, so you can find the opinions other viewers agree with.",
    },
    {
      name: "Can I filter YouTube comments by date?",
      text: "Yes. Set a From and To date to narrow the list to comments posted during a specific period, such as a product launch or a news event.",
    },
    {
      name: "Do I need to create an account to view YouTube comments?",
      text: "No. The YouTube Comments Viewer is free and works without login. Paste a video link and load the comments.",
    },
    {
      name: "How long does it take to load comments on a large video?",
      text: "The service retrieves the full comment history page by page in the background. A progress bar shows how many comments have been indexed, and you can start browsing as soon as loading completes.",
    },
    {
      name: "Can I read replies to YouTube comments?",
      text: "Yes. Any comment with replies shows the reply count. Click it to expand and read every reply.",
    },
    {
      name: "What does the comment trend graph show?",
      text: "The graph charts how many comments were posted over the video's lifetime, aggregated by hour, day, month, or year. Drag to zoom into a period and double-click to reset.",
    },
  ],
};

export default function CommentsViewerSchema() {
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
      "availability": "https://schema.org/InStock",
    },
    "featureList": config.featureList,
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "YTVidHub",
      "url": "https://ytvidhub.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "YTVidHub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ytvidhub.com/logo.png",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1",
    },
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
      {/* 用原生 <script> 标签而非 next/script：动态流式渲染页面上
          next/script 只会进 hydration 队列，初始 HTML 里没有结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
