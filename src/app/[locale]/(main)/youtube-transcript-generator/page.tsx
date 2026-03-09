import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import TranscriptGeneratorHero from "@/components/transcript/TranscriptGeneratorHero";
import ScrollToTopButton from "@/components/transcript/ScrollToTopButton";
import {
  ShieldCheck,
  Zap,
  Layers,
  Globe2,
  Info,
  CheckCircle2,
  FileText,
  Clock,
  Layout,
  Play,
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
    "mainEntity": [1, 2, 3, 4, 10].map(i => {
      // 这里的逻辑需要小心处理，因为 JSON 里定义的是 questions.what 等
      // 为了保持代码简洁，我可以手动定义常用的 key
      const keys = ['what', 'how', 'formats', 'free', 'accuracy'];
      const key = keys[i - 1];
      if (!key) return null;
      return {
        "@type": "Question",
        "name": faqT(`questions.${key}.question`),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqT(`questions.${key}.answer`)
        }
      };
    }).filter(Boolean)
  };

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TranscriptGeneratorHero />

      {/* Main Content Area */}
      <main className="relative z-10 pb-24 pt-12 md:pt-16">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/30 to-transparent -z-10" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

          {/* Developer Insight Section */}
          <section className="mb-24 relative z-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/60 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col md:flex-row gap-8 items-start pt-2">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100/50">
                    <Info className="text-indigo-600" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-5 leading-tight">
                      {t('insight.title')}
                    </h3>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-8">
                      "{t('insight.content')}"

                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">F</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base">{t('insight.author')}</span>
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{locale === 'zh' ? '首席开发' : 'Lead Developer'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest mb-4 inline-block">
                AI Driven Innovation
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {t('features.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="group bg-slate-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-indigo-400 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 transition-transform group-hover:-rotate-3">
                  <Sparkles className="text-indigo-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('features.ai.title')}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{t('features.accurate.description')}</p>
                <div className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <span>Accuracy Benchmark</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              <div className="group bg-slate-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 transition-transform group-hover:rotate-3">
                  <FileText className="text-blue-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('features.formats.title')}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{t('features.formats.description')}</p>
                <div className="mt-8 flex items-center gap-2 text-blue-500 font-bold text-sm">
                  <span>Format Guide</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* Transcription Performance */}
          <section className="mb-32">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative border border-slate-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] rounded-full -mr-20 -mt-20" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">{t('performance.title')}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {t('performance.description')}
                  </p>
                  <ul className="space-y-4">
                    {(t.raw('performance.benchmarks') as string[]).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                        <CheckCircle2 size={18} className="text-indigo-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] font-black text-slate-500">
                          <th className="px-6 py-5">{t('performance.table.type')}</th>
                          <th className="px-6 py-5">{t('performance.table.speed')}</th>
                          <th className="px-6 py-5">{t('performance.table.accuracy')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium text-slate-300">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Zap size={14} className="text-indigo-400" /> Shorts / TikToks
                          </td>
                          <td className="px-6 py-5">Instant (&lt;1s)</td>
                          <td className="px-6 py-5 text-emerald-400 font-bold">99.9%</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Layout size={14} className="text-blue-400" /> EdTech Courses
                          </td>
                          <td className="px-6 py-5">~15s / hr</td>
                          <td className="px-6 py-5 text-emerald-400 font-bold">99.7%</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Clock size={14} className="text-emerald-400" /> Long-form Video
                          </td>
                          <td className="px-6 py-5">&lt;30s / hr</td>
                          <td className="px-6 py-5 text-emerald-400 font-bold">99.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow Integration */}
          <section className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-snug">
                  {t('workflow.title')}
                </h2>
                <div className="space-y-8">
                  {Object.entries(t.raw('workflow.items')).map(([key, item]: [string, any]) => (
                    <div key={key} className="group flex gap-6 hover:translate-x-1 transition-transform">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${key === 'ai' ? 'bg-slate-900 text-white' :
                          key === 'pro' ? 'bg-indigo-600 text-white' :
                            'bg-emerald-600 text-white'
                        }`}>
                        {key === 'ai' ? <Sparkles size={20} /> : key === 'pro' ? <FileText size={20} /> : <ShieldCheck size={20} />}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-[3rem] -rotate-2 opacity-60" />
                <div className="relative bg-white rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-inner">
                    <img
                      src="/image/blog-ai-summary-interface.webp"
                      alt="YouTube Transcript Generator Output"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Guide / How It Works */}
          <section className="bg-slate-50/60 rounded-[3rem] p-10 md:p-20 border border-slate-200/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">{faqT('subtitle')}</h2>
              </div>

              <div className="grid gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group bg-white p-8 rounded-[2rem] border border-slate-200 transition-all hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-900/5">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base font-black italic">{i}</span>
                      {t(`howItWorks.step${i}.title` as any)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed pl-14">
                      {t(`howItWorks.step${i}.description` as any)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-32 text-center relative">
            <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-[3.5rem] p-12 md:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/5">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)]" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -mb-32 -mr-32" />
              <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10 leading-tight">{t('cta.title')}</h2>
              <p className="text-indigo-200/80 text-lg md:text-xl mb-12 relative z-10 max-w-xl mx-auto">{t('cta.subtitle')}</p>
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

function ArrowRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
