"use client";

import { CheckCircle, XCircle, Loader2, Download, AlertCircle } from "lucide-react";

interface BatchProgressModalProps {
  isOpen: boolean;
  total: number;
  completed: number;
  failed: number;
  currentVideo?: string;
  failedVideos: Array<{ title: string; error: string }>;
  onDownload?: () => void;
  onClose?: () => void;
}

export function BatchProgressModal({
  isOpen,
  total,
  completed,
  failed,
  currentVideo,
  failedVideos,
  onDownload,
  onClose
}: BatchProgressModalProps) {
  if (!isOpen) return null;

  const progress = total > 0 ? ((completed + failed) / total) * 100 : 0;
  const isComplete = completed + failed >= total;
  const successRate = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isComplete ? "批量下载完成" : "批量处理中"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isComplete ? `成功: ${completed} / 失败: ${failed}` : `正在处理第 ${completed + failed + 1} 个视频...`}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
              <span className="text-slate-700">总体进度</span>
              <span className="text-slate-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-slate-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{total}</div>
              <div className="text-[10px] sm:text-xs text-slate-600 mt-1">总数</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{completed}</div>
              <div className="text-[10px] sm:text-xs text-green-700 mt-1">成功</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">{failed}</div>
              <div className="text-[10px] sm:text-xs text-red-700 mt-1">失败</div>
            </div>
          </div>

          {!isComplete && currentVideo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-blue-900">正在处理</div>
                <div className="text-xs sm:text-sm text-blue-700 truncate mt-1">{currentVideo}</div>
              </div>
            </div>
          )}

          {failedVideos.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">失败记录 ({failedVideos.length})</h3>
              </div>
              <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
                {failedVideos.map((item, idx) => (
                  <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
                    <div className="text-xs sm:text-sm font-medium text-red-900 truncate">{item.title}</div>
                    <div className="text-[10px] sm:text-xs text-red-700 mt-1">{item.error}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isComplete && completed > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mt-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  成功率: {successRate.toFixed(1)}% - 已生成压缩包
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {isComplete && completed > 0 && onDownload && (
            <button
              onClick={onDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Download className="w-4 sm:w-5 h-4 sm:h-5" />
              下载压缩包
            </button>
          )}
          {isComplete && onClose && (
            <button
              onClick={onClose}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              关闭
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
