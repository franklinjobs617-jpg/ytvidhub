import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }
        const token = authHeader.split(' ')[1]

        const videoId = request.nextUrl.searchParams.get('videoId')
        if (!videoId) {
            return NextResponse.json({ error: 'videoId is required' }, { status: 400 })
        }

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

        const dbUser = await prisma.user.findUnique({
            where: { email_type: { email: remoteUser.email, type: remoteUser.type.toString() } },
            select: { id: true },
        })
        if (!dbUser) {
            return NextResponse.json({})
        }

        const record = await prisma.video_history.findUnique({
            where: { user_video: { userId: dbUser.id, videoId } },
            select: { summaryContent: true, subtitleContent: true },
        })

        if (!record) {
            return NextResponse.json({})
        }

        return NextResponse.json({
            summaryContent: record.summaryContent ?? undefined,
            subtitleContent: record.subtitleContent ?? undefined,
        })
    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown'}` },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
