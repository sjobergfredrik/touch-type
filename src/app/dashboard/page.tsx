'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TypingSession {
  id: number
  wpm: number
  accuracy: number
  duration: number
  createdAt: string
  text: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sessions, setSessions] = useState<TypingSession[]>([])
  const [stats, setStats] = useState({
    averageWpm: 0,
    averageAccuracy: 0,
    totalTests: 0,
    bestWpm: 0
  })

  useEffect(() => {
    if (status === "authenticated") {
      fetchSessions()
    }
  }, [status])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/typing-sessions')
      const data = await response.json()
      
      setSessions(data)
      calculateStats(data)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  const calculateStats = (sessions: TypingSession[]) => {
    if (sessions.length === 0) return

    const totalWpm = sessions.reduce((sum, session) => sum + session.wpm, 0)
    const totalAccuracy = sessions.reduce((sum, session) => sum + session.accuracy, 0)
    const bestWpm = Math.max(...sessions.map(session => session.wpm))

    setStats({
      averageWpm: Math.round(totalWpm / sessions.length),
      averageAccuracy: Math.round(totalAccuracy / sessions.length),
      totalTests: sessions.length,
      bestWpm
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold">Touch Type Practice</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/practice" 
                className="text-gray-700 hover:text-gray-900"
              >
                Practice
              </Link>
              <span className="text-gray-700">
                Welcome, {session.user?.name || session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Average WPM</h3>
            <p className="text-3xl font-bold">{stats.averageWpm}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Average Accuracy</h3>
            <p className="text-3xl font-bold">{stats.averageAccuracy}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Tests Completed</h3>
            <p className="text-3xl font-bold">{stats.totalTests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Best WPM</h3>
            <p className="text-3xl font-bold">{stats.bestWpm}</p>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Recent Sessions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WPM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.wpm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.accuracy}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.duration}s
                    </td>
                    <td className="px-6 py-4">
                      <div className="truncate max-w-xs">
                        {session.text}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
} 