import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

    // 检查是否是第一次使用 AI Summary（第一次免费）
    const dbUser = await prisma.user.findUnique({
        where: { email_type: { email: user.email, type: user.type.toString() } },
        select: { id: true },
    }).catch(() => null);

    const isFirstSummary = dbUser
        ? (await prisma.video_history.count({
            where: { userId: dbUser.id, lastAction: 'ai_summary' },
        }).catch(() => 1)) === 0
        : false;

    // 积分检查（第一次免费跳过）
    const userCredits = parseInt(user?.credits || "0") || 0;
    if (!isFirstSummary && userCredits < 2) {
        return NextResponse.json(
            { error: `Insufficient credits. You have ${userCredits} credits, but AI Summary requires 2 credits.` },
            { status: 402 }
        )
    }

    // 1. 扣除积分（第一次免费跳过）—— 直接操作 DB，避免二次 getUser HTTP 调用
    if (!isFirstSummary) {
        try {
            await prisma.$transaction(async (tx: any) => {
                const currentUser = await tx.user.findUnique({
                    where: { email_type: { email: user.email, type: user.type.toString() } },
                    select: { credits: true },
                });
                if (!currentUser) throw new Error('User not found in database');
                const currentCredits = parseInt(currentUser.credits) || 0;
                if (currentCredits < 2) throw new Error('Insufficient credits');
                await tx.user.update({
                    where: { email_type: { email: user.email, type: user.type.toString() } },
                    data: { credits: (currentCredits - 2).toString() },
                });
            });
        } catch (e: any) {
            const isInsufficient = e.message?.includes('Insufficient');
            return NextResponse.json(
                { error: isInsufficient ? 'Insufficient credits. AI Summary requires 2 credits.' : 'Failed to deduct credits' },
                { status: isInsufficient ? 402 : 500 }
            );
        }
    }

    // 2. 代理请求到真实的后端API
    try {
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/generate_summary_stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url }),
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                { error: 'Failed to generate summary' },
                { status: backendResponse.status }
            )
        }

        return new NextResponse(backendResponse.body, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'X-Accel-Buffering': 'no',
                'Cache-Control': 'no-cache, no-transform',
            },
        })
    } catch {
        return NextResponse.json(
            { error: 'Backend service unavailable' },
            { status: 503 }
        );
    }
}