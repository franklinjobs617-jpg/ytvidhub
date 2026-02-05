'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';
import { globalCacheManager } from '@/lib/globalCacheManager';

interface I18nContextType {
  currentLocale: string;
  switchLocale: (locale: string) => void;
  isLocaleLoaded: (locale: string) => boolean;
  preloadLocale: (locale: string) => Promise<void>;
  isSwitching: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const detectedLocale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(detectedLocale);
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 清理超时定时器
  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  // 初始化时预加载所有语言
  useEffect(() => {
    const initializeLocales = async () => {
      try {
        // 预加载所有支持的语言
        await globalCacheManager.warmupCache(['en', 'es']);
      } catch (error) {
        console.error('Failed to initialize locales:', error);
      }
    };

    initializeLocales();
  }, []);

  const switchLocale = useCallback((locale: string) => {
    if (locale === currentLocale) return;
    
    // 设置切换状态
    setIsSwitching(true);
    
    // 立即更新本地状态以提供即时反馈
    setCurrentLocale(locale);
    
    // 延迟重置切换状态，让用户感知到语言切换过程
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }
    
    switchTimeoutRef.current = setTimeout(() => {
      setIsSwitching(false);
    }, 300); // 300ms 后重置状态
    
    // 预加载目标语言（以防万一）
    globalCacheManager.preloadMessages(locale).catch(console.warn);
  }, [currentLocale]);

  const isLocaleLoaded = useCallback((locale: string) => {
    return globalCacheManager.isInitialized(locale);
  }, []);

  const preloadLocale = useCallback(async (locale: string) => {
    await globalCacheManager.preloadMessages(locale);
  }, []);

  return (
    <I18nContext.Provider
      value={{
        currentLocale,
        switchLocale,
        isLocaleLoaded,
        preloadLocale,
        isSwitching,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};