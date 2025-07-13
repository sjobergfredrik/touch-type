import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function requireAuth() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }
  return session;
}

export async function getAuthSession() {
  return getServerSession(authOptions as any);
}
