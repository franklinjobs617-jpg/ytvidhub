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

        // 通过现有的API获取用户信息来验证token
        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        const userData = await userResponse.json()
        const user = userData.data

        if (!user || !user.email) {
            return NextResponse.json(
                { error: 'User data not found' },
                { status: 400 }
            )
        }

        // 获取请求体
        const body = await request.json()
        const { url, lang, format, title, isPreview } = body

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            )
        }

        // 这里的逻辑修改：如果是预览(isPreview=true)，则不扣除积分，也不强求有积分
        // 只有下载文件时才检查积分和扣费
        if (!isPreview) {
            // 检查用户积分
            const userCredits = parseInt(user?.credits || "0") || 0;

            console.log('Single download credit check:', {
                userData: user,
                userCredits,
                required: 1
            });

            if (!user || userCredits < 1) {
                return NextResponse.json(
                    { error: `Insufficient credits. You have ${userCredits} credits, but subtitle download requires 1 credit.` },
                    { status: 402 }
                )
            }

            console.log('Proxying single download request for URL:', url)

            // 先扣除积分
            const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: 1, reason: "Subtitle Download" })
            });

            if (!deductResponse.ok) {
                const errorData = await deductResponse.json().catch(() => ({}));
                return NextResponse.json(
                    { error: errorData.error || "Failed to deduct credits" },
                    { status: deductResponse.status }
                )
            }
        } else {
            console.log('Proxying PREVIEW request (no credit deduction) for URL:', url)
        }

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url, lang, format, title }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to download subtitle' },
                { status: backendResponse.status }
            )
        }

        // 返回文件流
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
            { status: 500 }
        )
    }
}