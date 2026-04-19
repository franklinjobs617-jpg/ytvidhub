import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        // 获取Authorization header
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]

        // 验证token
        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        // 获取请求体
        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            )
        }

        console.log('Proxying video info request for URL:', url)

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/video_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url }),
        });

        if (!backendResponse.ok) {
            const rawError = await backendResponse.text().catch(() => '')
            let backendMessage = ''

            if (rawError) {
                try {
                    const parsed = JSON.parse(rawError)
                    backendMessage = parsed?.error || parsed?.message || rawError
                } catch {
                    backendMessage = rawError
                }
            }

            if (!backendMessage || /<!doctype html|<html/i.test(backendMessage)) {
                backendMessage = 'Failed to get video info'
            }

            console.error('Backend API error:', backendMessage)
            return NextResponse.json(
                { error: backendMessage },
                { status: backendResponse.status }
            )
        }

        const result = await backendResponse.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Video info proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}