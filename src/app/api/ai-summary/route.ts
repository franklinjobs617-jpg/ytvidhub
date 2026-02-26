import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }

        const token = authHeader.split(' ')[1]
        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
        }

        return handleAISummaryRequest(token, url)
    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}

async function handleAISummaryRequest(token: string, url: string): Promise<NextResponse> {
    // 1. 验证 token，获取用户信息
    const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { data: user } = await userResponse.json()
    if (!user?.email) {
        return NextResponse.json({ error: 'User data not found' }, { status: 400 })
    }

    // 2. 一次查询同时拿到 credits + ai_summary 使用次数
    const dbUser = await prisma.user.findUnique({
        where: { email_type: { email: user.email, type: user.type.toString() } },
        select: {
            id: true,
            credits: true,
            _count: {
                select: {
                    videoHistory: { where: { lastAction: 'ai_summary' } }
                }
            }
        },
    }).catch(() => null);

    const isFirstSummary = dbUser ? dbUser._count.videoHistory === 0 : false;
    const dbCredits = dbUser ? parseInt(dbUser.credits) || 0 : parseInt(user.credits) || 0;

    // 3. 积分检查（第一次免费跳过）
    if (!isFirstSummary && dbCredits < 2) {
        return NextResponse.json(
            { error: `Insufficient credits. You have ${dbCredits} credits, but AI Summary requires 2 credits.` },
            { status: 402 }
        )
    }

    // 4. 扣除积分（内联，避免二次 getUser HTTP 调用）
    if (!isFirstSummary) {
        try {
            await prisma.$transaction(async (tx: any) => {
                const fresh = await tx.user.findUnique({
                    where: { email_type: { email: user.email, type: user.type.toString() } },
                    select: { credits: true },
                });
                if (!fresh) throw new Error('User not found in database');
                const currentCredits = parseInt(fresh.credits) || 0;
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

    // 5. 代理到后端流式 API
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
            return NextResponse.json({ error: 'Failed to generate summary' }, { status: backendResponse.status })
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
        return NextResponse.json({ error: 'Backend service unavailable' }, { status: 503 });
    } finally {
        await prisma.$disconnect()
    }
}
