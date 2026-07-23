import { NextRequest, NextResponse } from 'next/server'

type BackendErrorPayload = {
    error?: string
    message?: string
    quota?: unknown
    code?: string
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { url, lang = 'en', format = 'vtt', action = 'preview' } = body

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 })
        }

        const forwardedFor = request.headers.get('x-forwarded-for') || ''
        const userAgent = request.headers.get('user-agent') || ''

        // 预览免费；下载由后端扣除 1 个游客积分
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/subtitle/guest-download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}),
                ...(userAgent ? { "User-Agent": userAgent } : {})
            },
            body: JSON.stringify({ url, lang, format, action }),
        })

        if (!backendResponse.ok) {
            const rawError = await backendResponse.text().catch(() => '')
            let backendMessage = ''
            let backendPayload: BackendErrorPayload = {}

            if (rawError) {
                try {
                    backendPayload = JSON.parse(rawError) as BackendErrorPayload
                    backendMessage = backendPayload?.error || backendPayload?.message || rawError
                } catch {
                    backendMessage = rawError
                }
            }

            return NextResponse.json(
                {
                    error: backendMessage || 'Guest subtitle preview failed',
                    quota: backendPayload?.quota,
                    code: backendPayload?.code
                },
                { status: backendResponse.status }
            )
        }

        const data = await backendResponse.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: `Server error: ${error instanceof Error ? error.message : 'Unknown'}` },
            { status: 500 }
        )
    }
}
