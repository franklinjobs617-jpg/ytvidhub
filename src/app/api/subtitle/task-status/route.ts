import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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

        // 获取查询参数
        const { searchParams } = new URL(request.url)
        const taskId = searchParams.get('task_id')

        if (!taskId) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            )
        }

        console.log('Proxying task status request for task:', taskId)

        // 代理请求到真实的后端API
        const backendResponse = await fetch(`https://ytdlp.vistaflyer.com/api/task_status?task_id=${taskId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to check task status' },
                { status: backendResponse.status }
            )
        }

        const result = await backendResponse.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Task status proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}