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

        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }
        const { data: remoteUser } = await userResponse.json()
        if (!remoteUser?.email) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 })
        }

        // Find local user id
        const dbUser = await prisma.user.findUnique({
            where: { email_type: { email: remoteUser.email, type: remoteUser.type.toString() } },
            select: { id: true },
        })
        if (!dbUser) {
            return NextResponse.json({ error: 'User not in database' }, { status: 404 })
        }

        const body = await request.json()
        const { videoId, videoUrl, title, thumbnail, duration, lastAction, format, lang, summaryContent, subtitleContent, studyCards, batchId } = body

        if (!videoId || !videoUrl || !title || !lastAction) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // 标题保护逻辑：如果当前标题是加载中的占位符，尝试找之前该视频存过的有效标题
        let finalTitle = title;
        if (title.toLowerCase().includes('loading') || title.toLowerCase().includes('untitled')) {
            const lastGoodRecord = await prisma.video_history.findFirst({
                where: { userId: dbUser.id, videoId, NOT: { title: { contains: 'loading' } } },
                orderBy: { createdAt: 'desc' },
                select: { title: true }
            });
            if (lastGoodRecord) finalTitle = lastGoodRecord.title;
        }

        // 每次都是独立记录，使用 create
        const record = await prisma.video_history.create({
            data: {
                userId: dbUser.id,
                videoId,
                videoUrl,
                title: finalTitle,
                thumbnail: thumbnail ?? null,
                duration: duration ?? null,
                lastAction,
                format: format ?? null,
                lang: lang ?? 'en',
                accessCount: 1,
                summaryContent: summaryContent ?? null,
                subtitleContent: subtitleContent ?? null,
                studyCards: studyCards ?? null,
                batchId: batchId ?? null,
            },
        })

        return NextResponse.json({ success: true, id: record.id })
    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown'}` },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
