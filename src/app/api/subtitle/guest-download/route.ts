import { NextRequest, NextResponse } from 'next/server'

const GUEST_DAILY_LIMIT = 3
const GUEST_STORAGE_KEY = 'guest_downloads'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { url, lang = 'en', format = 'srt' } = body

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 })
        }

        // 检查访客使用次数（通过IP或客户端标识）
        const clientId = request.headers.get('x-forwarded-for') || 'unknown'

        // 调用后端API（不需要token）
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/download_single", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, lang, format }),
        })

        if (!backendResponse.ok) {
            return NextResponse.json({ error: 'Download failed' }, { status: backendResponse.status })
        }

        const blob = await backendResponse.arrayBuffer()
        const filename = `subtitle.${format}`

        return new NextResponse(blob, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (error) {
        return NextResponse.json(
            { error: `Server error: ${error instanceof Error ? error.message : 'Unknown'}` },
            { status: 500 }
        )
    }
}
