import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// 优化的消息缓存 - 使用更高效的缓存策略
const messageCache = new Map<string, any>();
const loadingPromises = new Map<string, Promise<any>>();

// 预加载所有支持的语言包以提高性能
async function initializeCaches() {
  const locales = ['en', 'es', 'de', 'ko', 'ja', 'ru', 'tr', 'zh'];

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

  // 获取通用基础消息（英语），作为回退
  const baseMessages = (await import(`../messages/${routing.defaultLocale}.json`)).default;

  // 如果是默认语言，直接返回
  if (locale === routing.defaultLocale) {
    return {
      locale,
      messages: baseMessages
    };
  }

  // 加载目标语言消息
  try {
    const targetMessages = (await import(`../messages/${locale}.json`)).default;
    
    // 合并基础消息和目标消息，确保缺失的键能回退到英语
    return {
      locale,
      messages: deepMerge(baseMessages, targetMessages)
    };
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}, falling back to default`, error);
    return {
      locale: routing.defaultLocale,
      messages: baseMessages
    };
  }
});

// 简单的深度合并工具函数
function deepMerge(target: any, source: any) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
