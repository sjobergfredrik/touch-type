import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface SignInData {
  email: string
  password: string
}

interface SignUpData extends SignInData {
  name: string
}

export function useAuth() {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async ({ email, password }: SignInData) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        return false
      }

      router.push("/dashboard")
      return true
    } catch (error) {
      setError("An error occurred during sign in")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async ({ name, email, password }: SignUpData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "An error occurred during registration")
        return false
      }

      // Automatically sign in after successful registration
      return handleSignIn({ email, password })
    } catch (error) {
      setError("An error occurred during registration")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      router.push("/auth/signin")
    } catch (error) {
      setError("An error occurred during sign out")
    }
  }

  return {
    session,
    status,
    error,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  }
} 