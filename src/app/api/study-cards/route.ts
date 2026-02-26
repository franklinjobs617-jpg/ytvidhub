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

        // 验证 token，获取用户信息
        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const { data: user } = await userResponse.json()
        if (!user?.email) {
            return NextResponse.json({ error: 'User data not found' }, { status: 400 })
        }

        // 检查并扣除积分（1 credit）
        try {
            await prisma.$transaction(async (tx: any) => {
                const fresh = await tx.user.findUnique({
                    where: { email_type: { email: user.email, type: user.type.toString() } },
                    select: { credits: true },
                })
                if (!fresh) throw new Error('User not found')
                const currentCredits = parseInt(fresh.credits) || 0
                if (currentCredits < 1) throw new Error('Insufficient credits')
                await tx.user.update({
                    where: { email_type: { email: user.email, type: user.type.toString() } },
                    data: { credits: (currentCredits - 1).toString() },
                })
            })
        } catch (e: any) {
            const isInsufficient = e.message?.includes('Insufficient')
            return NextResponse.json(
                { error: isInsufficient ? 'Insufficient credits. Study Cards requires 1 credit.' : 'Failed to deduct credits' },
                { status: isInsufficient ? 402 : 500 }
            )
        }

        // 代理到后端流式接口
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/generate_study_cards_stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url }),
        })

        if (!backendResponse.ok) {
            return NextResponse.json({ error: 'Failed to generate study cards' }, { status: backendResponse.status })
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

    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
