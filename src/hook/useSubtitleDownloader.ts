// hooks/useSubtitleDownloader.ts
import { useState, useRef } from "react";
import { subtitleApi } from "@/lib/api";

export function useSubtitleDownloader(onCreditsChanged?: () => void) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<string>("");
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
        thumbnail: `https://i.ytimg.com/vi/${(item.url.match(/[?&]v=([^&#]+)/) || [])[1] || item.url.slice(-11)
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
    setStatusText("Checking credits...");

    try {
      setStatusText("Connecting...");
      startSmoothProgress(98);

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

      // 刷新积分显示
      if (onCreditsChanged) {
        onCreditsChanged();
      }

      setTimeout(() => setIsDownloading(false), 800);
    } catch (err: any) {
      setIsDownloading(false);

      // 特殊处理积分不足的错误
      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        const shouldBuyCredits = confirm(
          "Subtitle download requires 1 credit. You don't have enough credits.\n\nWould you like to purchase more credits?"
        );
        if (shouldBuyCredits) {
          window.open("/pricing", "_blank");
        }
      } else if (err.message.includes("login")) {
        const shouldLogin = confirm(
          "Please login to download subtitles.\n\nWould you like to login now?"
        );
        if (shouldLogin) {
          window.location.href = "/";
        }
      } else {
        alert(err.message);
      }
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const startBulkDownload = async (videos: any[], format: string) => {
    setIsDownloading(true);
    setProgress(5);
    setStatusText("Checking credits...");

    try {
      setStatusText("Initializing...");
      startSmoothProgress(30);

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

            // 刷新积分显示
            if (onCreditsChanged) {
              onCreditsChanged();
            }

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

      // 特殊处理积分不足的错误
      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        const shouldBuyCredits = confirm(
          `Bulk download requires ${videos.length} credits (1 per video). You don't have enough credits.\n\nWould you like to purchase more credits?`
        );
        if (shouldBuyCredits) {
          window.open("/pricing", "_blank");
        }
      } else if (err.message.includes("login")) {
        const shouldLogin = confirm(
          "Please login to download subtitles.\n\nWould you like to login now?"
        );
        if (shouldLogin) {
          window.location.href = "/";
        }
      } else {
        alert(err.message);
      }
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const generateAiSummary = async (
    videoUrl: string,
    onChunk?: (chunk: string) => void
  ) => {
    setIsAiLoading(true);
    setSummaryData("");

    try {
      console.log("🚀 Starting AI summary for:", videoUrl);
      const response = await subtitleApi.generateSummaryStream(videoUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Failed to start AI summary");
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

        setSummaryData(accumulatedText);

        if (onChunk) onChunk(accumulatedText);
      }

      console.log("✅ AI summary completed, length:", accumulatedText.length);
      return accumulatedText;
    } catch (err: any) {
      console.error("❌ Summary Stream Error:", err);

      // 特殊处理积分不足的错误
      if (err.message.includes("Insufficient credits") || err.message.includes("credit")) {
        const shouldBuyCredits = confirm(
          "AI Summary requires 2 credits. You don't have enough credits.\n\nWould you like to purchase more credits?"
        );
        if (shouldBuyCredits) {
          window.open("/pricing", "_blank");
        }
      } else if (err.message.includes("login")) {
        const shouldLogin = confirm(
          "Please login to use AI Summary feature.\n\nWould you like to login now?"
        );
        if (shouldLogin) {
          window.location.href = "/";
        }
      } else {
        alert(err.message || "An error occurred while generating summary");
      }

      throw err;
    } finally {
      setIsAiLoading(false);
      console.log("🏁 AI summary process finished");

      // 注意：积分扣除已经在API层面处理，这里只需要刷新用户信息
      // 不需要再次调用 deductCreditsAfterSummary
      if (onCreditsChanged) {
        onCreditsChanged();
      }
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
