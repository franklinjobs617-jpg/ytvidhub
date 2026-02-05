'use client';

import { useEffect } from 'react';
import { globalCacheManager } from '@/lib/globalCacheManager';

/**
 * 语言包预加载组件 - 在客户端预加载所有语言包以优化语言切换性能
 */
export default function LanguagePreloader() {
  useEffect(() => {
    // 在组件挂载时预加载所有语言包
    globalCacheManager.preloadMultiple(['en', 'es']).catch(error => {
      console.warn('Failed to preload all messages:', error);
    });
  }, []);

  return null; // 不渲染任何内容
}