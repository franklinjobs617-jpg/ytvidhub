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
        const { task_id } = body

        if (!task_id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            )
        }

        console.log('Proxying ZIP download request for task:', task_id)

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/download_zip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ task_id }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to download ZIP' },
                { status: backendResponse.status }
            )
        }

        // 完整读取后端响应再返回（避免流式传输中后端删除文件导致数据不完整）
        const zipBuffer = await backendResponse.arrayBuffer()
        if (zipBuffer.byteLength === 0) {
            return NextResponse.json(
                { error: 'Downloaded ZIP is empty' },
                { status: 500 }
            )
        }

        return new NextResponse(zipBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': backendResponse.headers.get('Content-Disposition') || 'attachment; filename="subtitles.zip"',
                'Content-Length': zipBuffer.byteLength.toString(),
            },
        })

    } catch (error) {
        console.error('ZIP download proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}