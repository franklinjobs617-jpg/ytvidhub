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
        const { url, transcript } = body

        if (!url) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
        }

        return handleStudyCardsRequest(token, url, transcript)
    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}

async function handleStudyCardsRequest(token: string, url: string, transcript?: string): Promise<NextResponse> {
    // 1. 并行：验证 token + 请求后端
    const userPromise = fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const backendPromise = fetch("https://ytdlp.vistaflyer.com/api/generate_study_cards_stream", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ url, transcript }),
    });

    // 2. 等用户验证完成
    const userResponse = await userPromise;
    if (!userResponse.ok) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { data: user } = await userResponse.json()
    if (!user?.email) {
        return NextResponse.json({ error: 'User data not found' }, { status: 400 })
    }

    // 3. 检查积分（只检查不扣除）
    try {
        const dbUser = await prisma.user.findUnique({
            where: { email_type: { email: user.email, type: user.type.toString() } },
            select: { credits: true },
        });
        if (!dbUser) throw new Error('User not found');
        const currentCredits = parseInt(dbUser.credits) || 0;
        if (currentCredits < 1) throw new Error('Insufficient credits');
    } catch (e: any) {
        const isInsufficient = e.message?.includes('Insufficient');
        return NextResponse.json(
            { error: isInsufficient ? 'Insufficient credits. Study Cards requires 1 credit.' : 'Failed to check credits' },
            { status: isInsufficient ? 402 : 500 }
        );
    }

    // 4. 等待后端响应
    try {
        const backendResponse = await backendPromise;

        if (!backendResponse.ok) {
            return NextResponse.json({ error: 'Failed to generate study cards' }, { status: backendResponse.status })
        }

        // 异步扣除积分，不阻塞流转发
        prisma.$transaction(async (tx: any) => {
            const fresh = await tx.user.findUnique({
                where: { email_type: { email: user.email, type: user.type.toString() } },
                select: { credits: true },
            });
            if (!fresh) throw new Error('User not found');
            const currentCredits = parseInt(fresh.credits) || 0;
            await tx.user.update({
                where: { email_type: { email: user.email, type: user.type.toString() } },
                data: { credits: (Math.max(0, currentCredits - 1)).toString() },
            });
        }).catch((deductErr: any) => {
            console.error('Credit deduction failed after successful study cards:', deductErr);
        });

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
    }
}
