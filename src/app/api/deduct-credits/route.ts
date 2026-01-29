import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
        const { amount, reason } = body

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            )
        }

        console.log('Received user data from API:', {
            googleUserId: user.googleUserId,
            email: user.email,
            credits: user.credits,
            type: user.type
        })

        // 查找数据库中的用户记录
        let dbUser = null;

        // 方式1: 用googleUserId + type="2"查找
        if (user.googleUserId) {
            console.log('Searching by googleUserId:', user.googleUserId)
            dbUser = await prisma.user.findFirst({
                where: {
                    googleUserId: user.googleUserId,
                    type: "2"
                }
            })
            console.log('Found by googleUserId:', dbUser ? 'YES' : 'NO')
        }

        // 方式2: 如果没找到，用email + type="2"查找
        if (!dbUser && user.email) {
            console.log('Searching by email:', user.email)
            dbUser = await prisma.user.findFirst({
                where: {
                    email: user.email,
                    type: "2"
                }
            })
            console.log('Found by email:', dbUser ? 'YES' : 'NO')
        }

        console.log('Database user lookup:', {
            searchGoogleUserId: user.googleUserId,
            searchEmail: user.email,
            foundUser: dbUser ? {
                id: dbUser.id,
                googleUserId: dbUser.googleUserId,
                email: dbUser.email,
                credits: dbUser.credits,
                type: dbUser.type
            } : null
        })


        if (!dbUser) {
            return NextResponse.json(
                { error: `User not found in database. GoogleUserId: ${user.googleUserId}, Email: ${user.email}` },
                { status: 404 }
            )
        }

        // 检查积分是否足够
        const currentCredits = parseInt(dbUser.credits || "0") || 0

        console.log('Credit check:', {
            email: user.email,
            dbCredits: dbUser.credits,
            parsedCredits: currentCredits,
            requestedAmount: amount,
            hasEnough: currentCredits >= amount
        })

        if (isNaN(currentCredits) || currentCredits < amount) {
            return NextResponse.json(
                { error: `Insufficient credits. You have ${currentCredits} credits, but need ${amount}.` },
                { status: 402 }
            )
        }

        // 扣除积分
        const newCredits = currentCredits - amount
        await prisma.user.update({
            where: {
                id: dbUser.id
            },
            data: {
                credits: newCredits.toString()
            }
        })

        console.log('Credit deduction successful:', {
            userId: dbUser.id,
            oldCredits: currentCredits,
            deductedAmount: amount,
            newCredits: newCredits
        })

        return NextResponse.json({
            success: true,
            message: `Successfully deducted ${amount} credits`,
            remainingCredits: newCredits,
            reason
        })

    } catch (error) {
        console.error('Credit deduction error details:', {
            error: error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        })
        return NextResponse.json(
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}