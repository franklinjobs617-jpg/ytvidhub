'use client';

import { useEffect } from 'react';
import { globalCacheManager } from '@/lib/globalCacheManager';

/**
 * 语言包预加载组件 - 在客户端预加载所有语言包以优化语言切换性能
 */
export default function LanguagePreloader() {
  useEffect(() => {
    globalCacheManager.preloadMultiple(['en', 'es', 'de', 'ko', 'ja', 'ru']).catch(error => {
      console.warn('Failed to preload all messages:', error);
    });
  }, []);

  return null; 
}