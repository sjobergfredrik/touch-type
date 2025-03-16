import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const sessions = await prisma.typingSession.findMany({
    include: {
      user: true
    }
  })
  return NextResponse.json(sessions)
}

export async function POST(request: Request) {
  const data = await request.json()
  const session = await prisma.typingSession.create({
    data,
    include: {
      user: true
    }
  })
  return NextResponse.json(session)
} 