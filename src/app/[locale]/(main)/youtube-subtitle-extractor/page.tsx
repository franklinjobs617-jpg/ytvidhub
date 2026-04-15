import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import SubtitleExtractorHero from "@/components/subtitle/SubtitleExtractorHero";
import {
  ShieldCheck,
  Zap,
  Layers,
  Globe2,
  DownloadIcon,
  Info,
  CheckCircle2,
  FileText,
  Clock,
  Layout,
  Play,
} from "lucide-react";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "subtitleExtractorPage",
  });
  const canonicalUrl = buildCanonicalUrl({
    locale,
    pathname: "/youtube-subtitle-extractor",
  });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: buildCanonicalUrl({
          locale: "en",
          pathname: "/youtube-subtitle-extractor",
        }),
        "x-default": buildCanonicalUrl({
          locale: "en",
          pathname: "/youtube-subtitle-extractor",
        }),
      },
    },
  };
}
export default async function SubtitleExtractorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "subtitleExtractorPage",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "HowTo"],
    name: "YTVidHub Subtitle Extractor",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    step: [
      { "@type": "HowToStep", text: "Paste YouTube video or playlist URL" },
      { "@type": "HowToStep", text: "Select format: SRT, VTT or plain text" },
      { "@type": "HowToStep", text: "One-click bulk extraction and download" },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq.q1.question"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.q1.answer") },
      },
      {
        "@type": "Question",
        name: t("faq.q2.question"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.q2.answer") },
      },
      {
        "@type": "Question",
        name: t("faq.q3.question"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.q3.answer") },
      },
      {
        "@type": "Question",
        name: t("faq.q4.question"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.q4.answer") },
      },
    ],
  };
  return (
    <div className="bg-white min-h-screen article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
  
      <SubtitleExtractorHero /> {/* Main Content Area */}
      <main className="relative z-10 pb-24 pt-12 md:pt-16">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/30 to-transparent -z-10" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Developer Insight Section - Minimalist Floating Card */}
          <section className="mb-24 relative z-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/60 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col md:flex-row gap-8 items-start pt-2">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                    <Info className="text-blue-600" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-5 leading-tight">
                      {t("insight.title")}
                    </h3>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-8">
                      "{t("insight.content")}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        F
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base">
                          {t("insight.author")}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                          {locale === "zh" ? "首席开发" : "Lead Developer"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Capabilities Grid */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest mb-4 inline-block">
                Professional Grade
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight article-h2">
                {t("features.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="group bg-slate-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 transition-transform group-hover:-rotate-3">
                  <Zap className="text-blue-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t("features.ai.title")}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {t("features.ai.description")}
                </p>
                <div className="mt-8 flex items-center gap-2 text-blue-600 font-bold text-sm">
                  <span>Learn about AI Cleaning</span>
                  <ArrowRight size={16} />
                </div>
              </div>
              <div className="group bg-slate-50/50 p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-100 transition-transform group-hover:rotate-3">
                  <Layers className="text-red-500" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t("features.bulk.title")}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {t("features.bulk.description")}
                </p>
                <div className="mt-8 flex items-center gap-2 text-red-500 font-bold text-sm">
                  <span>Explore Bulk Mode</span> <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </section>
          {/* Efficiency & Accuracy Benchmarks */}
          <section className="mb-32">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -mr-20 -mt-20" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight article-h2">
                    {t("performance.title")}
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {t("performance.description")}
                  </p>
                  <ul className="space-y-4">
                    {(t.raw("performance.benchmarks") as string[]).map(
                      (item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm font-medium text-slate-300"
                        >
                          <CheckCircle2 size={18} className="text-blue-400" />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="lg:w-2/3 w-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] font-black text-slate-500">
                          <th className="px-6 py-5">
                            {t("performance.table.type")}
                          </th>
                          <th className="px-6 py-5">
                            {t("performance.table.speed")}
                          </th>
                          <th className="px-6 py-5">
                            {t("performance.table.accuracy")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium text-slate-300">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Zap size={14} className="text-blue-400" /> Shorts
                            (Bulk)
                          </td>
                          <td className="px-6 py-5">&lt; 1.5s per video</td>
                          <td className="px-6 py-5 text-blue-400 font-bold">
                            100%
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Layout size={14} className="text-blue-400" />
                            Playlists (50+)
                          </td>
                          <td className="px-6 py-5">~12s total</td>
                          <td className="px-6 py-5 text-blue-400 font-bold">
                            100%
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <Clock size={14} className="text-blue-400" />
                            Podcasts (2hr+)
                          </td>
                          <td className="px-6 py-5">&lt; 5s total</td>
                          <td className="px-6 py-5 text-blue-400 font-bold">
                            99.8%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Use Case Visual Interface */}
          <section className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight article-h2">
                  {t("workflow.title")}
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {t("workflow.items.ai.title")}
                      </h4>
                      <p className="text-slate-600">
                        {t("workflow.items.ai.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {t("workflow.items.pro.title")}
                      </h4>
                      <p className="text-slate-600">
                        {t("workflow.items.pro.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">
                        {t("workflow.items.privacy.title")}
                      </h4>
                      <p className="text-slate-600">
                        {t("workflow.items.privacy.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-[3rem] -rotate-2" />
                <div className="relative bg-white rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 overflow-hidden">
                  <div className="aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden border border-slate-800">
                    <img
                      src="/image/blog-ai-summary-interface.webp"
                      alt="YouTube Subtitle Extractor Interface - Bulk download subtitles from playlists"
                      className="w-full h-full object-cover opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Use Cases Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight article-h2">
                {t("useCases.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-3xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t("useCases.ai.title")}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {t("useCases.ai.description")}
                </p>
                <p className="text-blue-600 font-bold text-sm">
                  {t("useCases.ai.stats")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-3xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t("useCases.research.title")}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {t("useCases.research.description")}
                </p>
                <p className="text-blue-600 font-bold text-sm">
                  {t("useCases.research.stats")}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-3xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Layers className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t("useCases.content.title")}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {t("useCases.content.description")}
                </p>
                <p className="text-blue-600 font-bold text-sm">
                  {t("useCases.content.stats")}
                </p>
              </div>
            </div>
          </section>
          {/* Testimonials Section */}
          <section className="mb-32">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight article-h2">
                  {t("testimonials.title")}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {(t.raw("testimonials.items") as any[]).map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
                  >
                    <p className="text-slate-600 leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {item.author}
                        </p>
                        <p className="text-slate-500 text-xs">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* FAQ Experience */}
          <section className="bg-slate-50/50 rounded-[3rem] p-10 md:p-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight article-h2">
                  {t("faq.title")}
                </h2>
              </div>
              <div className="grid gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="group bg-white p-8 rounded-3xl border border-slate-200 transition-all hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-black italic">
                        {i}
                      </span>
                      {t(`faq.q${i}.question`)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed pl-12">
                      {t(`faq.q${i}.answer`)}
                    </p>
                  </div>
                ))}
              </div>
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
      <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
