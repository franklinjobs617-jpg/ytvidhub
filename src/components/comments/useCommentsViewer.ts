"use client";

// 评论查看器状态机：
// idle → resolving → info → startFetch → fetching(2s轮询) → browsing
//                              ├→ deleting(轮询) ─→ info（删除完成后重新加载视频）
//                              └→ 409 tooLarge/blockedToday ─→ info（横幅提示）
// requestSeq 防竞态：排序/过滤快速切换时丢弃过期响应。
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CommentsApiError,
  getComments,
  getFetchStatus,
  getGraphDates,
  getStats,
  getVideoDetail,
  resolveUrl,
  startFetch,
  abortFetch,
  getReplies,
} from "@/lib/commentsApi";
import type {
  Comment,
  CommentsInfo,
  FetchStatusPayload,
  SortOrder,
  Stats,
  VideoObject,
} from "@/lib/commentsApi";

export type Phase =
  | "idle"
  | "resolving"
  | "info"
  | "startFetch"
  | "fetching"
  | "deleting"
  | "browsing";

export type Notice =
  | { kind: "info" | "aborted" | "fetchError"; text: string }
  | null;

export type Fatal = { status: number; reason: string; message: string } | null;

export type ReplyEntry =
  | { status: "loading" }
  | { status: "loaded"; items: Comment[] }
  | { status: "error" };

const POLL_INTERVAL_MS = 2000;

// 永远返回非空对象（网络错误也有兜底形状）
function errToFatal(e: unknown): NonNullable<Fatal> {
  if (e instanceof CommentsApiError) {
    return { status: e.status, reason: e.reason, message: e.message };
  }
  return {
    status: 0,
    reason: "network",
    message: e instanceof Error ? e.message : "Network error",
  };
}

