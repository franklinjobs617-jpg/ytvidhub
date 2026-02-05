// 预加载消息以减少语言切换时的延迟
const messageCache = new Map<string, any>();

// 存储正在加载的 Promise，防止重复请求同一语言包
const loadingPromises = new Map<string, Promise<any>>();

export async function preloadMessages(locale: string) {
  // 检查是否已有缓存
  if (messageCache.has(locale)) {
    return messageCache.get(locale);
  }

  // 检查是否已在加载中，避免重复加载
  if (loadingPromises.has(locale)) {
    return loadingPromises.get(locale);
  }

  // 创建加载 Promise
  const loadPromise = (async () => {
    try {
      const messages = await import(`../messages/${locale}.json`);
      messageCache.set(locale, messages.default);
      loadingPromises.delete(locale); // 清除加载状态
      return messages.default;
    } catch (error) {
      console.warn(`Failed to preload messages for locale: ${locale}`, error);
      loadingPromises.delete(locale); // 清除加载状态
      return null;
    }
  })();

  loadingPromises.set(locale, loadPromise);
  return loadPromise;
}

// 预加载所有支持的语言
export async function preloadAllMessages() {
  const locales = ['en', 'es'];
  
  // 使用 Promise.allSettled 确保即使某个语言包加载失败也不会影响其他语言包
  const results = await Promise.allSettled(locales.map(locale => preloadMessages(locale)));
  
  // 检查是否有加载失败的情况
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(`Failed to preload messages for locale: ${locales[index]}`);
    }
  });
}

// 获取已缓存的消息
export function getCachedMessages(locale: string) {
  return messageCache.get(locale);
}

// 检查是否所有语言包都已预加载
export function isAllMessagesLoaded() {
  const locales = ['en', 'es'];
  return locales.every(locale => messageCache.has(locale));
}

// 清除缓存（通常只在开发环境或特殊情况下使用）
export function clearMessageCache() {
  messageCache.clear();
  loadingPromises.clear();
}

export { messageCache, loadingPromises };