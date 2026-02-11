import { NextRequest, NextResponse } from 'next/server';

// 🔴 这里是你的真实后端地址，只有服务器知道，用户看不到
const HIDDEN_BACKEND = "https://ytdlp.vistaflyer.com";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const type = searchParams.get('type') || 'srt';
    const lang = searchParams.get('lang') || 'en';

    if (!url) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    try {
        // 在服务端请求真实的 Python 接口
        // 这一步发生在服务器机房里，用户浏览器完全无感知
        const targetUrl = `${HIDDEN_BACKEND}/api/transcript/download?url=${encodeURIComponent(url)}&lang=${lang}&type=${type}`;

        console.log(`[Proxy] Forwarding request to hidden backend: ${targetUrl}`);

        const backendResponse = await fetch(targetUrl);

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            return NextResponse.json(
                { error: `Provider Error: ${errorText}` },
                { status: backendResponse.status }
            );
        }

        // 拿到文件流，直接转发给用户
        // 伪装成 Next.js 自己生成的文件
        const headers = new Headers();
        headers.set('Content-Type', backendResponse.headers.get('Content-Type') || 'application/octet-stream');
        headers.set('Content-Disposition', backendResponse.headers.get('Content-Disposition') || `attachment; filename="download.${type}"`);

        return new NextResponse(backendResponse.body, {
            status: 200,
            headers: headers,
        });

    } catch (error) {
        console.error("[Proxy] Internal Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
