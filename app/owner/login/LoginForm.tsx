'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/owner/dashboard'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    try {
      // NextAuth will redirect after the magic link flow
      await signIn('email', { email, callbackUrl, redirect: true })
      setMessage('Magic link sent! Check your email.')
    } catch {
      setMessage('Failed to send magic link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border px-3 py-2"
        required
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !email}
        className="w-full rounded-md bg-indigo-600 py-2 text-white disabled:bg-gray-400"
      >
        {isLoading ? 'Sending...' : 'Sign in with Email'}
      </button>
      {message ? <p className="text-sm">{message}</p> : null}
    </form>
  )
}
