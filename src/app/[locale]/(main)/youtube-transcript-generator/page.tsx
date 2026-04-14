import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import TranscriptGeneratorHero from "@/components/transcript/TranscriptGeneratorHero";
import ScrollToTopButton from "@/components/transcript/ScrollToTopButton";
import {
  Zap,
  FileText,
  Sparkles
} from "lucide-react";



type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transcriptPage' });

  const canonicalUrl = buildCanonicalUrl({ locale, pathname: '/youtube-transcript-generator' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-transcript-generator' }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-transcript-generator' }),
      },
    },
  };
}

export default async function YouTubeTranscriptGeneratorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transcriptPage' });
  const faqT = await getTranslations({ locale, namespace: 'transcriptFaq' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Transcript Generator",
    "description": t('description'),
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "AI-powered transcription",
      "Multiple export formats: SRT, VTT, TXT",
      "Adaptive noise cancellation"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ['extract', 'what', 'formats', 'free', 'accuracy'].map((key) => {
      return {
        "@type": "Question",
        "name": faqT(`questions.${key}.question`),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqT(`questions.${key}.answer`)
        }
      };
    })
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TranscriptGeneratorHero />

      {/* BLUF Introduction - SEO Critical First 100 Words */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong>Need to get transcript of YouTube video quickly?</strong> Our free YouTube transcript generator converts any video to text in under 30 seconds. Download transcript outputs in TXT, SRT, or VTT for AI training, research, accessibility, and content workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="pb-24 pt-16 md:pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">

          {/* Features Grid */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t('features.title')}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('features.ai.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('features.accurate.description')}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('features.formats.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('features.formats.description')}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('features.fast.title')}</h3>
                <p className="text-slate-600 leading-relaxed">{t('features.fast.description')}</p>
              </div>
            </div>
          </section>

          {/* Product Demo GIF */}
          <section className="mb-32">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    See It In Action
                  </h2>
                  <p className="text-slate-600">
                    Watch how easy it is to generate YouTube transcripts in seconds
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-white shadow-xl">
                  <img
                    src="/image/5ed5628e-810f-48c8-a171-35c94fbb7e57.gif"
                    alt="YouTube Transcript Generator Demo - Converting video to text in real-time"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Who Uses YouTube Transcript Generators?
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                From content creators to researchers, discover how professionals leverage transcripts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Content Creators</h3>
                <p className="text-slate-600 text-sm">Repurpose video content into blog posts, social media, and SEO-optimized articles</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Educators & Students</h3>
                <p className="text-slate-600 text-sm">Create study materials, lecture notes, and accessible learning resources</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Researchers</h3>
                <p className="text-slate-600 text-sm">Build training datasets for machine learning models and NLP applications</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Video Editors</h3>
                <p className="text-slate-600 text-sm">Generate accurate SRT/VTT subtitles for professional video production</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">♿</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Accessibility Teams</h3>
                <p className="text-slate-600 text-sm">Ensure content compliance with WCAG standards for hearing-impaired audiences</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 border border-rose-100">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Market Researchers</h3>
                <p className="text-slate-600 text-sm">Analyze video content, extract insights, and perform sentiment analysis</p>
              </div>
            </div>
          </section>

          {/* Performance Stats */}
          <section className="mb-32">
            <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-white">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('performance.title')}</h2>
                <p className="text-slate-400 text-lg mb-12">
                  {t('performance.description')}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
                    <div className="text-slate-400">Shorts / TikToks</div>
                    <div className="text-sm text-slate-500 mt-1">Instant (&lt;1s)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">99.7%</div>
                    <div className="text-slate-400">EdTech Courses</div>
                    <div className="text-sm text-slate-500 mt-1">~15s / hr</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">99.5%</div>
                    <div className="text-slate-400">Long-form Video</div>
                    <div className="text-sm text-slate-500 mt-1">&lt;30s / hr</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('comparison.title')}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {t('comparison.subtitle')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">{t('comparison.headers.feature')}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">YTVidHub</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">{t('comparison.headers.others')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">{t('comparison.features.speed')}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-indigo-600">{t('comparison.ytvidhub.speed')}</td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">{t('comparison.others.speed')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">{t('comparison.features.accuracy')}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-indigo-600">{t('comparison.ytvidhub.accuracy')}</td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">{t('comparison.others.accuracy')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">{t('comparison.features.formats')}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-indigo-600">{t('comparison.ytvidhub.formats')}</td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">{t('comparison.others.formats')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-700">{t('comparison.features.languages')}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-indigo-600">{t('comparison.ytvidhub.languages')}</td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">{t('comparison.others.languages')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{faqT('subtitle')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                      {i}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {t(`howItWorks.step${i}.title` as never)}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t(`howItWorks.step${i}.description` as never)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{faqT('title')}</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">{faqT('subtitle')}</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {['what', 'how', 'formats', 'free', 'accuracy'].map((key) => (
                <details key={key} className="bg-white rounded-xl border border-slate-200 p-6 group">
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                    {faqT(`questions.${key}.question`)}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {faqT(`questions.${key}.answer`)}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
              <ScrollToTopButton>
                {t('cta.button')}
              </ScrollToTopButton>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

