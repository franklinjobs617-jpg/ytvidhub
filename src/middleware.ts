import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    ...routing,
    localeDetection: false,
    alternateLinks: false,
    localeCookie: {
        name: 'NEXT_LOCALE',
        maxAge: 30 * 24 * 60 * 60, // 30天
        sameSite: true,
        path: '/',
    }
});

export default function middleware(request: NextRequest) {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '';
    const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
    const canonicalHost = 'ytvidhub.com';

    if (host === `www.${canonicalHost}` || (proto === 'http' && (host === canonicalHost || host === `www.${canonicalHost}`))) {
        const url = request.nextUrl.clone();
        url.protocol = 'https:';
        url.host = canonicalHost;
        return NextResponse.redirect(url, 301);
    }

    const { pathname } = request.nextUrl;

    // Temporary i18n guard:
    // Currently only the homepage is intentionally localized.
    // For non-default locales, redirect all non-home paths to the English route
    // to avoid server errors on partially localized pages.
    const localePrefixPattern = new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`);
    const localePrefixMatch = pathname.match(localePrefixPattern);
    if (localePrefixMatch) {
        const locale = localePrefixMatch[1];
        const restPath = localePrefixMatch[2] ?? '';

        if (locale !== routing.defaultLocale && restPath && restPath !== '/') {
            const newUrl = request.nextUrl.clone();
            newUrl.pathname = restPath;
            return NextResponse.redirect(newUrl, 307);
        }
    }

    if (pathname.startsWith('/startupranking')) {
        return NextResponse.next();
    }
    // Normalize double slashes: /path// → /path/
    if (/\/{2,}/.test(pathname)) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = pathname.replace(/\/{2,}/g, '/');
        return NextResponse.redirect(newUrl, 301);
    }

    if (pathname === '/bulk-downloader' || pathname.endsWith('/bulk-downloader')) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = pathname.replace('/bulk-downloader', '/bulk-youtube-subtitle-downloader');
        return NextResponse.redirect(newUrl, 301);
    }

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
    if (
        pathname === '/how-to-download-youtube-subtitles-complete-guide' ||
        pathname === '/how-to-download-youtube-subtitles-complete-guide/'
    ) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = '/guide/how-to-download-youtube-subtitles-complete-guide';
        return NextResponse.redirect(newUrl, 301);
    }

    // Handle localized migration for 'how-to-download-youtube-subtitles-complete-guide'
    const guideMigrationMatch = pathname.match(/^\/([a-z]{2})\/how-to-download-youtube-subtitles-complete-guide\/?$/);
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
        '/:path*.html',
        '/:path*.html/',
        '/'
    ]
};
