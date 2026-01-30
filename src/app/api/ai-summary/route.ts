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
        const { url } = body

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            )
        }

        // 检查用户积分
        const userCredits = parseInt(user?.credits || "0") || 0;

        console.log('AI Summary credit check:', {
            userData: user,
            userCredits,
            required: 2
        });

        if (!user || userCredits < 2) {
            return NextResponse.json(
                { error: `Insufficient credits. You have ${userCredits} credits, but AI Summary requires 2 credits.` },
                { status: 402 }
            )
        }

        // 1. 先扣除积分 (按照 lib/api.ts 的逻辑，确保在请求开始前就扣费成功)
        try {
            console.log('Deducting AI summary credits...');
            const deductResponse = await fetch(`${request.nextUrl.origin}/api/deduct-credits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ amount: 2, reason: "AI Summary Generation" }),
            });

            if (!deductResponse.ok) {
                const errorData = await deductResponse.json().catch(() => ({}));
                console.error('Failed to deduct credits:', errorData);
                return NextResponse.json(
                    { error: errorData.error || 'Failed to deduct credits' },
                    { status: deductResponse.status || 402 }
                );
            }
            console.log('Credits deducted successfully.');
        } catch (deductError) {
            console.error('Credit deduction error:', deductError);
            return NextResponse.json(
                { error: 'System error during credit deduction' },
                { status: 500 }
            );
        }

        // 2. 代理请求到真实的后端API
        console.log('Proxying AI summary request for URL:', url)
        const startTime = Date.now();
        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/generate_summary_stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // 必须透传 Authorization Header
            },
            body: JSON.stringify({ url }),
        });

        console.log('Backend response received in:', Date.now() - startTime, 'ms', {
            status: backendResponse.status
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.text().catch(() => 'Unknown error')
            console.error('Backend API error:', errorData)
            return NextResponse.json(
                { error: 'Failed to generate summary' },
                { status: backendResponse.status }
            )
        }

        // 返回流式响应
        return new NextResponse(backendResponse.body, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        })

    } catch (error) {
        console.error('AI Summary proxy error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}