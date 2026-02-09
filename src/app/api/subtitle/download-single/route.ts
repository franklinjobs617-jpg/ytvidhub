import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('=== Download Single API Called ===');
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
        console.log(user)
        if (!user || !user.email) {
            return NextResponse.json(
                { error: 'User data not found' },
                { status: 400 }
            )
        }

        // 获取请求体
        const body = await request.json()
        const { url, lang, format, title, isPreview } = body

        console.log('Request body:', { url, lang, format, title, isPreview });

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            )
        }

        // 这里的逻辑修改：如果是预览(isPreview=true)，则不扣除积分，也不强求有积分
        // 只有下载文件时才检查积分和扣费
        if (!isPreview) {
            console.log('=== Starting Credit Check ===');

            // 检查用户积分
            const rawCredits = user?.credits;
            const userCredits = parseInt(user?.credits || "0") || 0;

            console.log('Single download credit check:', {
                userEmail: user?.email,
                rawCredits: rawCredits,
                rawCreditsType: typeof rawCredits,
                userCredits: userCredits,
                userCreditsType: typeof userCredits,
                required: 1,
                hasUser: !!user,
                creditCheck: userCredits >= 1,
                isPreview: isPreview
            });

            if (!user || userCredits < 1) {
                console.error('Credit check failed:', {
                    hasUser: !!user,
                    userCredits,
                    rawCredits,
                    condition: userCredits < 1
                });
                return NextResponse.json(
                    { error: `Insufficient credits. You have ${userCredits} credits, but subtitle download requires 1 credit.` },
                    { status: 402 }
                )
            }

            console.log('Credit check passed, proceeding to deduct credits');

            // 先扣除积分
            console.log('Calling deduct-credits API with origin:', request.nextUrl.origin)
            const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: 1, reason: "Subtitle Download" })
            });

            console.log('Deduct response status:', deductResponse.status, deductResponse.statusText);

            if (!deductResponse.ok) {
                const errorData = await deductResponse.json().catch(() => ({}));
                console.error('Deduct credits failed:', {
                    status: deductResponse.status,
                    statusText: deductResponse.statusText,
                    errorData
                });
                return NextResponse.json(
                    { error: errorData.error || "Failed to deduct credits" },
                    { status: deductResponse.status }
                )
            }

            console.log('Credits deducted successfully');
        } else {
            console.log('Skipping credit check - isPreview:', isPreview)
        }

        // 代理请求到真实的后端API
        const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000"
        console.log('Backend URL:', backendUrl) // 添加调试信息
        const backendResponse = await fetch(`${backendUrl}/api/download`, {
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