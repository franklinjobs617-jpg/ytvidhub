// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    ...routing,
    localeDetection: false, // 禁用自动检测，优先使用 cookie 中保存的用户选择
    alternateLinks: false,
    localeCookie: {
        name: 'NEXT_LOCALE',
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


    // Handle guide to tools redirect for playlist-subtitles-bulk (SEO optimization)
    if (pathname === '/guide/playlist-subtitles-bulk' || pathname.endsWith('/guide/playlist-subtitles-bulk')) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = pathname.replace('/guide/playlist-subtitles-bulk', '/tools/playlist-subtitles-bulk');
        return NextResponse.redirect(newUrl, 301);
    }

    // Handle guide to tools localized redirects
    const guideToToolsMatch = pathname.match(/^\/([a-z]{2})\/guide\/playlist-subtitles-bulk$/);
    if (guideToToolsMatch) {
        const locale = guideToToolsMatch[1];
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = `/${locale}/tools/playlist-subtitles-bulk`;
        return NextResponse.redirect(newUrl, 301);
    }

    // Handle migration of 'how-to-download-youtube-subtitles-complete-guide' to '/guide/...'
    if (pathname === '/how-to-download-youtube-subtitles-complete-guide' || pathname.endsWith('/how-to-download-youtube-subtitles-complete-guide')) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = pathname.replace('/how-to-download-youtube-subtitles-complete-guide', '/guide/how-to-download-youtube-subtitles-complete-guide');
        return NextResponse.redirect(newUrl, 301);
    }

    // Handle localized migration for 'how-to-download-youtube-subtitles-complete-guide'
    const guideMigrationMatch = pathname.match(/^\/([a-z]{2})\/how-to-download-youtube-subtitles-complete-guide$/);
    if (guideMigrationMatch) {
        const locale = guideMigrationMatch[1];
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = `/${locale}/guide/how-to-download-youtube-subtitles-complete-guide`;
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