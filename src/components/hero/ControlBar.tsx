"use client";

import { Coins, Download, RotateCcw, Zap, Sparkles, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ControlBar({
  userCredits,
  format,
  setFormat,
  availableFormats,
  onReset,
  onAction,
  canReset,
  canAction,
  actionLabel,
  isDownloading,
  isActionClicked = false,
  mode = "download",
}: any) {
  
  const [showPricingTooltip, setShowPricingTooltip] = useState(false);
  
  // 判断是否是未登录状态
  const isGuest = userCredits === "--";
  const creditsNum = isGuest ? 0 : parseInt(userCredits) || 0;
  const maxCredits = 5; // 免费计划的最大积分

  return (
    <div className="relative">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 w-full">
        
        {/* === 左侧区域：资产与设置 === */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full md:w-auto">
          
          {/* 1. 优化后的"钱包胶囊"与动态标签 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 pl-1 bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all hover:border-slate-300 hover:shadow-md group">
              
              {/* 积分展示区 */}
              <div className="flex items-center gap-2.5 px-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-200 blur-sm opacity-50 rounded-full"></div>
                  <Coins size={18} className="text-amber-500 relative z-10" fill="currentColor" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className={`text-sm font-black tabular-nums ${isGuest ? "text-slate-400" : creditsNum <= 0 ? "text-red-600" : "text-slate-700"}`}>
                    {userCredits}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider scale-90 origin-left">
                    Credits
                  </span>
                </div>
                {/* 积分状态指示器 */}
                {!isGuest && (
                  <div className={`w-2 h-2 rounded-full ${creditsNum <= 0 ? "bg-red-500 animate-pulse" : creditsNum <= 2 ? "bg-yellow-500" : "bg-green-500"}`}></div>
                )}
              </div>

              {/* 分割线 */}
              <div className="w-px h-6 bg-slate-200 mx-1"></div>

              {/* 充值按钮 - 更有吸引力的设计 */}
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all group/btn relative overflow-hidden"
              >
                <span className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 group-hover/btn:from-blue-700 group-hover/btn:to-violet-700">
                  Get More
                </span>
                <Zap size={10} className="text-violet-500" fill="currentColor" />
                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* 动态标签：FREE PLAN 进度条 */}
            {!isGuest && creditsNum <= maxCredits && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  FREE PLAN: {creditsNum}/{maxCredits}
                </span>
                <div className="w-12 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${(creditsNum / maxCredits) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* 积分不足警告 */}
            {!isGuest && creditsNum <= 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                  ⚠️ No Credits Left
                </span>
              </div>
            )}
          </div>

          {/* 2. 格式选择器 */}
          {availableFormats.length > 0 && (
            <div className="flex p-1 bg-slate-100/80 rounded-lg border border-slate-100/50">
              {availableFormats.map((f: string) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`
                    px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wide transition-all duration-200
                    ${
                      format === f
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* === 右侧区域：操作按钮 === */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {canReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 text-slate-400 hover:text-slate-600 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <RotateCcw size={14} /> <span className="hidden md:inline">Reset</span>
            </button>
          )}

          {/* 增强的主操作按钮 */}
          <button
            onClick={onAction}
            disabled={!canAction || isDownloading}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all shadow-sm
              ${
                canAction
                  ? (actionLabel.includes("Analyze") || actionLabel.includes("Download")) && !isDownloading
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 active:scale-[0.98]"
                    : "bg-slate-900 text-white hover:bg-black hover:shadow-lg hover:shadow-slate-200/50 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }
            `}
          >
            {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isActionClicked && mode === "summary" ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : mode === "summary" ? (
                <Sparkles size={16} />
            ) : (
                <Download size={16} />
            )}
            <span className="uppercase tracking-widest">
              {isActionClicked && mode === "summary" ? "Opening..." : actionLabel}
            </span>
          </button>
        </div>
      </div>

      {/* 底部信用说明区域 */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4">
        <span>1 LINK = 1 DOWNLOAD CREDIT</span>
        {isGuest && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowPricingTooltip(true)}
              onMouseLeave={() => setShowPricingTooltip(false)}
              className="ml-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <HelpCircle size={12} />
            </button>
            
            {/* 定价说明 Tooltip */}
            {showPricingTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Free: 5 credits • Pro: Unlimited downloads
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}