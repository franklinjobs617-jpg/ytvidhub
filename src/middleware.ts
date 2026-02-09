// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    ...routing,
    localeDetection: true,
    alternateLinks: false, 
    localeCookie: {
        maxAge: 30 * 24 * 60 * 60, // 30天
        sameSite: true,
        path: '/',
    }
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Handle bulk-downloader redirect
    if (pathname === '/bulk-downloader' || pathname.endsWith('/bulk-downloader')) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = pathname.replace('/bulk-downloader', '/bulk-youtube-subtitle-downloader');
        return NextResponse.redirect(newUrl, 301); // Permanent redirect for SEO
    }
    
    // Handle localized bulk-downloader redirects (e.g., /es/bulk-downloader)
    const bulkDownloaderMatch = pathname.match(/^\/([a-z]{2})\/bulk-downloader$/);
    if (bulkDownloaderMatch) {
        const locale = bulkDownloaderMatch[1];
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = `/${locale}/bulk-youtube-subtitle-downloader`;
        return NextResponse.redirect(newUrl, 301);
    }
    
    // Continue with internationalization middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
        '/'
    ]
};