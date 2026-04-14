import Script from 'next/script';

export default function DownloadSubsSchema() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Transcript Download Tool",
        "description": "Free online YouTube transcript download tool. Export transcript files as TXT, SRT, and VTT in seconds.",
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
            "Download YouTube transcript as TXT",
            "Download YouTube transcript as SRT",
            "Download YouTube transcript as VTT",
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
                "name": "How to download YouTube transcript?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Paste the YouTube video URL into YTVidHub, choose TXT, SRT, or VTT, then click download."
                }
            },
            {
                "@type": "Question",
                "name": "Can I download YouTube transcript as text?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Select TXT format to export transcript text without subtitle timing syntax."
                }
            },
            {
                "@type": "Question",
                "name": "What formats are supported for transcript download?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YTVidHub supports TXT, SRT, and VTT transcript export formats."
                }
            },
            {
                "@type": "Question",
                "name": "Can I download transcripts from playlists?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Use the bulk downloader for playlist and channel-level transcript extraction."
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
