"use client";

import { Chrome } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

export default function ExtensionBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-md">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">
          Available on
        </p>
        <a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <Chrome size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Add to Chrome</p>
            <p className="text-xs text-slate-400 mt-0.5">One-click download on YouTube</p>
          </div>
        </a>
      </div>
    </section>
  );
}
