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
        const { urls } = body

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: 'URLs array is required' },
                { status: 400 }
            )
        }

        console.log('Proxying batch check request for URLs:', urls.length)

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/batch_check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ urls }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to check videos' },
                { status: backendResponse.status }
            )
        }

        const result = await backendResponse.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Batch check proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}