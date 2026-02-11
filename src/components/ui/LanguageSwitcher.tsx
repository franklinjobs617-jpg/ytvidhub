"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import { useState, useTransition, useCallback, useRef, useEffect, useMemo } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { globalCacheManager } from '@/lib/globalCacheManager';

type Locale = (typeof routing.locales)[number];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ko", label: "한국어" },
];

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  de: '🇩🇪',
  ko: '🇰🇷'
};

// 性能监控工具
const performanceMonitor = {
  startTime: 0,

  startTiming: () => {
    performanceMonitor.startTime = performance.now();
  },

  endTiming: (targetLocale: string) => {
    const endTime = performance.now();
    const duration = endTime - performanceMonitor.startTime;

    // 仅在开发环境中记录性能数据
    if (process.env.NODE_ENV === 'development') {
      console.log(`Language switch to ${targetLocale} took ${duration.toFixed(2)}ms`);

      if (duration > 200) {
        console.warn(`Language switch took longer than expected: ${duration.toFixed(2)}ms`);
      }
    }
  }
};

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 预加载所有语言包以确保即时可用
  useEffect(() => {
    globalCacheManager.preloadAllLocalesImmediately().catch(console.warn);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelectChange = useCallback((nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    // 开始性能计时
    performanceMonitor.startTiming();

    // 预加载目标语言消息（如果尚未加载）
    globalCacheManager.preloadMessages(nextLocale).catch(console.warn);

    // 使用 startTransition 进行非阻塞更新
    startTransition(() => {
      // 使用 router.replace 进行路由切换
      router.replace(pathname, { locale: nextLocale });

      // 结束性能计时
      performanceMonitor.endTiming(nextLocale);
    });
  }, [locale, pathname, router]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const currentLanguage = useMemo(() =>
    languages.find(lang => lang.code === locale),
    [locale]
  );

  // Memoize the component to prevent unnecessary re-renders
  const flagElement = useMemo(() => (
    <span className="sm:hidden">{languageFlags[locale]}</span>
  ), [locale]);

  const currentLabel = useMemo(() => (
    <span className="hidden sm:inline">{currentLanguage?.label}</span>
  ), [currentLanguage]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={16} />
        {!isMobile && currentLabel}
        {flagElement}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {isPending && (
          <div className="ml-1 w-3 h-3 border border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectChange(lang.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 ${locale === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                  }`}
              >
                <span className="text-lg">{languageFlags[lang.code]}</span>
                <span>{lang.label}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { LanguageSwitcher };