import { NextRequest, NextResponse } from 'next/server'

const recentDeductions = new Map<string, number>()
const APP_TYPE_HEADER = 'ytvidhub'

type UserPayload = {
    email?: string
    credits?: string | number
    type?: string | number
}

type JavaResponse<T = unknown> = {
    code?: number
    msg?: string
    data?: T
}

function getCredits(user: UserPayload | null | undefined) {
    if (!user) return 0
    if (typeof user.credits === 'number') return user.credits
    return parseInt(user.credits || '0', 10) || 0
}

function cleanupDeductionCache(now: number) {
    for (const [key, time] of recentDeductions.entries()) {
        if (now - time > 10000) {
            recentDeductions.delete(key)
        }
    }
}

async function fetchCurrentUser(token: string) {
    const userResponse = await fetch('https://api.ytvidhub.com/prod-api/g/getUser', {
        headers: {
            Authorization: `Bearer ${token}`,
            'X-App-Type': APP_TYPE_HEADER,
        },
        cache: 'no-store',
    })

    if (!userResponse.ok) {
        return {
            error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }),
        }
    }

    const userData = await userResponse.json().catch(() => ({}))
    const user = userData?.data as UserPayload | undefined

    if (!user?.email) {
        return {
            error: NextResponse.json({ error: 'User data not found' }, { status: 400 }),
        }
    }

    return { user }
}

async function fetchRemainingCredits(token: string) {
    const response = await fetch('https://api.ytvidhub.com/prod-api/ytdlp/checkUser', {
        headers: {
            Authorization: `Bearer ${token}`,
            'X-App-Type': APP_TYPE_HEADER,
        },
        cache: 'no-store',
    })

    if (!response.ok) return null

    const payload = (await response.json().catch(() => ({}))) as JavaResponse<UserPayload>
    if (payload.code !== 200) return null

    return getCredits(payload.data)
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 },
            )
        }

        const token = authHeader.split(' ')[1]
        const body = await request.json()
        const { amount, reason } = body

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 },
            )
        }

        const userResult = await fetchCurrentUser(token)
        if (userResult.error) {
            return userResult.error
        }

        const user = userResult.user!
        const currentCredits = getCredits(user)
        if (currentCredits < amount) {
            return NextResponse.json(
                { error: `Insufficient credits. Current: ${currentCredits}, Required: ${amount}` },
                { status: 402 },
            )
        }

        const deductionKey = `${user.email}_${amount}_${reason || 'credit_deduction'}`
        const now = Date.now()

        if (recentDeductions.has(deductionKey)) {
            const lastTime = recentDeductions.get(deductionKey)!
            if (now - lastTime < 5000) {
                return NextResponse.json(
                    { error: 'Duplicate deduction request detected' },
                    { status: 429 },
                )
            }
        }

        recentDeductions.set(deductionKey, now)
        cleanupDeductionCache(now)

        const javaResponse = await fetch(`https://api.ytvidhub.com/prod-api/ytdlp/credits?size=${amount}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'X-App-Type': APP_TYPE_HEADER,
            },
            cache: 'no-store',
        })

        if (!javaResponse.ok) {
            recentDeductions.delete(deductionKey)
            return NextResponse.json(
                { error: 'Credit service unavailable' },
                { status: javaResponse.status || 500 },
            )
        }

        const payload = (await javaResponse.json().catch(() => ({}))) as JavaResponse
        const message = payload.msg || 'Credit deduction failed'

        if (payload.code !== 200) {
            recentDeductions.delete(deductionKey)
            const isInsufficient = message.toLowerCase().includes('not enough') || message.toLowerCase().includes('insufficient')
            return NextResponse.json(
                { error: message },
                { status: isInsufficient ? 402 : 500 },
            )
        }

        const remainingCredits = await fetchRemainingCredits(token)

        return NextResponse.json({
            success: true,
            message: `Successfully deducted ${amount} credits`,
            remainingCredits,
            reason,
            deductedAmount: amount,
        })
    } catch (error) {
        console.error('Credit deduction error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 },
        )
    }
}
