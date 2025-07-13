import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth } from '@/lib/auth'

const sessionSchema = z.object({
  userId: z.string(),
  wpm: z.number(),
  accuracy: z.number(),
  text: z.string(),
  duration: z.number(),
})

export async function GET() {
  const session = await requireAuth()
  if (session instanceof NextResponse) return session
  const userSession = session as any

  const sessions = await prisma.typingSession.findMany({
    where: { userId: userSession.user.id },
  })
  return NextResponse.json(sessions)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (auth instanceof NextResponse) return auth

  const body = await request.json()
  const data = sessionSchema.parse(body)
  const created = await prisma.typingSession.create({
    data,
  })
  return NextResponse.json(created)
}