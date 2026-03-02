import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { buildCanonicalUrl } from '@/lib/url'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = '2026-03-02'

    // 仅英文的页面（低优先级或内容未翻译）
    const englishOnlyPages = [
        { path: '/guide/how-to-download-youtube-studio-subtitles', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/data-prep-guide', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/guide/clean-transcript-no-timestamp', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/guide/data-prep-toolkit', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/guide/mastering-vtt-data-analysis', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/tools/playlist-subtitles-bulk', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/guide/youtube-subtitles-api-free', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/guide/youtube-subtitles-for-llm-data', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/blog/creator-tutorials', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/blog/subtitle-accuracy-problem', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/blog/engineering-decisions-ytvidhub', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/blog/spanish-yt-channels-subtitles', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/blog/ai-youtube-video-summarizer', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/add-on', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/faq/subtitle-settings-guide', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
        { path: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' as const },
    ]

    // 多语言页面 — Google 会为每个 locale 生成 hreflang alternate
    const multilingualPages = [
        { path: '', priority: 1.0, changeFreq: 'weekly' as const },
        { path: '/youtube-subtitle-downloader', priority: 0.95, changeFreq: 'monthly' as const },
        { path: '/bulk-youtube-subtitle-downloader', priority: 0.95, changeFreq: 'monthly' as const },
        { path: '/extract-youtube-subtitles-online-tool', priority: 0.95, changeFreq: 'monthly' as const },
        { path: '/download-subs-from-youtube', priority: 0.9, changeFreq: 'monthly' as const },
        { path: '/tools/subtitle-extractor-online', priority: 0.9, changeFreq: 'monthly' as const },
        { path: '/guide/how-to-download-youtube-subtitles-complete-guide', priority: 0.9, changeFreq: 'monthly' as const },
        { path: '/guide/srt-vs-vtt', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/pricing', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/how-to-use', priority: 0.8, changeFreq: 'monthly' as const },
        { path: '/youtube-transcript-for-chatgpt', priority: 0.9, changeFreq: 'monthly' as const },
        { path: '/what-is-an-srt-file', priority: 0.7, changeFreq: 'yearly' as const },
        { path: '/faq', priority: 0.7, changeFreq: 'monthly' as const },
        { path: '/about', priority: 0.5, changeFreq: 'yearly' as const },
    ]

    const sitemap: MetadataRoute.Sitemap = []

    englishOnlyPages.forEach((page) => {
        sitemap.push({
            url: buildCanonicalUrl({ pathname: page.path }),
            lastModified: currentDate,
            changeFrequency: page.changeFreq,
            priority: page.priority,
        })
    })

    multilingualPages.forEach((page) => {
        routing.locales.forEach((locale) => {
            const url = buildCanonicalUrl({ locale, pathname: page.path })

            sitemap.push({
                url,
                lastModified: currentDate,
                changeFrequency: page.changeFreq,
                priority: page.priority,
                alternates: {
                    languages: routing.locales.reduce((acc, lang) => {
                        const altUrl = buildCanonicalUrl({ locale: lang, pathname: page.path })
                        acc[lang] = altUrl
                        return acc
                    }, {} as Record<string, string>)
                }
            })
        })
    })

    return sitemap
}