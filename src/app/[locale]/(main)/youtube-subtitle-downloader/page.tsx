import React from "react";
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { InteractiveDemo } from "@/components/demo/InteractiveDemo";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import Header from "@/components/Header";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import { Metadata } from "next";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    const baseUrl = "https://ytvidhub.com";
    const path = "/youtube-subtitle-downloader";
    const localePath = locale === 'en' ? "" : `/${locale}`;
    const canonicalUrl = `${baseUrl}${localePath}${path}`;

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en': `${baseUrl}${path}`,
                'es': `${baseUrl}/es${path}`,
            },
        },
    };
}

export default async function YouTubeSubtitleDownloaderPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    const tFormats = await getTranslations({ locale, namespace: 'formats' });
    const tHowto = await getTranslations({ locale, namespace: 'howto' });
    const tUsecases = await getTranslations({ locale, namespace: 'usecases' });
    const tComparison = await getTranslations({ locale, namespace: 'comparison' });
    const tTechnical = await getTranslations({ locale, namespace: 'technical' });
    const tFaq = await getTranslations({ locale, namespace: 'faq' });
    const tSingle = await getTranslations({ locale, namespace: 'singleDownloader' });

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
            <Header />
            <SubtitleDownloaderSchema />

            <main>
                <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[25rem] h-[25rem] bg-blue-400/10 rounded-full blur-[80px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[20rem] h-[20rem] bg-indigo-400/10 rounded-full blur-[80px] animate-pulse"></div>

                    <div className="relative pt-16 pb-20 text-center px-6 z-10">
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-slate-900 mb-6 leading-tight">
                            {tSingle.rich('hero.title', {
                                highlight: (chunks) => <span className="text-blue-600">{chunks}</span>
                            })}
                        </h1>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8 leading-relaxed">
                            {tSingle.rich('hero.subtitle', {
                                strong: (chunks) => <strong>{chunks}</strong>
                            })}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link
                                href="/"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                {tSingle('hero.cta.primary')}
                            </Link>
                            <Link
                                href="/bulk-youtube-subtitle-downloader"
                                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border-2 border-slate-200 shadow-sm transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
                            >
                                {tSingle('hero.cta.secondary')}
                            </Link>
                        </div>

                        <div className="max-w-4xl mx-auto mb-8">
                            <InteractiveDemo />
                        </div>
                    </div>
                </section>

                {/* === 2. SUPPORTED FORMATS === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            {tFormats('title')}
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            {tFormats('description')}
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-blue-600 font-bold text-lg">SRT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    {tFormats('srt.title')}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {tFormats('srt.description')}
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    1<br />
                                    00:00:01,000 --&gt; 00:00:04,000<br />
                                    Welcome to our tutorial...
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-purple-600 font-bold text-lg">VTT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    {tFormats('vtt.title')}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {tFormats('vtt.description')}
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    WEBVTT<br /><br />
                                    00:01.000 --&gt; 00:04.000<br />
                                    Welcome to our tutorial...
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-green-600 font-bold text-lg">TXT</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    {tFormats('txt.title')}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {tFormats('txt.description')}
                                </p>
                                <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500">
                                    Welcome to our tutorial on machine learning fundamentals. Today we'll explore...
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 3. HOW TO USE === */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            {tHowto('title')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-8">
                                    {['1', '2', '3'].map((step) => (
                                        <div key={step} className="flex gap-4">
                                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                                {step}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                                    {tHowto(`steps.${step}.title`)}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    {tHowto(`steps.${step}.description`)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-lg p-4">
                                            <p className="text-xs text-slate-500 mb-2">YouTube URL</p>
                                            <p className="font-mono text-sm text-slate-700">https://youtube.com/watch?v=example</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">SRT</button>
                                            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">VTT</button>
                                            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">TXT</button>
                                        </div>
                                        <button className="w-full py-3 bg-green-600 text-white rounded-lg font-bold">
                                            Download Subtitles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 4. USE CASES === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            {tUsecases('title')}
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            {tUsecases('description')}
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: "🎬", key: "editing" },
                                { icon: "♿", key: "accessibility" },
                                { icon: "🤖", key: "ai" },
                                { icon: "🌍", key: "translation" },
                                { icon: "📚", key: "research" },
                                { icon: "📝", key: "content" },
                                { icon: "🎓", key: "education" },
                                { icon: "🔍", key: "seo" }
                            ].map((item) => (
                                <div key={item.key} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                                        {tUsecases(`cases.${item.key}.title`)}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {tUsecases(`cases.${item.key}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* === TESTIMONIALS SECTION === */}
                <TestimonialSection />

                {/* === 5. FEATURES COMPARISON === */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            {tComparison('title')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">✕</span>
                                    {tComparison('others.title')}
                                </h3>
                                <ul className="space-y-3 text-slate-600">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">•</span>
                                            {tComparison(`others.features.${index}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">
                                <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    YTVidHub
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">✓</span>
                                    {tComparison('ours.title')}
                                </h3>
                                <ul className="space-y-3 text-blue-900 font-medium">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-blue-600 mt-1">•</span>
                                            {tComparison(`ours.features.${index}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 6. TECHNICAL SPECIFICATIONS === */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            {tTechnical('title')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    {tTechnical('supported.title')}
                                </h3>
                                <ul className="space-y-2 text-slate-600">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {tTechnical(`supported.types.${index}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    {tTechnical('output.title')}
                                </h3>
                                <ul className="space-y-2 text-slate-600">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {tTechnical(`output.formats.${index}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === 7. FAQ SECTION === */}
                <section className="py-16 bg-white" id="faq">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                            {tFaq('title')}
                        </h2>

                        <div className="space-y-6">
                            {['legal', 'formats', 'bulk', 'languages', 'limits'].map((key) => (
                                <div key={key} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                                        {tFaq(`questions.${key}.question`)}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {tFaq(`questions.${key}.answer`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}