import { NextRequest, NextResponse } from 'next/server'

function getUserCredits(user: { credits?: string | number } | null | undefined) {
    if (!user) return 0
    if (typeof user.credits === 'number') return user.credits
    return parseInt(user.credits || '0', 10) || 0
}

async function parseErrorMessage(response: Response, fallback: string) {
    const payload = await response.json().catch(() => ({}))
    return payload?.error || payload?.message || fallback
}

async function deductCredits(request: NextRequest, token: string) {
    const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: 1,
            reason: 'Study Cards Generation',
        }),
    })

    if (deductResponse.ok) {
        return null
    }

    return NextResponse.json(
        { error: await parseErrorMessage(deductResponse, 'Failed to deduct credits') },
        { status: deductResponse.status || 500 },
    )
}

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

        const userResponse = await fetch('https://api.ytvidhub.com/prod-api/g/getUser', {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const { data: user } = await userResponse.json()
        if (!user?.email) {
            return NextResponse.json({ error: 'User data not found' }, { status: 400 })
        }

        const currentCredits = getUserCredits(user)
        if (currentCredits < 1) {
            return NextResponse.json(
                { error: 'Insufficient credits. Study Cards requires 1 credit.' },
                { status: 402 },
            )
        }

        const backendResponse = await fetch('https://ytdlp.vistaflyer.com/api/generate_study_cards_stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ url, transcript }),
        })

        if (!backendResponse.ok) {
            return NextResponse.json(
                { error: await parseErrorMessage(backendResponse, 'Failed to generate study cards') },
                { status: backendResponse.status },
            )
        }

        const deductErrorResponse = await deductCredits(request, token)
        if (deductErrorResponse) {
            return deductErrorResponse
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
            { status: 500 },
        )
    }
}
