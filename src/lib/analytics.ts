// 统一埋点工具 - 支持 GA4 + Microsoft Clarity
// 多网站使用时，通过环境变量区分不同站点

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (method: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    __ytvidhubGaReady?: boolean;
  }
}

// ---- GA4 事件追踪 ----

/**
 * 发送自定义事件到 GA4
 * @param eventName 事件名称（下划线命名，如 "button_click"）
 * @param params 事件参数
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

/**
 * 追踪页面浏览（SPA 路由切换时使用）
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_location: url,
    page_title: title || document.title,
  });
}

// ---- 业务场景封装 ----

/** 追踪按钮点击 */
export function trackButtonClick(
  buttonName: string,
  extra?: Record<string, unknown>
) {
  trackEvent("button_click", { button_name: buttonName, ...extra });
}

/** 追踪表单提交 */
export function trackFormSubmit(
  formName: string,
  extra?: Record<string, unknown>
) {
  trackEvent("form_submit", { form_name: formName, ...extra });
}

/** 追踪文件下载 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent("file_download", { file_name: fileName, file_type: fileType });
}

/** 追踪搜索行为 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent("search", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/** 追踪用户注册/登录 */
export function trackAuth(method: "login" | "sign_up", provider?: string) {
  trackEvent(method, { method: provider || "email" });
}

/** 追踪外链点击 */
export function trackOutboundLink(url: string, linkText?: string) {
  trackEvent("click", {
    link_url: url,
    link_text: linkText,
    outbound: true,
  });
}

// ---- Microsoft Clarity 自定义标签 ----

/** 给 Clarity 会话打标签（用于筛选录屏） */
export function clarityTag(key: string, value: string) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("set", key, value);
}

/** 标记已登录用户 */
export function clarityIdentify(userId: string, sessionId?: string) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("identify", userId, sessionId);
}

// ---- 用户来源归因 ----

const SOURCE_KEY = "ytvidhub_user_source";

interface UserSource {
  referrer: string;
  landing_page: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  timestamp: string;
}

interface PurchaseItem {
  item_name: string;
  quantity?: number;
  item_variant?: string;
}

export interface PurchaseParams {
  transaction_id: string;
  value: number;
  currency?: string;
  items: PurchaseItem[];
}

const PENDING_PURCHASE_KEY = "ga4_pending_purchase";
const PENDING_PURCHASE_TTL_MS = 24 * 60 * 60 * 1000;

type StoredPurchaseParams = PurchaseParams & {
  createdAt: number;
};

function getPurchaseDedupeKey(transactionId: string) {
  return `ga4_purchase_${transactionId}`;
}

function safeGetStorageItem(storage: Storage | undefined, key: string) {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetStorageItem(
  storage: Storage | undefined,
  key: string,
  value: string
) {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {}
}

function safeRemoveStorageItem(storage: Storage | undefined, key: string) {
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {}
}

function hasTrackedPurchase(transactionId: string) {
  if (typeof window === "undefined") return false;
  const dedupeKey = getPurchaseDedupeKey(transactionId);
  return (
    safeGetStorageItem(window.localStorage, dedupeKey) === "1" ||
    safeGetStorageItem(window.sessionStorage, dedupeKey) === "1"
  );
}

function markPurchaseTracked(transactionId: string) {
  if (typeof window === "undefined") return;
  const dedupeKey = getPurchaseDedupeKey(transactionId);
  safeSetStorageItem(window.localStorage, dedupeKey, "1");
  safeSetStorageItem(window.sessionStorage, dedupeKey, "1");
}

export function savePendingPurchase(params: PurchaseParams) {
  if (typeof window === "undefined" || !params.transaction_id) return;

  safeSetStorageItem(
    window.localStorage,
    PENDING_PURCHASE_KEY,
    JSON.stringify({
      ...params,
      createdAt: Date.now(),
    } satisfies StoredPurchaseParams)
  );
}

export function readPendingPurchase(): PurchaseParams | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = safeGetStorageItem(window.localStorage, PENDING_PURCHASE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredPurchaseParams;
    if (!parsed?.transaction_id || typeof parsed.value !== "number") {
      clearPendingPurchase();
      return null;
    }

    if (
      !parsed.createdAt ||
      Date.now() - parsed.createdAt > PENDING_PURCHASE_TTL_MS
    ) {
      clearPendingPurchase();
      return null;
    }

    return {
      transaction_id: parsed.transaction_id,
      value: parsed.value,
      currency: parsed.currency,
      items: parsed.items,
    };
  } catch {
    clearPendingPurchase();
    return null;
  }
}

export function clearPendingPurchase() {
  if (typeof window === "undefined") return;
  safeRemoveStorageItem(window.localStorage, PENDING_PURCHASE_KEY);
}

/** 首次落地时捕获来源信息，存入 sessionStorage */
export function captureUserSource() {
  if (typeof window === "undefined") return;
  // 已经捕获过就不覆盖（保留首次来源）
  if (sessionStorage.getItem(SOURCE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const source: UserSource = {
    referrer: document.referrer || "(direct)",
    landing_page: window.location.pathname,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    timestamp: new Date().toISOString(),
  };

  sessionStorage.setItem(SOURCE_KEY, JSON.stringify(source));

  // 同时发一个 GA 事件记录首次落地
  trackEvent("user_landed", {
    referrer: source.referrer,
    landing_page: source.landing_page,
    utm_source: source.utm_source || "(none)",
    utm_medium: source.utm_medium || "(none)",
    utm_campaign: source.utm_campaign || "(none)",
  });
}

/** 获取当前会话的来源信息 */
export function getUserSource(): UserSource | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SOURCE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** 发送转化事件，自动附带来源归因数据 */
export function trackConversion(
  eventName: string,
  params?: Record<string, unknown>
) {
  const source = getUserSource();
  trackEvent(eventName, {
    ...params,
    source_referrer: source?.referrer || "(unknown)",
    source_landing: source?.landing_page || "(unknown)",
    source_utm_source: source?.utm_source || "(none)",
    source_utm_medium: source?.utm_medium || "(none)",
    source_utm_campaign: source?.utm_campaign || "(none)",
    source_utm_term: source?.utm_term || "(none)",
  });
}

export function trackPurchase(params: PurchaseParams) {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !window.__ytvidhubGaReady
  ) {
    return false;
  }
  if (!params.transaction_id) return false;

  if (hasTrackedPurchase(params.transaction_id)) return true;

  const source = getUserSource();
  window.gtag("event", "purchase", {
    transaction_id: params.transaction_id,
    value: params.value,
    currency: params.currency || "USD",
    items: params.items,
    source_referrer: source?.referrer || "(unknown)",
    source_landing: source?.landing_page || "(unknown)",
    source_utm_source: source?.utm_source || "(none)",
    source_utm_medium: source?.utm_medium || "(none)",
    source_utm_campaign: source?.utm_campaign || "(none)",
    source_utm_term: source?.utm_term || "(none)",
    transport_type: "beacon",
  });


  markPurchaseTracked(params.transaction_id);
  return true;
}

export async function trackPurchaseWithRetry(
  params: {
    transaction_id: string;
    value: number;
    currency?: string;
    items: PurchaseItem[];
  },
  options?: {
    attempts?: number;
    delayMs?: number;
  }
) {
  const attempts = Math.max(1, options?.attempts ?? 10);
  const delayMs = Math.max(100, options?.delayMs ?? 1000);

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const tracked = trackPurchase(params);
    if (tracked) return true;

    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return false;
}
