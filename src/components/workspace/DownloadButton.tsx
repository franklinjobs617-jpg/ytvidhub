"use client";

import { useState } from "react";
import { Download, ChevronDown, Loader2 } from "lucide-react";
import { subtitleApi } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

interface DownloadButtonProps {
  videoUrl: string;
  videoTitle: string;
}

export function DownloadButton({ videoUrl, videoTitle }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const handleDownload = async (format: 'srt' | 'vtt' | 'txt') => {
    // 检查积分
    if (user && (user.credits || 0) <= 0) {
      setIsCreditsModalOpen(true);
      setIsOpen(false);
      return;
    }

    setIsDownloading(true);
    setIsOpen(false);

    try {
      toast.info(`Preparing ${format.toUpperCase()} download...`);

      // 不传 isPreview 参数，让后端自动扣除积分
      const blob = await subtitleApi.downloadSingle({
        url: videoUrl,
        lang: 'en',
        format,
        title: videoTitle
      });

      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoTitle}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`${format.toUpperCase()} downloaded successfully!`);

      // 立即刷新一次
      refreshUser();

      // 延迟刷新确保服务器已更新
      setTimeout(() => {
        refreshUser();
      }, 1000);

      // 再次刷新确保同步
      setTimeout(() => {
        refreshUser();
      }, 2000);
    } catch (error: any) {
      // 特殊处理积分不足错误
      if (error?.message?.includes('Insufficient credits') || error?.message?.includes('credit')) {
        setIsCreditsModalOpen(true);
      } else {
        toast.error(error?.message || 'Download failed. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isDownloading}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium text-sm transition-all shadow-sm"
        >
          {isDownloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          <span className="hidden sm:inline">Download Single</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && !isDownloading && (
          <>
            {/* 背景遮罩 */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 下拉菜单 */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => handleDownload('srt')}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <span className="font-medium text-slate-700">SRT Format</span>
                <span className="text-xs text-slate-400 group-hover:text-slate-600">.srt</span>
              </button>
              <button
                onClick={() => handleDownload('vtt')}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <span className="font-medium text-slate-700">VTT Format</span>
                <span className="text-xs text-slate-400 group-hover:text-slate-600">.vtt</span>
              </button>
              <button
                onClick={() => handleDownload('txt')}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <span className="font-medium text-slate-700">TXT Format</span>
                <span className="text-xs text-slate-400 group-hover:text-slate-600">.txt</span>
              </button>
            </div>
          </>
        )}
      </div>

      <InsufficientCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        requiredAmount={1}
        featureName="Subtitle Download"
      />
    </>
  );
}

