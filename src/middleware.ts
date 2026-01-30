import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host');
    const pathname = url.pathname;

    // 1. Handle WWW to non-WWW redirect
    if (host && host.startsWith('www.')) {
        const newHost = host.replace('www.', '');
        return NextResponse.redirect(`https://${newHost}${pathname}${url.search}`, 301);
    }

    // 2. Handle .html extension redirect
    if (pathname.endsWith('.html')) {
        let newPathname = pathname.slice(0, -5);
        // Special case for index.html
        if (newPathname.endsWith('/index')) {
            newPathname = newPathname.slice(0, -6) || '/';
        }
        url.pathname = newPathname || '/';
        return NextResponse.redirect(url, 301);
    }

    // 3. Handle /index redirect
    if (pathname.endsWith('/index')) {
        url.pathname = pathname.slice(0, -6) || '/';
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|image|.*\\..*).*)',
        // We also want to match .html files specifically, even if they would be excluded by the above
        '/(.*\\.html)',
    ],
};
