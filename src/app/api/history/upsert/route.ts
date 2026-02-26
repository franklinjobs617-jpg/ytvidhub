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
        const { videoId, videoUrl, title, thumbnail, duration, lastAction, format, lang, summaryContent, subtitleContent } = body

        if (!videoId || !videoUrl || !title || !lastAction) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const record = await prisma.video_history.upsert({
            where: { user_video: { userId: dbUser.id, videoId } },
            update: {
                videoUrl,
                title,
                thumbnail: thumbnail ?? undefined,
                duration: duration ?? undefined,
                lastAction,
                format: format ?? undefined,
                lang: lang ?? 'en',
                accessCount: { increment: 1 },
                ...(summaryContent != null ? { summaryContent } : {}),
                ...(subtitleContent != null ? { subtitleContent } : {}),
            },
            create: {
                userId: dbUser.id,
                videoId,
                videoUrl,
                title,
                thumbnail,
                duration,
                lastAction,
                format,
                lang: lang ?? 'en',
                accessCount: 1,
                summaryContent: summaryContent ?? null,
                subtitleContent: subtitleContent ?? null,
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
