// 统一埋点工具 - 支持 GA4 + Microsoft Clarity
// 多网站使用时，通过环境变量区分不同站点

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (method: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ---- GA4 事件追踪 ----

/**
 * 发送自定义事件到 GA4
 * @param eventName 事件名称（下划线命名，如 "button_click"）
 * @param params 事件参数
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

/**
 * 追踪页面浏览（SPA 路由切换时使用）
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_location: url,
    page_title: title || document.title,
  });
}

// ---- 业务场景封装 ----

/** 追踪按钮点击 */
export function trackButtonClick(buttonName: string, extra?: Record<string, unknown>) {
  trackEvent('button_click', { button_name: buttonName, ...extra });
}

/** 追踪表单提交 */
export function trackFormSubmit(formName: string, extra?: Record<string, unknown>) {
  trackEvent('form_submit', { form_name: formName, ...extra });
}

/** 追踪文件下载 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent('file_download', { file_name: fileName, file_type: fileType });
}

/** 追踪搜索行为 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('search', { search_term: searchTerm, results_count: resultsCount });
}

/** 追踪用户注册/登录 */
export function trackAuth(method: 'login' | 'sign_up', provider?: string) {
  trackEvent(method, { method: provider || 'email' });
}

/** 追踪外链点击 */
export function trackOutboundLink(url: string, linkText?: string) {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    outbound: true,
  });
}

// ---- Microsoft Clarity 自定义标签 ----

/** 给 Clarity 会话打标签（用于筛选录屏） */
export function clarityTag(key: string, value: string) {
  if (typeof window === 'undefined' || !window.clarity) return;
  window.clarity('set', key, value);
}

/** 标记已登录用户 */
export function clarityIdentify(userId: string, sessionId?: string) {
  if (typeof window === 'undefined' || !window.clarity) return;
  window.clarity('identify', userId, sessionId);
}
