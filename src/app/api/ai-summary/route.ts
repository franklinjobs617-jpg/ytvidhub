import { NextRequest, NextResponse } from 'next/server'

// 用于防止重复请求的缓存
const activeRequests = new Map<string, Promise<NextResponse>>();

export async function POST(request: NextRequest) {
    try {
        // 获取Authorization header
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]

        // 获取请求体
        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            )
        }

        // 创建请求唯一标识符（用户token + URL的hash，确保唯一性）
        const urlHash = Buffer.from(url).toString('base64').slice(0, 10);
        const requestKey = `${token.slice(-10)}_${urlHash}`;

        console.log('AI Summary request:', { url, requestKey, hasActiveRequest: activeRequests.has(requestKey) });

        // 检查是否有相同的请求正在进行
        if (activeRequests.has(requestKey)) {
            console.log('Duplicate request detected, returning existing promise for:', url);
            return activeRequests.get(requestKey)!;
        }

        // 创建新的请求处理Promise
        const requestPromise = handleAISummaryRequest(token, url, request.nextUrl.origin);
        activeRequests.set(requestKey, requestPromise);

        try {
            const result = await requestPromise;
            return result;
        } finally {
            // 请求完成后清理缓存
            activeRequests.delete(requestKey);
        }

    } catch (error) {
        console.error('AI Summary proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}

async function handleAISummaryRequest(token: string, url: string, origin: string): Promise<NextResponse> {
    // 通过现有的API获取用户信息来验证token
    const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        )
    }

    const userData = await userResponse.json()
    const user = userData.data

    if (!user || !user.email) {
        return NextResponse.json(
            { error: 'User data not found' },
            { status: 400 }
        )
    }

    // 检查用户积分
    const userCredits = parseInt(user?.credits || "0") || 0;

    console.log('AI Summary credit check:', {
        email: user.email,
        userCredits,
        required: 2,
        url: url
    });

    if (!user || userCredits < 2) {
        return NextResponse.json(
            { error: `Insufficient credits. You have ${userCredits} credits, but AI Summary requires 2 credits.` },
            { status: 402 }
        )
    }

    // 1. 先扣除积分
    try {
        console.log('Deducting AI summary credits for:', user.email, 'URL:', url);
        const deductResponse = await fetch(`${origin}/api/deduct-credits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ amount: 2, reason: "AI Summary Generation" }),
        });

        if (!deductResponse.ok) {
            const errorData = await deductResponse.json().catch(() => ({}));
            console.error('Failed to deduct credits:', errorData);
            return NextResponse.json(
                { error: errorData.error || 'Failed to deduct credits' },
                { status: deductResponse.status || 402 }
            );
        }
        console.log('Credits deducted successfully for:', user.email, 'Amount: 2');
    } catch (deductError) {
        console.error('Credit deduction error:', deductError);
        return NextResponse.json(
            { error: 'System error during credit deduction' },
            { status: 500 }
        );
    }

    // 2. 代理请求到真实的后端API
    console.log('Proxying AI summary request for URL:', url, 'User:', user.email)
    const startTime = Date.now();

    try {
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/generate_summary_stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // 必须透传 Authorization Header
            },
            body: JSON.stringify({ url }),
        });

        console.log('Backend response received in:', Date.now() - startTime, 'ms', {
            status: backendResponse.status,
            user: user.email
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error for user:', user.email, 'Error:', errorData)

            // 如果后端失败，考虑是否需要退还积分
            // 这里暂时不退还，因为可能是临时错误

            return NextResponse.json(
                { error: 'Failed to generate summary' },
                { status: backendResponse.status }
            )
        }

        // 返回流式响应
        return new NextResponse(backendResponse.body, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'X-Accel-Buffering': 'no',
                'Cache-Control': 'no-cache, no-transform',
            },
        })
    } catch (backendError) {
        console.error('Backend request failed for user:', user.email, 'Error:', backendError);
        return NextResponse.json(
            { error: 'Backend service unavailable' },
            { status: 503 }
        );
    }
}