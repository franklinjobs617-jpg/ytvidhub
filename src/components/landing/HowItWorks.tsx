import React from 'react';

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* 装饰性背景：淡蓝色的模糊圆球，呼应 HeroSection */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
  How It Works
</h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            From raw link to clean data in seconds. No complex setup required.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          
          {/* 连接线 (仅在桌面端显示) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 -z-10"></div>

          {/* Step 1 */}
          <div className="relative group">
            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              </div>
              
              {/* Step Number Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                Step 01
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Paste Links</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Paste YouTube video/playlist URLs, or upload a .txt file for bulk processing.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-indigo-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                Step 02
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Analysis</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Our engine extracts subtitles and generates summaries or mind maps instantly.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-teal-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider shadow-sm">
                Step 03
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">Export Data</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Download as SRT/VTT/TXT, or copy the AI summary directly to your notes.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}