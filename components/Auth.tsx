import { useState } from 'react'
import type { FormEvent } from 'react'
import { firebaseAuth } from 'utils/firebase-client'
import { signInAnonymously } from 'firebase/auth'

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) {
      return false
    }

    try {
      setIsLoading(true)

      await signInAnonymously(firebaseAuth)
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto mt-10 px-6 text-slate-900 text-center">
      <div className="rounded border border-slate-200 p-10">
        <h1 className="font-medium text-2xl mb-6">Login to Chat</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <button
            className="block w-full rounded py-3 px-5 text-white bg-blue-800 hover:bg-blue-700 disabled:bg-slate-400"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
