import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth } from '@/lib/auth'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  interests: z.any().optional(),
})

export async function GET() {
  const session = await requireAuth()
  if (session instanceof NextResponse) return session
  const userSession = session as any

  const user = await prisma.user.findUnique({
    where: { id: userSession.user.id },
  })
  return NextResponse.json(user)
}

export async function POST(request: Request) {
  const session = await requireAuth()
  if (session instanceof NextResponse) return session

  const body = await request.json()
  const data = userSchema.parse(body)
  const user = await prisma.user.create({
    data,
  })
  return NextResponse.json(user)
}