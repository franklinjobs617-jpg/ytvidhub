import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import HeroSection from "@/components/landing/HeroSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'subtitleExtractorPage' });

  const canonicalUrl = buildCanonicalUrl({ locale, pathname: '/youtube-subtitle-extractor' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-subtitle-extractor' }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-subtitle-extractor' }),
      },
    },
  };
}

export default async function SubtitleExtractorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'subtitleExtractorPage' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "HowTo"],
    "name": "YTVidHub Subtitle Extractor",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "step": [
      { "@type": "HowToStep", "text": "Paste YouTube Video or Playlist URL" },
      { "@type": "HowToStep", "text": "Choose format: SRT, VTT, or Plain Text" },
      { "@type": "HowToStep", "text": "One-click bulk extract and download" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection />

      <div className="bg-white">
        {/* Expert Insight */}
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-900">{t('insight.title')}</h3>
            <p className="text-slate-700 italic mb-4">{t('insight.content')}</p>
            <p className="font-semibold">{t('insight.author')}</p>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 border-l-4 border-red-600 pl-4">{t('features.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-red-500 transition-colors">
              <h3 className="text-xl font-bold mb-3">{t('features.ai.title')}</h3>
              <p className="text-slate-600">{t('features.ai.description')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-red-500 transition-colors">
              <h3 className="text-xl font-bold mb-3">{t('features.bulk.title')}</h3>
              <p className="text-slate-600">{t('features.bulk.description')}</p>
            </div>
          </div>
        </section>

        {/* Performance Table */}
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">{t('performance.title')}</h2>
          <p className="text-slate-600 mb-6">We believe in transparency. Here is how our extraction engine performs across different video types:</p>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">{t('performance.table.type')}</th>
                  <th className="px-6 py-4 text-left font-bold">{t('performance.table.speed')}</th>
                  <th className="px-6 py-4 text-left font-bold">{t('performance.table.accuracy')}</th>
                  <th className="px-6 py-4 text-left font-bold">AI Sync Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4">Shorts (Bulk)</td>
                  <td className="px-6 py-4">&lt; 1.5s per video</td>
                  <td className="px-6 py-4">100% (SRT)</td>
                  <td className="px-6 py-4">Verified</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">Playlists (50+)</td>
                  <td className="px-6 py-4">~12s total</td>
                  <td className="px-6 py-4">100% (VTT/TXT)</td>
                  <td className="px-6 py-4">Verified</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">Podcasts (2hr+)</td>
                  <td className="px-6 py-4">&lt; 5s total</td>
                  <td className="px-6 py-4">99.8% (SRT)</td>
                  <td className="px-6 py-4">Optimized</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Case Study */}
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">Case Study: Scaling an AI Knowledge Base</h2>
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <p className="text-slate-700 mb-4"><strong className="text-slate-900">The Challenge:</strong> An Edu-Tech startup needed to convert 450 lecture videos into a searchable text database.</p>
            <p className="text-slate-700"><strong className="text-slate-900">The Solution:</strong> Using YTVidHub's <strong>YouTube Playlist Subtitle Extractor</strong>, they processed all 450 videos in a single batch. In just 10 minutes, they had 450 organized SRT files ready for their LLM training pipeline, a task that would have taken 15+ hours manually.</p>
          </div>
        </section>

        {/* Visual Gallery */}
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Visual Output Gallery</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            <div className="flex-shrink-0 w-80 h-48 rounded-xl border border-slate-200 overflow-hidden">
              <img
                src="/image/A graphic breakdown of the SRT file format.webp"
                alt="YouTube Subtitle Extractor SRT Output Sample - Professional subtitle format with timestamps"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-shrink-0 w-80 h-48 rounded-xl border border-slate-200 overflow-hidden">
              <img
                src="/image/blog-ai-summary-interface.webp"
                alt="AI Video Summary from YouTube Subtitles - Clean text extraction for AI processing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-16 rounded-t-[50px]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('faq.title')}</h2>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold mb-3 text-red-600">{t(`faq.q${i}.question`)}</h3>
                  <p className="text-slate-700">{t(`faq.q${i}.answer`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Privacy Note */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <p className="text-center mb-4">&copy; 2026 YTVidHub - Professional Subtitle Extraction Solutions.</p>
            <p className="text-center text-sm">Privacy First: No video data or URLs are ever stored on our servers. Processing happens in your browser session.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
