"use client";

import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";

interface GuestTrialBannerProps {
  onTryNow: () => void;
}

export function GuestTrialBanner({ onTryNow }: GuestTrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 md:p-6 rounded-xl shadow-lg mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold mb-1">免费体验单次下载</h3>
          <p className="text-sm md:text-base text-blue-50">无需登录，立即体验字幕下载功能</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onTryNow}
            className="flex-1 md:flex-none bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            立即体验
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-4 py-2.5 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
