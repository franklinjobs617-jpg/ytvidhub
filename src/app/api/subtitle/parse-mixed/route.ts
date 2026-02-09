import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // 验证token
        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const body = await request.json();

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/parse-mixed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.error || 'Backend request failed' },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Parse mixed URLs proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}