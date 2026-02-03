import { NextRequest, NextResponse } from 'next/server'

// 防止重复扣除积分的缓存（5秒内相同请求视为重复）
const recentDeductions = new Map<string, number>();

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

        // 获取请求体
        const body = await request.json()
        const { amount, reason } = body

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            )
        }

        // 创建防重复标识符
        const deductionKey = `${token.slice(-10)}_${amount}_${reason}`;
        const now = Date.now();
        
        // 检查是否在5秒内有相同的扣除请求
        if (recentDeductions.has(deductionKey)) {
            const lastTime = recentDeductions.get(deductionKey)!;
            if (now - lastTime < 5000) { // 5秒内
                console.log('Duplicate credit deduction prevented:', { amount, reason, timeDiff: now - lastTime });
                return NextResponse.json(
                    { error: 'Duplicate deduction request detected' },
                    { status: 429 }
                );
            }
        }

        // 记录本次请求
        recentDeductions.set(deductionKey, now);
        
        // 清理过期的记录（超过10秒的）
        for (const [key, time] of recentDeductions.entries()) {
            if (now - time > 10000) {
                recentDeductions.delete(key);
            }
        }

        console.log('Processing credit deduction:', { amount, reason, deductionKey });

        // 直接调用外部API扣除积分（因为外部数据库和本地数据库是同一个）
        const deductResponse = await fetch("https://api.ytvidhub.com/prod-api/g/deductCredits", {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, reason })
        });

        if (!deductResponse.ok) {
            const errorData = await deductResponse.json().catch(() => ({}))
            // 如果扣除失败，清除记录以允许重试
            recentDeductions.delete(deductionKey);
            return NextResponse.json(
                { error: errorData.message || 'Failed to deduct credits' },
                { status: deductResponse.status }
            )
        }

        const result = await deductResponse.json()

        console.log('Credit deduction successful:', {
            deductedAmount: amount,
            reason,
            result
        })

        return NextResponse.json({
            success: true,
            message: `Successfully deducted ${amount} credits`,
            remainingCredits: result.data?.remainingCredits,
            reason
        })

    } catch (error) {
        console.error('Credit deduction error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}