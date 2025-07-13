import { NextResponse } from 'next/server'
import { getContentByInterest } from '@/lib/interestContent'
import { requireAuth } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await requireAuth()
  if (session instanceof NextResponse) return session

  const { searchParams } = new URL(request.url)
  const interest = searchParams.get('interest') || 'music'
  const content = getContentByInterest(interest)
  return NextResponse.json({ content })
}
