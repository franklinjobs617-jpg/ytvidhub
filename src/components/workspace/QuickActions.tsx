"use client";

import { Download, Copy, Share2, Check, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { subtitleApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface QuickActionsProps {
  videoUrl: string;
  videoTitle: string;
  onCopyAll: () => void;
}

export function QuickActions({ videoUrl, videoTitle, onCopyAll }: QuickActionsProps) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const handleDownload = async (format: 'srt' | 'vtt' | 'txt') => {
    if (user && (user.credits || 0) <= 0) {
      toast.error('Insufficient credits', {
        action: { label: 'Get Credits', onClick: () => router.push('/pricing') }
      });
      return;
    }

    setIsDownloading(true);
    setIsDownloadOpen(false);

    try {
      toast.info(`Preparing ${format.toUpperCase()} download...`);

      const blob = await subtitleApi.downloadSingle({
        url: videoUrl,
        lang: 'en',
        format,
        title: videoTitle
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoTitle}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`${format.toUpperCase()} downloaded successfully!`);

      refreshUser();
      setTimeout(() => refreshUser(), 1000);
      setTimeout(() => refreshUser(), 2000);
    } catch (error: any) {
      if (error?.message?.includes('Insufficient credits') || error?.message?.includes('credit')) {
        toast.error('Download Failed', {
          description: "You don't have enough credits.",
          action: { label: 'Get Credits', onClick: () => router.push('/pricing') }
        });
      } else {
        toast.error(error?.message || 'Download failed');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-100 bg-slate-50/50">
      {/* Download 下拉菜单 */}
      <div className="relative">
        <button
          onClick={() => setIsDownloadOpen(!isDownloadOpen)}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
        >
          {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          <span>Download</span>
          <ChevronDown size={12} className={`transition-transform ${isDownloadOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDownloadOpen && !isDownloading && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsDownloadOpen(false)} />
            <div className="absolute left-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => handleDownload('srt')}
                className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors"
              >
                SRT Format
              </button>
              <button
                onClick={() => handleDownload('vtt')}
                className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors"
              >
                VTT Format
              </button>
              <button
                onClick={() => handleDownload('txt')}
                className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors"
              >
                TXT Format
              </button>
            </div>
          </>
        )}
      </div>

      <button
        onClick={onCopyAll}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
      >
        <Copy size={14} />
        <span>Copy All</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
      >
        {copied ? <Check size={14} /> : <Share2 size={14} />}
        <span>{copied ? 'Copied!' : 'Share'}</span>
      </button>
    </div>
  );
}
