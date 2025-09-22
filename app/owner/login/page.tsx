import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Hotelier Portal</h1>
          <p className="text-sm text-gray-600">Sign in to manage your hotel</p>
        </div>
        <Suspense fallback={<div className="text-center">Loading login…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
