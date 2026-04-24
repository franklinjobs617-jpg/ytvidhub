import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
        }

        const token = authHeader.split(' ')[1]

        const userResponse = await fetch("https://api.ytvidhub.com/prod-api/g/getUser", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const userData = await userResponse.json()
        const user = userData.data

        if (!user || !user.email) {
            return NextResponse.json({ error: 'User data not found' }, { status: 400 })
        }

        const body = await request.json()
        const { url, lang, format, title, isPreview } = body

        if (!url) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
        }

        const userType = (user.type ?? '1').toString()

        if (!isPreview) {
            const userCredits = parseInt(user?.credits || "0") || 0;
            if (userCredits < 1) {
                return NextResponse.json(
                    { error: `Insufficient credits. You have ${userCredits} credits, but subtitle download requires 1 credit.` },
                    { status: 402 }
                )
            }
        }

        const backendResponse = await fetch("https://ytdlp.vistaflyer.com/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url, lang, format, title }),
        });

        if (!backendResponse.ok) {
            const rawError = await backendResponse.text().catch(() => '')
            let backendMessage = ''
            if (rawError) {
                try {
                    const parsed = JSON.parse(rawError)
                    backendMessage = parsed?.error || parsed?.message || rawError
                } catch {
                    backendMessage = rawError
                }
            }
            if (!backendMessage || /<!doctype html|<html/i.test(backendMessage)) {
                backendMessage = 'Failed to download subtitle'
            }
            console.error('Backend API error:', backendMessage)
            return NextResponse.json({ error: backendMessage }, { status: backendResponse.status })
        }

        // 直接通过 Prisma 扣积分，无需内部 HTTP 跳转
        if (!isPreview) {
            try {
                await prisma.$transaction(async (tx: any) => {
                    const currentUser = await tx.user.findUnique({
                        where: { email_type: { email: user.email, type: userType } }
                    });

                    if (!currentUser) throw new Error(`User not found: ${user.email} type=${userType}`);

                    const currentCredits = parseInt(currentUser.credits) || 0;
                    if (currentCredits < 1) throw new Error(`Insufficient credits: ${currentCredits}`);

                    await tx.user.update({
                        where: { email_type: { email: user.email, type: userType } },
                        data: { credits: (currentCredits - 1).toString() }
                    });
                });
                console.log('[download-single] Credit deducted for:', user.email);
            } catch (deductErr) {
                console.error('[download-single] Credit deduction failed:', deductErr);
            }
        }

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
    } finally {
        await prisma.$disconnect()
    }
}
