// lib/api.ts

const BASE_URL = "https://ytdlp.vistaflyer.com/api";

/**
 * 封装带认证的请求
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

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 402) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Insufficient credits.");
  }

  return response;
}

export const subtitleApi = {
  // 1. 批量检查视频信息
  async batchCheck(urls: string[]) {
    const res = await authenticatedFetch("/batch_check", {
      method: "POST",
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) throw new Error("Batch check failed");
    return res.json();
  },

  // 2. 提交批量下载任务
  async submitBulkTask(videos: any[], lang: string, format: string) {
    const res = await authenticatedFetch("/batch_submit", {
      method: "POST",
      body: JSON.stringify({ videos, lang, format }),
    });
    if (!res.ok) throw new Error("Bulk submission failed");
    return res.json();
  },

  // 3. 检查任务状态
  async checkTaskStatus(taskId: string) {
    const res = await authenticatedFetch(`/task_status?task_id=${taskId}`);
    if (!res.ok) throw new Error("Status check failed");
    return res.json();
  },

  // 4. 下载单个文件
  async downloadSingle(payload: {
    url: string;
    lang: string;
    format: string;
    title: string;
  }) {
    const res = await authenticatedFetch("/download", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Download failed");
    }
    return res.blob();
  },

  // 5. 下载最终的 ZIP 包
  async downloadZip(taskId: string) {
    const res = await authenticatedFetch("/download_zip", {
      method: "POST",
      body: JSON.stringify({ task_id: taskId }),
    });
    if (!res.ok) throw new Error("ZIP download failed");
    return res.blob();
  },

  // 6. 同步用户信息/积分
  async syncUser() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) return null;
    const res = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  },

  async generateSummaryStream(url: string) {
    return authenticatedFetch("/generate_summary_stream", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  },
};