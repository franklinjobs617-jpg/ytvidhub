import { NextRequest, NextResponse } from 'next/server'

interface TaskHistory {
    taskId: string
    createdAt: number
    videoCount: number
    format: string
    status: 'processing' | 'completed' | 'failed'
    downloadUrl?: string
}

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

        // 从后端获取任务历史
        const historyResponse = await fetch("https://ytdlp.vistaflyer.com/api/task_history", {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (!historyResponse.ok) {
            return NextResponse.json({ tasks: [] })
        }

        const data = await historyResponse.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ tasks: [] })
    }
}
