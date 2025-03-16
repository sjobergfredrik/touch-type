import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-4xl font-bold text-center mb-2">Touch Type Practice</h1>
          <p className="text-center text-gray-600">Improve your typing speed and accuracy</p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/auth/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
          
          <Link 
            href="/auth/register"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
} 