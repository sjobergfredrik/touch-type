import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Touch Type Practice</h1>
      <div className="space-x-4">
        <Link 
          href="/auth/signin" 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </Link>
        <Link 
          href="/auth/register" 
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  )
}
