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
            return NextResponse.json({ data: [] })
        }

        const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') ?? '10'), 20)

        const history = await prisma.video_history.findMany({
            where: { userId: dbUser.id },
            orderBy: { updatedAt: 'desc' },
            take: limit,
            select: {
                videoId: true,
                videoUrl: true,
                title: true,
                thumbnail: true,
                duration: true,
                lastAction: true,
                format: true,
                accessCount: true,
                updatedAt: true,
            },
        })

        return NextResponse.json({ data: history })
    } catch (error) {
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown'}` },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
