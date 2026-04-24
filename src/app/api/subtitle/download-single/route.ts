import { NextRequest, NextResponse } from 'next/server'

function getUserCredits(user: { credits?: string | number } | null | undefined) {
    if (!user) return 0
    if (typeof user.credits === 'number') return user.credits
    return parseInt(user.credits || '0', 10) || 0
}

async function parseErrorMessage(response: Response, fallback: string) {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
        const payload = await response.json().catch(() => ({}))
        return payload?.error || payload?.message || fallback
    }

    const text = await response.text().catch(() => '')
    if (!text || /<!doctype html|<html/i.test(text)) {
        return fallback
    }

    return text
}

async function deductCredits(request: NextRequest, token: string, format: string) {
    const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: 1,
            reason: `Subtitle Download (${format})`,
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
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }

        const token = authHeader.split(' ')[1]

        const userResponse = await fetch('https://api.ytvidhub.com/prod-api/g/getUser', {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const userData = await userResponse.json()
        const user = userData.data

        if (!user || !user.email) {
            return NextResponse.json({ error: 'User data not found' }, { status: 400 })
        }

        const body = await request.json()
        const { url, lang, format, title, isPreview } = body

        if (!url) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
        }

        if (!isPreview) {
            const userCredits = getUserCredits(user)
            if (userCredits < 1) {
                return NextResponse.json(
                    { error: `Insufficient credits. You have ${userCredits} credits, but subtitle download requires 1 credit.` },
                    { status: 402 },
                )
            }
        }

        const backendResponse = await fetch('https://ytdlp.vistaflyer.com/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ url, lang, format, title }),
        })

        if (!backendResponse.ok) {
            const backendMessage = await parseErrorMessage(backendResponse, 'Failed to download subtitle')
            console.error('Backend API error:', backendMessage)
            return NextResponse.json({ error: backendMessage }, { status: backendResponse.status })
        }

        if (!isPreview) {
            const deductErrorResponse = await deductCredits(request, token, format)
            if (deductErrorResponse) {
                return deductErrorResponse
            }
        }

        return new NextResponse(backendResponse.body, {
            status: 200,
            headers: {
                'Content-Type': backendResponse.headers.get('Content-Type') || 'application/octet-stream',
                'Content-Disposition': backendResponse.headers.get('Content-Disposition') || 'attachment',
            },
        })
    } catch (error) {
        console.error('Single download proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 },
        )
    }
}
