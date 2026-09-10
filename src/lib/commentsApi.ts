// 评论查看器客户端 API 层（公开，免登录）。
// 类型与 flask-service /api/v1 接口一一对应（见 comment-viewer/docs/rest-api-refactor.md）。
const BASE = "/api/comments";

export type Comment = {
  id: string;
  textDisplay: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelId: string;
  likeCount: number;
  publishedAt: number; // 毫秒
  updatedAt: number; // 毫秒
  totalReplyCount: number;
};

export type VideoObject = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string; // ISO
    channelId: string;
    channelTitle: string;
    thumbnails?: { default?: { url: string }; medium?: { url: string }; high?: { url: string } };
    liveBroadcastContent?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

export type CommentsInfo = {
  num: number;
  disabled: boolean;
  max: number; // 超 maxLoad 时为上限值，否则 -1
  largeAfterThreshold: number; // 超每日阈值时为阈值，否则 -1
  graph: boolean;
  error: boolean;
};

export type VideoDetailPayload = {
  video: VideoObject;
  commentsInfo: CommentsInfo;
};

export type FetchStatusPayload = {
  state: "idle" | "fetching" | "done" | "deleting" | "aborted" | "error";
  indexed: number;
  total: number;
  percent: number;
  startedAt: number | null;
  errorReason: string | null;
};

export type SortOrder = "dateOldest" | "dateNewest" | "likesMost" | "likesLeast";
export type GraphInterval = "hour" | "day" | "month" | "year";

export type Stats = {
  topLevelComments: number;
  totalLikes: number;
  avgLikes: number;
  avgPerDay: number;
};

export type CommentsPage = {
  reset: boolean;
  items: Comment[];
  showMore: boolean;
  subCount: number;
  totalCount: number;
  fullStatsData: [Stats, number[]] | null;
};

export type ResolveResult =
  | { type: "video"; videoId: string }
  | { type: "comment"; videoId: string; parentId: string; replyId?: string };

export class CommentsApiError extends Error {
  status: number;
  reason: string;
  constructor(status: number, reason: string, message: string) {
    super(message);
    this.status = status;
    this.reason = reason;
  }
}

async function parseCommentsError(res: Response): Promise<CommentsApiError> {
  let reason = "internal";
  let message = `Request failed (${res.status})`;
  try {
    const payload = await res.json();
    if (payload?.error) {
      reason = payload.error.reason ?? reason;
      message = payload.error.message ?? message;
    }
  } catch {
    // 非 JSON 错误体，保留默认文案
  }
  return new CommentsApiError(res.status, reason, message);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // next.config.ts 有 trailingSlash: true：请求自带尾斜杠，避免每请求一次 308 跳转
  const [pathOnly, query] = path.split("?");
  const url = query ? `${BASE}${pathOnly}/?${query}` : `${BASE}${path}/`;
  const res = await fetch(url, {
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    throw await parseCommentsError(res);
  }
  return res.json() as Promise<T>;
}

// ---- 接口封装（与 docs §4 对应）----

export function resolveUrl(url: string): Promise<ResolveResult> {
  return request<ResolveResult>("/resolve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
}

export function getVideoDetail(videoId: string): Promise<VideoDetailPayload> {
  return request<VideoDetailPayload>(`/videos/${videoId}`);
}

export function startFetch(
  videoId: string
): Promise<{ state: string; indexed: number; total: number }> {
  return request(`/videos/${videoId}/fetch`, { method: "POST" });
}

export function getFetchStatus(videoId: string): Promise<FetchStatusPayload> {
  return request<FetchStatusPayload>(`/videos/${videoId}/fetch/status`);
}

export function abortFetch(videoId: string): Promise<{ state: string }> {
  return request(`/videos/${videoId}/fetch`, { method: "DELETE" });
}

export function deleteVideo(videoId: string): Promise<{ deleted?: boolean; state?: string }> {
  return request(`/videos/${videoId}`, { method: "DELETE" });
}

export function getComments(
  videoId: string,
  opts: {
    sort: SortOrder;
    page: number;
    pageSize: number;
    minDate?: number;
    maxDate?: number;
  }
): Promise<CommentsPage> {
  const params = new URLSearchParams({
    sort: opts.sort,
    page: String(opts.page),
    pageSize: String(opts.pageSize),
  });
  if (opts.minDate !== undefined) params.set("minDate", String(opts.minDate));
  if (opts.maxDate !== undefined) params.set("maxDate", String(opts.maxDate));
  return request<CommentsPage>(`/videos/${videoId}/comments?${params.toString()}`);
}

export function getReplies(parentId: string): Promise<{ id: string; items: Comment[] }> {
  return request(`/comments/${parentId}/replies`);
}

export function getStats(videoId: string): Promise<Stats> {
  return request<Stats>(`/videos/${videoId}/stats`);
}

// 后端"方案 B"（服务端按 interval 分桶聚合）预留：需要时加 ?interval= 查询参数。
// 当前服务端返回全量日期数组，前端聚合。
export function getGraphDates(videoId: string): Promise<{ dates: number[] }> {
  return request(`/videos/${videoId}/stats/graph`);
}
