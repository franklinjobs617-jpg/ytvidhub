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
        const { videos, lang, format } = body

        if (!videos || !Array.isArray(videos)) {
            return NextResponse.json(
                { error: 'Videos array is required' },
                { status: 400 }
            )
        }

        // 检查用户积分
        const userCredits = parseInt(user?.credits || "0") || 0;
        const requiredCredits = videos.length; // 每个视频需要1个积分

        console.log('Bulk download credit check:', {
            userData: user,
            userCredits,
            requiredCredits,
            videoCount: videos.length,
            userEmail: user.email,
            userGoogleId: user.googleUserId,
            userType: user.type
        });

        if (!user || userCredits < requiredCredits) {
            return NextResponse.json(
                { error: `Insufficient credits. You have ${userCredits} credits, but bulk download requires ${requiredCredits} credits (1 per video).` },
                { status: 402 }
            )
        }

        console.log('Proxying bulk submit request for videos:', videos.length)

        // 先扣除积分
        const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: requiredCredits,
                reason: `Bulk Subtitle Download (${videos.length} videos)`
            })
        });

        if (!deductResponse.ok) {
            const errorData = await deductResponse.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.error || "Failed to deduct credits" },
                { status: deductResponse.status }
            )
        }

        // 代理请求到真实的后端API
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/batch_submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ videos, lang, format }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to submit bulk task' },
                { status: backendResponse.status }
            )
        }

        const result = await backendResponse.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Bulk submit proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}