export function useCommentsViewer() {
  // 输入与视频
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoObject | null>(null);
  const [commentsInfo, setCommentsInfo] = useState<CommentsInfo | null>(null);

  // 抓取生命周期
  const [phase, setPhase] = useState<Phase>("idle");
  const [fetchStatus, setFetchStatus] = useState<FetchStatusPayload | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [fatal, setFatal] = useState<Fatal>(null);

  // 浏览状态
  const [sort, setSortState] = useState<SortOrder>("dateOldest");
  const [minDate, setMinDate] = useState<number | null>(null);
  const [maxDate, setMaxDate] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [subCount, setSubCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [dates, setDates] = useState<number[] | null>(null);
  const [replyState, setReplyState] = useState<Record<string, ReplyEntry>>({});

  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestSeq = useRef(0);

  // 轮询/回调里避免过期闭包：每次渲染同步最新状态到 ref
  const stateRef = useRef({ videoId, sort, pageSize, minDate, maxDate, commentsInfo, phase });
  stateRef.current = { videoId, sort, pageSize, minDate, maxDate, commentsInfo, phase };

  const clearPollTimer = useCallback(() => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
  }, []);

  useEffect(() => clearPollTimer, [clearPollTimer]);

  // ---- 评论加载（显式参数 + 序号防竞态）----
  const loadComments = useCallback(
    async (
      pageN: number,
      opts: {
        sort: SortOrder;
        pageSize: number;
        minDate: number | null;
        maxDate: number | null;
      },
      seq?: number
    ) => {
      const id = stateRef.current.videoId;
      if (!id) return;
      const mySeq = seq ?? ++requestSeq.current;
      setLoadingComments(true);
      setCommentsError(null);
      try {
        const data = await getComments(id, {
          sort: opts.sort,
          page: pageN,
          pageSize: opts.pageSize,
          ...(opts.minDate != null ? { minDate: opts.minDate } : {}),
          ...(opts.maxDate != null ? { maxDate: opts.maxDate } : {}),
        });
        if (mySeq !== requestSeq.current) return; // 过期响应丢弃
        setComments((prev) => (pageN === 0 ? data.items : [...prev, ...data.items]));
        setPage(pageN);
        setSubCount(data.subCount);
        setTotalCount(data.totalCount);
        setShowMore(data.showMore);
        if (data.fullStatsData) {
          setStats(data.fullStatsData[0]);
          setDates(data.fullStatsData[1]);
        }
      } catch (e) {
        if (mySeq !== requestSeq.current) return;
        setCommentsError(
          e instanceof CommentsApiError ? e.message : "Failed to load comments"
        );
      } finally {
        if (mySeq === requestSeq.current) setLoadingComments(false);
      }
    },
    []
  );

  // ---- 抓取完成 → 浏览态 ----
  const dataReady = useCallback(() => {
    clearPollTimer();
    setPhase("browsing");
    const seq = ++requestSeq.current;
    const { videoId: id, commentsInfo: info, sort: s, pageSize: ps, minDate: mn, maxDate: mx } =
      stateRef.current;
    if (!id) return;

    // 统计与图表各自异步、错误隔离，不阻塞评论浏览
    getStats(id)
      .then((st) => {
        if (seq === requestSeq.current) setStats(st);
      })
      .catch(() => {});
    if (info?.graph && info.num >= 10) {
      getGraphDates(id)
        .then((d) => {
          if (seq === requestSeq.current) setDates(d.dates);
        })
        .catch(() => {});
    }
    void loadComments(0, { sort: s, pageSize: ps, minDate: mn, maxDate: mx }, seq);
  }, [clearPollTimer, loadComments]);

  // ---- 轮询 ----
  const startPolling = useCallback(() => {
    clearPollTimer();
    const tick = async () => {
      const id = stateRef.current.videoId;
      if (!id) return;
      try {
        const status = await getFetchStatus(id);
        setFetchStatus(status);
        if (status.state === "done") {
          dataReady();
          return;
        }
        if (status.state === "aborted") {
          setNotice({
            kind: "aborted",
            text: "Fetch was stopped. Partial data is kept — click Load all comments to resume.",
          });
          dataReady();
          return;
        }
        if (status.state === "error") {
          setNotice({
            kind: "fetchError",
            text: `Fetch failed (${status.errorReason ?? "unknown error"}). Partial data is kept — try again.`,
          });
          dataReady();
          return;
        }
        setPhase(status.state === "deleting" ? "deleting" : "fetching");
        pollTimer.current = setTimeout(tick, POLL_INTERVAL_MS);
      } catch {
        // 网络抖动：继续轮询
        pollTimer.current = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };
    void tick();
  }, [clearPollTimer, dataReady]);

  // ---- 动作 ----
  const loadVideo = useCallback(async (id: string) => {
    try {
      const payload = await getVideoDetail(id);
      setVideoId(id);
      setVideo(payload.video);
      setCommentsInfo(payload.commentsInfo);
      setPhase("info");
    } catch (e) {
      setPhase("idle");
      setFatal(errToFatal(e));
    }
  }, []);

  const submitUrl = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      setFatal(null);
      setNotice(null);
      setPhase("resolving");
      try {
        const result = await resolveUrl(trimmed);
        // type=comment 的直链定位（resolve/comment）留作后续增强，先按视频加载
        await loadVideo(result.videoId);
      } catch (e) {
        setPhase("idle");
        setFatal(errToFatal(e));
      }
    },
    [loadVideo]
  );

  const loadAll = useCallback(async () => {
    const id = stateRef.current.videoId;
    if (!id) return;
    const p = stateRef.current.phase ?? "info";
    if (p === "startFetch" || p === "fetching" || p === "deleting") return; // 防双击
    setFatal(null);
    setNotice(null);
    setPhase("startFetch");
    try {
      const res = await startFetch(id);
      if (res.state === "deleting") {
        setPhase("deleting");
        startPolling();
      } else if (res.state === "done") {
        dataReady();
      } else {
        setPhase("fetching");
        startPolling();
      }
    } catch (e) {
      const err = errToFatal(e);
      if (err.reason === "tooLarge" || err.reason === "blockedToday") {
        // 配额/上限限制 → 友好横幅，停在 info
        const info = stateRef.current.commentsInfo;
        const text =
          err.reason === "tooLarge"
            ? `This video has more comments than the viewer can load at once (max ${info?.max ?? "-"}).`
            : `Comment loading is temporarily limited for large videos (limit ${info?.largeAfterThreshold ?? "-"}). Try again later.`;
        setNotice({ kind: "info", text });
      } else {
        setFatal(err);
      }
      setPhase("info");
    }
  }, [dataReady, startPolling]);

  const retryFetch = useCallback(() => {
    setNotice(null);
    void loadAll();
  }, [loadAll]);

  const handleAbort = useCallback(async () => {
    const id = stateRef.current.videoId;
    if (!id) return;
    try {
      await abortFetch(id);
    } catch {
      // 忽略中止失败，轮询会带回真实状态
    }
  }, []);

  const clearAll = useCallback(() => {
    clearPollTimer();
    requestSeq.current++;
    setUrl("");
    setVideoId(null);
    setVideo(null);
    setCommentsInfo(null);
    setPhase("idle");
    setFetchStatus(null);
    setNotice(null);
    setFatal(null);
    setSortState("dateOldest");
    setMinDate(null);
    setMaxDate(null);
    setPageSize(25);
    setPage(0);
    setComments([]);
    setSubCount(0);
    setTotalCount(0);
    setShowMore(false);
    setLoadingComments(false);
    setCommentsError(null);
    setStats(null);
    setDates(null);
    setReplyState({});
  }, [clearPollTimer]);

  // 排序/过滤/分页变更 → 重置到第 0 页
  const changeSort = useCallback(
    (s: SortOrder) => {
      setSortState(s);
      const { pageSize: ps, minDate: mn, maxDate: mx } = stateRef.current;
      void loadComments(0, { sort: s, pageSize: ps, minDate: mn, maxDate: mx });
    },
    [loadComments]
  );

  const changePageSize = useCallback(
    (n: number) => {
      setPageSize(n);
      const { sort: s, minDate: mn, maxDate: mx } = stateRef.current;
      void loadComments(0, { sort: s, pageSize: n, minDate: mn, maxDate: mx });
    },
    [loadComments]
  );

  const setDateRange = useCallback(
    (fromMs: number | null, toMs: number | null) => {
      setMinDate(fromMs);
      setMaxDate(toMs);
      const { sort: s, pageSize: ps } = stateRef.current;
      void loadComments(0, { sort: s, pageSize: ps, minDate: fromMs, maxDate: toMs });
    },
    [loadComments]
  );

  const loadMore = useCallback(() => {
    const { sort: s, pageSize: ps, minDate: mn, maxDate: mx } = stateRef.current;
    void loadComments(page + 1, { sort: s, pageSize: ps, minDate: mn, maxDate: mx });
  }, [loadComments, page]);

  const toggleReplies = useCallback(
    async (commentId: string) => {
      const current = replyState[commentId];
      if (current && current.status !== "error") {
        // 已加载 → 折叠
        setReplyState((prev) => {
          const next = { ...prev };
          delete next[commentId];
          return next;
        });
        return;
      }
      setReplyState((prev) => ({ ...prev, [commentId]: { status: "loading" } }));
      try {
        const data = await getReplies(commentId);
        setReplyState((prev) => ({
          ...prev,
          [commentId]: { status: "loaded", items: data.items },
        }));
      } catch {
        setReplyState((prev) => ({ ...prev, [commentId]: { status: "error" } }));
      }
    },
    [replyState]
  );

  return {
    // 输入与视频
    url,
    setUrl,
    videoId,
    video,
    commentsInfo,
    // 生命周期
    phase,
    fetchStatus,
    notice,
    fatal,
    // 浏览
    sort,
    minDate,
    maxDate,
    pageSize,
    comments,
    subCount,
    totalCount,
    showMore,
    loadingComments,
    commentsError,
    stats,
    dates,
    replyState,
    // 动作
    submitUrl,
    loadVideo,
    loadAll,
    retryFetch,
    handleAbort,
    clearAll,
    changeSort,
    changePageSize,
    setDateRange,
    loadMore,
    toggleReplies,
  };
}
