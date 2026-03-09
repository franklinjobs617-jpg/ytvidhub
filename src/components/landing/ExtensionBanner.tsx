"use client";

import { Chrome, Zap, Download, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function ExtensionBanner() {
  const t = useTranslations("extensionBanner");

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* 主标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* 主CTA卡片 */}
        <div className="relative">
          {/* 发光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-20"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-10">

              {/* 左侧：功能列表 */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t("features.fast.title")}</h3>
                    <p className="text-sm text-slate-600">{t("features.fast.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Download size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t("features.oneClick.title")}</h3>
                    <p className="text-sm text-slate-600">{t("features.oneClick.description")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t("features.free.title")}</h3>
                    <p className="text-sm text-slate-600">{t("features.free.description")}</p>
                  </div>
                </div>
              </div>

              {/* 右侧：CTA */}
              <div className="flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Chrome size={40} className="text-white" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t("cta.users")}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-slate-600">4.8/5</span>
                  </div>
                </div>

                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Chrome size={24} />
                  <span>{t("cta.button")}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <p className="text-xs text-slate-400">
                  {t("cta.note")}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            💡 <strong>{t("tip.label")}</strong> {t("tip.text")}
          </p>
        </div>

      </div>
    </section>
  );
}
