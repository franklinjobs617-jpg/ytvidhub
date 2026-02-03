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

      // 延迟刷新积分显示，确保服务器端已更新
      setTimeout(() => {
        if (onCreditsChanged) {
          onCreditsChanged();
        }
      }, 1000);

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

            // 延迟刷新积分显示，确保服务器端已更新
            setTimeout(() => {
              if (onCreditsChanged) {
                onCreditsChanged();
              }
            }, 1000);

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

        // 处理混合了状态信息和内容的 chunk
        // 假设 chunk 可能是 "__STATUS__:Checking...\nActualContent"

        // 简单处理：检查 chunk 是否包含状态标记
        if (chunk.includes("__STATUS__:")) {
          const parts = chunk.split("__STATUS__:");
          for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (!part) continue;

            // 检查这一部分是否是紧接着 STATUS 的
            // 实际上这里的分割逻辑可能有点脆弱，因为流的不确定性
            // 更好的方式是逐行处理，但为了演示简单修复：

            const lineEndIndex = part.indexOf("\n");
            if (lineEndIndex !== -1 && i > 0) { // i>0 意味着它是在 STATUS 之后
              const statusMsg = part.substring(0, lineEndIndex).trim();
              setStatusText(statusMsg);

              // 剩余部分是实际内容
              const content = part.substring(lineEndIndex + 1);
              if (content) {
                accumulatedText += content;
                setSummaryData(accumulatedText);
                if (onChunk) onChunk(accumulatedText);
              }
            } else if (i === 0 && !chunk.startsWith("__STATUS__")) {
              // 第一部分，且不是以 STATUS 开头，说明是普通内容
              accumulatedText += part;
              setSummaryData(accumulatedText);
              if (onChunk) onChunk(accumulatedText);
            }
          }
        }
        else if (chunk.includes("__ERROR__:")) {
          const errorMsg = chunk.split("__ERROR__:")[1];
          alert("AI Generation Error: " + errorMsg);
          break;
        }
        else {
          accumulatedText += chunk;
          setSummaryData(accumulatedText);
          if (onChunk) onChunk(accumulatedText);
        }
      }

      console.log("✅ AI summary completed, length:", accumulatedText.length);
      setStatusText(""); // 清除状态
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

      // 延迟刷新积分显示，确保服务器端已更新
      setTimeout(() => {
        if (onCreditsChanged) {
          onCreditsChanged();
        }
      }, 1000);
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
