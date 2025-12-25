// hooks/useSubtitleDownloader.ts
import { useState, useRef } from "react";
import { subtitleApi } from "@/lib/api";

export function useSubtitleDownloader() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<string>(""); // 流式数据改为 string
  const [statusText, setStatusText] = useState("");
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startSmoothProgress = (max = 95) => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => (prev >= max ? prev : prev + (max - prev) * 0.1));
    }, 200);
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const analyzeUrls = async (urls: string[]) => {
    setIsAnalyzing(true);
    setProgress(0);
    try {
      const data = await subtitleApi.batchCheck(urls);
      return data.results.map((item: any) => ({
        id: (item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11),
        url: item.url,
        title: item.video_info.title || "Untitled",
        uploader: item.video_info.uploader || "Unknown",
        thumbnail: `https://i.ytimg.com/vi/${
          (item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11)
        }/hqdefault.jpg`,
        hasSubtitles: item.can_download,
      }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startSingleDownload = async (video: any, format: string) => {
    setIsDownloading(true);
    setProgress(10);
    setStatusText("Connecting...");
    startSmoothProgress(98);
    try {
      const blob = await subtitleApi.downloadSingle({
        url: video.url,
        lang: "en",
        format,
        title: video.title,
      });
      setProgress(100);
      setStatusText("Complete!");
      triggerDownload(
        blob,
        `${video.title.replace(/[\\/:*?"<>|]/g, "_")}.${format}`
      );
      setTimeout(() => setIsDownloading(false), 800);
    } catch (err: any) {
      setIsDownloading(false);
      alert(err.message);
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const startBulkDownload = async (videos: any[], format: string) => {
    setIsDownloading(true);
    setProgress(5);
    setStatusText("Initializing...");
    startSmoothProgress(30);
    try {
      const task = await subtitleApi.submitBulkTask(videos, "en", format);
      const timer = setInterval(async () => {
        try {
          const status = await subtitleApi.checkTaskStatus(task.task_id);
          if (status.status === "completed") {
            clearInterval(timer);
            setProgress(100);
            setStatusText("Success!");
            const blob = await subtitleApi.downloadZip(task.task_id);
            triggerDownload(blob, `bulk_subs_${Date.now()}.zip`);
            setTimeout(() => setIsDownloading(false), 1000);
          } else {
            const [c, t] = (status.progress || "0/0").split("/").map(Number);
            setProgress(t > 0 ? (c / t) * 100 : 15);
            setStatusText(`Processing ${c}/${t}...`);
          }
        } catch (e) {
          clearInterval(timer);
          throw e;
        }
      }, 3000);
    } catch (err: any) {
      setIsDownloading(false);
      alert(err.message);
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  // 🔥 修复后的生成 AI 摘要 (流式)
  const generateAiSummary = async (videoUrl: string, onChunk?: (chunk: string) => void) => {
    setIsAiLoading(true);
    setSummaryData(""); // 开始时清空上一次的内容
    
    try {
      const response = await subtitleApi.generateSummaryStream(videoUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to start AI summary");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (!reader) throw new Error("Response body is null");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        
        // 更新 Hook 内部状态
        setSummaryData(accumulatedText);
        
        // 如果外部传入了回调，也执行它
        if (onChunk) onChunk(accumulatedText);
      }
      
      return accumulatedText;
    } catch (err: any) {
      console.error("Summary Stream Error:", err);
      alert(err.message || "An error occurred while generating summary");
      throw err;
    } finally {
      setIsAiLoading(false);
    }
  };

  return {
    isAiLoading,
    summaryData,
    setSummaryData,
    generateAiSummary,
    analyzeUrls,
    startSingleDownload,
    startBulkDownload,
    isAnalyzing,
    isDownloading,
    progress,
    statusText,
  };
}