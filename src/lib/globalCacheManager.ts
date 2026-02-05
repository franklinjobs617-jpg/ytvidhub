// 全局缓存管理器，用于优化国际化性能
interface MessageCache {
  [locale: string]: any;
}

class GlobalCacheManager {
  private static instance: GlobalCacheManager;
  private cache: MessageCache = {};
  private loadingPromises: Map<string, Promise<any>> = new Map();
  private initializedLocales: Set<string> = new Set();
  private preloadQueue: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): GlobalCacheManager {
    if (!GlobalCacheManager.instance) {
      GlobalCacheManager.instance = new GlobalCacheManager();
    }
    return GlobalCacheManager.instance;
  }

  /**
   * 预加载指定语言的消息
   */
  async preloadMessages(locale: string): Promise<any> {
    // 如果已有缓存，直接返回
    if (this.cache[locale]) {
      return this.cache[locale];
    }

    // 如果正在加载，返回现有的 Promise
    if (this.loadingPromises.has(locale)) {
      return this.loadingPromises.get(locale);
    }

    // 开始加载
    const loadPromise = this.loadMessages(locale);
    this.loadingPromises.set(locale, loadPromise);

    try {
      const messages = await loadPromise;
      this.cache[locale] = messages;
      this.initializedLocales.add(locale);
      return messages;
    } finally {
      this.loadingPromises.delete(locale);
    }
  }

  /**
   * 批量预加载多个语言的消息
   */
  async preloadMultiple(locales: string[]): Promise<void> {
    const promises = locales.map(locale => this.preloadMessages(locale));
    await Promise.allSettled(promises);
  }

  /**
   * 预加载队列中的语言包
   */
  async preloadQueuedLanguages(): Promise<void> {
    if (this.preloadQueue.size === 0) return;
    
    const queuedLocales = Array.from(this.preloadQueue);
    this.preloadQueue.clear();
    
    const promises = queuedLocales.map(locale => {
      if (!this.cache[locale] && !this.loadingPromises.has(locale)) {
        return this.preloadMessages(locale);
      }
      return Promise.resolve(this.cache[locale]);
    });

    await Promise.allSettled(promises);
  }

  /**
   * 将语言添加到预加载队列
   */
  queueForPreload(locale: string): void {
    if (!this.initializedLocales.has(locale)) {
      this.preloadQueue.add(locale);
    }
  }

  /**
   * 获取缓存的消息
   */
  getCachedMessages(locale: string): any {
    return this.cache[locale];
  }

  /**
   * 检查是否已初始化特定语言
   */
  isInitialized(locale: string): boolean {
    return this.initializedLocales.has(locale);
  }

  /**
   * 检查是否所有语言都已初始化
   */
  areAllInitialized(locales: string[]): boolean {
    return locales.every(locale => this.isInitialized(locale));
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache = {};
    this.loadingPromises.clear();
    this.initializedLocales.clear();
    this.preloadQueue.clear();
  }

  /**
   * 获取所有已缓存的语言
   */
  getCachedLocales(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * 预热缓存 - 提前加载所有语言
   */
  async warmupCache(locales: string[]): Promise<void> {
    const missingLocales = locales.filter(locale => !this.cache[locale]);
    if (missingLocales.length > 0) {
      await this.preloadMultiple(missingLocales);
    }
  }

  /**
   * 预加载所有语言的消息（立即执行）
   */
  async preloadAllLocalesImmediately(): Promise<void> {
    const locales = ['en', 'es'];
    const promises = locales.map(locale => this.preloadMessages(locale));
    await Promise.allSettled(promises);
  }

  /**
   * 获取消息（带缓存）
   */
  async getMessagesWithCache(locale: string): Promise<any> {
    // 检查缓存
    if (this.cache[locale]) {
      return this.cache[locale];
    }

    // 检查是否正在加载
    if (this.loadingPromises.has(locale)) {
      return this.loadingPromises.get(locale);
    }

    // 加载并缓存
    const loadPromise = this.loadMessages(locale);
    this.loadingPromises.set(locale, loadPromise);

    try {
      const messages = await loadPromise;
      this.cache[locale] = messages;
      this.initializedLocales.add(locale);
      return messages;
    } finally {
      this.loadingPromises.delete(locale);
    }
  }

  /**
   * 立即加载所有语言（用于初始化）
   */
  async initializeAllLocales(): Promise<void> {
    const locales = ['en', 'es'];
    const promises = locales.map(locale => {
      if (!this.cache[locale] && !this.loadingPromises.has(locale)) {
        return this.preloadMessages(locale);
      }
      return Promise.resolve(this.cache[locale]);
    });
    
    await Promise.allSettled(promises);
  }

  private async loadMessages(locale: string): Promise<any> {
    try {
      // 动态导入消息文件
      const module = await import(`../messages/${locale}.json`);
      return module.default;
    } catch (error) {
      console.error(`Failed to load messages for locale: ${locale}`, error);
      throw error;
    }
  }
}

export const globalCacheManager = GlobalCacheManager.getInstance();