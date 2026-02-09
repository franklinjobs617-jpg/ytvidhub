// lib/api.ts

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

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (response.status === 402) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Insufficient credits.");
  }

  return response;
}

export const subtitleApi = {
  // 1. 批量检查视频信息
  async batchCheck(urls: string[]) {
    const res = await authenticatedFetch("/api/subtitle/batch-check", {
      method: "POST",
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) throw new Error("Batch check failed");
    return res.json();
  },

  // 新增：智能混合URL解析
  async parseMixedUrls(urls: string[]) {
    const res = await authenticatedFetch("/api/subtitle/parse-mixed", {
      method: "POST",
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) throw new Error("Mixed URL parsing failed");
    return res.json();
  },

  // 新增：解析playlist/channel
  async parsePlaylist(url: string, maxVideos: number = 50) {
    const res = await authenticatedFetch("/api/subtitle/parse-playlist", {
      method: "POST",
      body: JSON.stringify({ url, max_videos: maxVideos }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Playlist parsing failed");
    }
    return res.json();
  },

  // 2. 提交批量下载任务 (通过代理API，已包含积分检查和扣除)
  async submitBulkTask(videos: any[], lang: string, format: string) {
    const res = await authenticatedFetch("/api/subtitle/batch-submit", {
      method: "POST",
      body: JSON.stringify({ videos, lang, format }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Bulk submission failed");
    }
    return res.json();
  },

  // 3. 检查任务状态
  async checkTaskStatus(taskId: string) {
    const res = await authenticatedFetch(`/api/subtitle/task-status?task_id=${taskId}`);
    if (!res.ok) throw new Error("Status check failed");
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
    const res = await authenticatedFetch("/api/subtitle/download-single", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Download failed");
    }
    return res.blob();
  },

  // 5. 下载最终的 ZIP 包
  async downloadZip(taskId: string) {
    const res = await authenticatedFetch("/api/subtitle/download-zip", {
      method: "POST",
      body: JSON.stringify({ task_id: taskId }),
    });
    if (!res.ok) throw new Error("ZIP download failed");
    return res.blob();
  },

  // 6. 获取视频基本信息（快速）
  async getVideoInfo(url: string) {
    const res = await authenticatedFetch("/api/subtitle/video-info", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error("Video info fetch failed");
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
      const errorData = await res.json().catch(() => ({}));
      console.error('Deduct-credits API error:', errorData);
      throw new Error(errorData.error || "Failed to deduct credits");
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
    return this.deductCredits(2, "AI Summary Generation");
  },
};