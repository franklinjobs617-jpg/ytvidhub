import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en',  'es'],
    defaultLocale: 'en',
    localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);

// 导出路由类型定义，用于类型安全
export type Locale = typeof routing.locales[number];