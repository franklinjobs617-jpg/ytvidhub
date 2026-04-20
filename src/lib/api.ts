// lib/api.ts
import { CREDIT_COSTS } from "@/config/credits";

type ApiError = Error & {
  status?: number;
  code?: string;
  details?: any;
  endpoint?: string;
};

function createApiError(
  message: string,
  extra: Partial<ApiError> = {},
): ApiError {
  const error = new Error(message) as ApiError;
  Object.assign(error, extra);
  return error;
}

function withHttpStatus(message: string, status: number): string {
  if (!message) return `Request failed (HTTP ${status})`;
  if (/HTTP\s*\d+/i.test(message)) return message;
  return `${message} (HTTP ${status})`;
}

async function parseErrorPayload(response: Response): Promise<{
  message: string;
  code?: string;
  details?: any;
}> {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (isJson) {
    const json = await response.json().catch(() => ({} as any));
    const message =
      json?.error ||
      json?.message ||
      json?.msg ||
      json?.detail ||
      json?.data?.message ||
      "";
    const details = json?.details ?? json?.data ?? json;
    return { message, code: json?.code, details };
  }

  const rawText = (await response.text().catch(() => "")).trim();
  const isHtml =
    contentType.includes("text/html") || /^<!doctype html/i.test(rawText);
  if (isHtml) return { message: "" };
  return { message: rawText };
}

async function throwResponseError(
  response: Response,
  fallbackMessage: string,
  endpoint?: string,
): Promise<never> {
  const payload = await parseErrorPayload(response);
  let message = payload.message || fallbackMessage;

  if (response.status === 401 && !payload.message) {
    message = "Authentication required. Please login again.";
  } else if (response.status === 404 && !payload.message) {
    message = `${fallbackMessage}: endpoint not found.`;
  } else if (response.status >= 500 && !payload.message) {
    message = `${fallbackMessage}: server error.`;
  }

  throw createApiError(withHttpStatus(message, response.status), {
    status: response.status,
    code: payload.code,
    details: payload.details,
    endpoint,
  });
}

async function ensureOk(
  response: Response,
  fallbackMessage: string,
  endpoint?: string,
): Promise<Response> {
  if (response.ok) return response;
  return throwResponseError(response, fallbackMessage, endpoint);
}

/**
 * 封装带认证的请求 - 使用Next.js代理API
 */
async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...options,
      headers,
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.message ? error.message : "fetch failed";
    throw createApiError(
      `Network error: ${reason}. Please check your connection and try again.`,
      {
        code: "NETWORK_ERROR",
        endpoint,
      },
    );
  }

  if (response.status === 402) {
    const payload = await parseErrorPayload(response);
    throw createApiError(payload.message || "Insufficient credits.", {
      code: payload.code || "INSUFFICIENT_CREDITS",
      details: payload.details,
      status: response.status,
      endpoint,
    });
  }

  return response;
}

