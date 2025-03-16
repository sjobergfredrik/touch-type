'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TypingTest from '@/components/TypingTest'
import Link from 'next/link'

export default function PracticePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  // Redirect to sign in if not authenticated
  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleTestComplete = async (results: {
    wpm: number
    accuracy: number
    text: string
    duration: number
  }) => {
    try {
      const response = await fetch('/api/typing-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...results,
          userId: session.user?.id,
        }),
      })
      
      if (!response.ok) throw new Error('Failed to save results')
      
      const data = await response.json()
      console.log('Saved session:', data)
    } catch (error) {
      console.error('Error saving session:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold">Touch Type Practice</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <span className="text-gray-700">
                Welcome, {session.user?.name || session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Typing Practice</h1>
          <TypingTest onComplete={handleTestComplete} />
        </div>
      </main>
    </div>
  )
} 