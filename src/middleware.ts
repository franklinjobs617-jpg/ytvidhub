// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
    ...routing,
    localeDetection: true,
    alternateLinks: false, 
    localeCookie: {
        maxAge: 30 * 24 * 60 * 60, // 30天
        sameSite: true,
        path: '/',
    }
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
        '/'
    ]
};