export const subtitleApi = {
  // 1. 批量检查视频信息
  async batchCheck(urls: string[]) {
    const endpoint = "/api/subtitle/batch-check";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ urls }),
    });
    await ensureOk(res, "Batch check failed", endpoint);
    return res.json();
  },

  // 新增：智能混合URL解析
  async parseMixedUrls(urls: string[]) {
    const endpoint = "/api/subtitle/parse-mixed";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ urls }),
    });
    await ensureOk(res, "Mixed URL parsing failed", endpoint);
    return res.json();
  },

  // 新增：解析playlist/channel
  async parsePlaylist(url: string, maxVideos: number = 50) {
    const endpoint = "/api/subtitle/parse-playlist";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ url, max_videos: maxVideos }),
    });
    await ensureOk(res, "Playlist parsing failed", endpoint);
    return res.json();
  },

  // 2. 提交批量下载任务 (通过代理API，已包含积分检查和扣除)
  async submitBulkTask(videos: any[], lang: string, format: string) {
    const endpoint = "/api/subtitle/batch-submit";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ videos, lang, format }),
    });
    await ensureOk(res, "Bulk submission failed", endpoint);
    return res.json();
  },

  // 3. 检查任务状态
  async checkTaskStatus(taskId: string) {
    const endpoint = `/api/subtitle/task-status?task_id=${taskId}`;
    const res = await authenticatedFetch(endpoint);
    await ensureOk(res, "Status check failed", endpoint);
    return res.json();
  },

  // 4. 下载单个文件 (通过代理API，已包含积分检查和扣除)
  async downloadSingle(payload: {
    url: string;
    lang: string;
    format: string;
    title: string;
    isPreview?: boolean;
  }) {
    const endpoint = "/api/subtitle/download-single";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await ensureOk(res, "Download failed", endpoint);
    return res.blob();
  },

  // 5. 下载最终的 ZIP 包
  async downloadZip(taskId: string) {
    const endpoint = "/api/subtitle/download-zip";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ task_id: taskId }),
    });
    await ensureOk(res, "ZIP download failed", endpoint);
    return res.blob();
  },

  // 6. 获取视频基本信息（快速）
  async getVideoInfo(url: string) {
    const endpoint = "/api/subtitle/video-info";
    const res = await authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    await ensureOk(res, "Video info fetch failed", endpoint);
    return res.json();
  },

  // 7. 同步用户信息/积分 (使用本地API获取最新积分)
  async syncUser() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return null;

    try {
      // 优先使用本地API获取最新积分
      const res = await fetch("/api/sync-user", {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      });

      if (res.ok) {
        const json = await res.json();
        return json.data;
      }

      // 如果本地API失败，回退到外部API
      const fallbackRes = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      });

      if (!fallbackRes.ok) return null;
      const fallbackJson = await fallbackRes.json();
      return fallbackJson.data;
    } catch (error) {
      console.error("Failed to sync user:", error);
      return null;
    }
  },

  // 8. 扣除积分 (使用本地API)
  async deductCredits(amount: number, reason: string) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) throw new Error("Authentication required");

    console.log('Calling deduct-credits API:', { amount, reason });

    const res = await fetch("/api/deduct-credits", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount, reason })
    });

    console.log('Deduct-credits API response:', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok
    });

    if (!res.ok) {
      const payload = await parseErrorPayload(res);
      console.error("Deduct-credits API error:", payload);
      throw createApiError(
        withHttpStatus(payload.message || "Failed to deduct credits", res.status),
        {
          code: payload.code,
          details: payload.details,
          status: res.status,
          endpoint: "/api/deduct-credits",
        },
      );
    }

    const result = await res.json();
    console.log('Deduct-credits API success:', result);
    return result;
  },

  // 9. AI总结流式接口 (通过Next.js代理)
  async generateSummaryStream(url: string) {
    // 先检查用户是否登录
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      throw new Error("Please login to use AI Summary feature");
    }

    // 调用我们的Next.js代理API
    return fetch("/api/ai-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ url }),
    });
  },

  // 10. AI总结完成后扣除积分
  async deductCreditsAfterSummary() {
    return this.deductCredits(CREDIT_COSTS.summary, "AI Summary Generation");
  },

  // 11. 写入/更新历史记录
  async upsertHistory(payload: {
    videoId: string;
    videoUrl: string;
    title: string;
    thumbnail?: string;
    duration?: number;
    lastAction: "subtitle_download" | "ai_summary" | "video_analyze" | "batch_download";
    format?: string;
    lang?: string;
    summaryContent?: string;
    subtitleContent?: string;
    studyCards?: string;
    batchId?: string;
  }) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return;
    try {
      await fetch("/api/history/upsert", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch { }
  },

  // 12. 获取历史记录中保存的内容（summary / subtitle / study_cards）
  async getHistoryContent(videoId: string): Promise<{ summaryContent?: string; subtitleContent?: string; studyCards?: string }> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return {};
    try {
      const res = await fetch(`/api/history/content?videoId=${encodeURIComponent(videoId)}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) return {};
      return res.json();
    } catch {
      return {};
    }
  },

  // 13. 获取最近历史记录
  async getHistory(limit = 10) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return [];
    try {
      const res = await fetch(`/api/history?limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data ?? [];
    } catch {
      return [];
    }
  },

  // 14. 访客字幕解析（无需登录，后端按 24h 配额限制）
  async guestPreviewSubtitle(url: string, lang: string = "en", format: string = "vtt") {
    const endpoint = "/api/subtitle/guest-download";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, lang, format }),
    });
    await ensureOk(res, "Guest subtitle preview failed", endpoint);
    return res.json();
  },

  // 兼容保留：历史调用仍可拿到 Blob
  async guestDownload(url: string, lang: string = "en", format: string = "vtt") {
    const preview = await this.guestPreviewSubtitle(url, lang, format);
    const text = typeof preview?.text === "string" ? preview.text : "";
    return new Blob([text], { type: "text/plain;charset=utf-8" });
  },

  // 15. 获取批量任务历史
  async getBatchHistory() {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return [];
    try {
      const res = await fetch("/api/subtitle/batch-history", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.tasks ?? [];
    } catch {
      return [];
    }
  },
};
