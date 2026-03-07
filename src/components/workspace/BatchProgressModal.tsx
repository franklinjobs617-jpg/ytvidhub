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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isComplete ? "Batch Complete" : "Processing Batch"}
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            {isComplete ? `${completed} succeeded, ${failed} failed` : `Processing video ${completed + failed + 1} of ${total}...`}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-600">Progress</span>
              <span className="text-slate-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <div className="text-2xl font-bold text-slate-900">{total}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Total</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">{completed}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">Success</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-red-600">{failed}</div>
              <div className="text-xs text-red-600 mt-1 font-medium">Failed</div>
            </div>
          </div>

          {!isComplete && currentVideo && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Currently Processing</div>
                <div className="text-sm text-blue-700 truncate mt-1">{currentVideo}</div>
              </div>
            </div>
          )}

          {failedVideos.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-900">Failed Videos ({failedVideos.length})</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {failedVideos.map((item, idx) => (
                  <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-sm font-semibold text-red-900 truncate">{item.title}</div>
                    <div className="text-xs text-red-700 mt-1">{item.error}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isComplete && completed > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-5">
              <div className="flex items-center gap-3 text-green-800">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-semibold">
                  Success Rate: {successRate.toFixed(1)}% - ZIP file ready for download
                </span>
              </div>
            </div>
          )}
        </div>

        {isComplete && (
          <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
            {completed > 0 && onDownload && (
              <button
                onClick={onDownload}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download ZIP
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl border-2 border-slate-200 transition-all"
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
