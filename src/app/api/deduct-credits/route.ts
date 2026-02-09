import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
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

        // 首先验证token并获取用户信息
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
        console.log('Deduct credits request:', body)
        const { amount, reason } = body

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            )
        }

        // 创建防重复标识符
        const deductionKey = `${user.email}_${amount}_${reason}`;
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

        console.log('Processing credit deduction via database:', { 
            email: user.email, 
            amount, 
            reason, 
            userType: user.type 
        });

        // 直接操作数据库扣除积分
        try {
            const result = await prisma.$transaction(async (tx) => {
                // 先获取当前用户的积分
                const currentUser = await tx.user.findUnique({
                    where: {
                        email_type: {
                            email: user.email,
                            type: user.type.toString()
                        }
                    }
                });

                if (!currentUser) {
                    throw new Error('User not found in database');
                }

                const currentCredits = parseInt(currentUser.credits) || 0;
                
                if (currentCredits < amount) {
                    throw new Error(`Insufficient credits. Current: ${currentCredits}, Required: ${amount}`);
                }

                const newCredits = currentCredits - amount;

                // 更新积分
                const updatedUser = await tx.user.update({
                    where: {
                        email_type: {
                            email: user.email,
                            type: user.type.toString()
                        }
                    },
                    data: {
                        credits: newCredits.toString()
                    }
                });

                return {
                    previousCredits: currentCredits,
                    newCredits: newCredits,
                    deductedAmount: amount
                };
            });

            console.log('Credit deduction successful:', {
                email: user.email,
                deductedAmount: amount,
                previousCredits: result.previousCredits,
                newCredits: result.newCredits,
                reason
            });

            return NextResponse.json({
                success: true,
                message: `Successfully deducted ${amount} credits`,
                remainingCredits: result.newCredits,
                reason,
                deductedAmount: amount
            });

        } catch (dbError: any) {
            console.error('Database error during credit deduction:', dbError);
            recentDeductions.delete(deductionKey);
            
            return NextResponse.json(
                { error: dbError.message || 'Database error during credit deduction' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Credit deduction error:', error)
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}