import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// 优化的消息缓存 - 使用更高效的缓存策略
const messageCache = new Map<string, any>();
const loadingPromises = new Map<string, Promise<any>>();

// 预加载所有支持的语言包以提高性能
async function initializeCaches() {
  const locales = ['en', 'es'];
  
  for (const locale of locales) {
    if (!messageCache.has(locale)) {
      try {
        const messages = await import(`../messages/${locale}.json`);
        messageCache.set(locale, messages.default);
      } catch (error) {
        console.error(`Failed to preload messages for locale: ${locale}`, error);
      }
    }
  }
}

// 初始化缓存
initializeCaches();

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) || routing.defaultLocale;

  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 检查缓存
  if (messageCache.has(locale)) {
    return {
      locale: locale as string,
      messages: messageCache.get(locale)
    };
  }

  // 如果正在加载，返回现有的 Promise
  if (loadingPromises.has(locale)) {
    const messages = await loadingPromises.get(locale);
    return {
      locale: locale as string,
      messages
    };
  }

  // 开始加载并缓存消息
  const loadPromise = import(`../messages/${locale}.json`).then(module => module.default);
  loadingPromises.set(locale, loadPromise);

  try {
    const messages = await loadPromise;
    messageCache.set(locale, messages);
    return {
      locale: locale as string,
      messages
    };
  } finally {
    loadingPromises.delete(locale);
  }
});