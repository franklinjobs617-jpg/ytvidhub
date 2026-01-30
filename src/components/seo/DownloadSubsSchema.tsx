import Script from 'next/script';

export default function DownloadSubsSchema() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Download Subs from YouTube",
        "description": "Free online YouTube subtitle downloader. Extract SRT, VTT, and plain text formats. Supports bulk extraction and AI summarization.",
        "url": "https://ytvidhub.com/download-subs-from-youtube",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "featureList": [
            "Download YouTube SRT subtitles",
            "Extract VTT web captions",
            "Generate clean TXT transcripts",
            "Support for auto-generated captions",
            "Multi-language track support",
            "No registration required"
        ],
        "author": {
            "@type": "Organization",
            "name": "YTVidHub",
            "url": "https://ytvidhub.com"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to download YouTube subtitles?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply paste the YouTube video link into YTVidHub, select your preferred format, and click download."
                }
            },
            {
                "@type": "Question",
                "name": "What formats are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We support SRT, VTT, and AI-optimized plain text (TXT) formats."
                }
            }
        ]
    };

    return (
        <>
            <Script
                id="download-subs-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData),
                }}
            />
            <Script
                id="download-subs-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
        </>
    );
}
