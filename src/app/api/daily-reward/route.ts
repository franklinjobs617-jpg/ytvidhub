import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getRemoteAndLocalUser(token: string) {
    const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!userResponse.ok) return null
    const { data: remoteUser } = await userResponse.json()
    if (!remoteUser?.email) return null

    const dbUser = await prisma.user.findUnique({
        where: { email_type: { email: remoteUser.email, type: remoteUser.type.toString() } },
    })
    return dbUser ? { remoteUser, dbUser } : null
}

// GET — check claim status
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }
        const result = await getRemoteAndLocalUser(authHeader.split(' ')[1])
        // 用户不在本地 DB（未同步）→ 视为可领取，按钮正常显示
        if (!result) return NextResponse.json({ canClaim: true, streak: 0, nextClaimAt: null })

        const { dbUser } = result
        const now = Date.now()
        const lastClaim = dbUser.lastDailyReward
        const canClaim = !lastClaim || (now - lastClaim.getTime()) >= 24 * 3600 * 1000
        const nextClaimAt = lastClaim && !canClaim
            ? new Date(lastClaim.getTime() + 24 * 3600 * 1000).toISOString()
            : null

        return NextResponse.json({
            canClaim,
            streak: dbUser.currentStreak ?? 0,
            nextClaimAt,
        })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

// POST — claim daily reward
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }
        const token = authHeader.split(' ')[1]
        const result = await getRemoteAndLocalUser(token)
        if (!result) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const { remoteUser, dbUser } = result
        const now = new Date()
        const lastClaim = dbUser.lastDailyReward
        const hoursSinceLast = lastClaim
            ? (now.getTime() - lastClaim.getTime()) / 3600000
            : Infinity

        if (hoursSinceLast < 24) {
            const nextClaimAt = new Date(lastClaim!.getTime() + 24 * 3600 * 1000)
            return NextResponse.json(
                { alreadyClaimed: true, nextClaimAt: nextClaimAt.toISOString() },
                { status: 400 }
            )
        }

        // Streak: consecutive if last claim was within 48h, otherwise reset
        const newStreak = hoursSinceLast <= 48 ? (dbUser.currentStreak ?? 0) + 1 : 1
        const creditsAdded = 3
        const newCredits = parseInt(dbUser.credits) + creditsAdded

        await prisma.user.update({
            where: { email_type: { email: remoteUser.email, type: remoteUser.type.toString() } },
            data: {
                credits: newCredits.toString(),
                lastDailyReward: now,
                currentStreak: newStreak,
            },
        })

        return NextResponse.json({
            success: true,
            creditsAdded,
            newCredits,
            streak: newStreak,
            nextClaimAt: new Date(now.getTime() + 24 * 3600 * 1000).toISOString(),
        })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
