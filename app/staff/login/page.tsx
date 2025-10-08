'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

export default function StaffLoginPage() {
  const router = useRouter()
  const [staffId, setStaffId] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate inputs
      if (!staffId.trim()) {
        setError('Please enter your Staff ID or phone number')
        setLoading(false)
        return
      }

      if (!pin || pin.length !== 4) {
        setError('Please enter your 4-digit PIN')
        setLoading(false)
        return
      }

      // Call authentication API
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, pin }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid credentials')
        setLoading(false)
        return
      }

      // Store staff info in sessionStorage for this session
      sessionStorage.setItem('staffSession', JSON.stringify({
        id: data.staffId,
        name: data.staffName,
        role: data.role,
      }))

      // Redirect to staff dashboard
      router.push('/staff/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setError('Unable to login. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Staff Portal
          </CardTitle>
          <CardDescription className="text-base">
            Zen-Guests • Sign in to view your tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Staff ID Field */}
            <div className="space-y-2">
              <Label htmlFor="staffId" className="text-sm font-medium">
                Staff ID or Phone Number
              </Label>
              <Input
                id="staffId"
                type="text"
                placeholder="Enter your ID or phone"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="h-12 text-base"
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* PIN Field */}
            <div className="space-y-2">
              <Label htmlFor="pin" className="text-sm font-medium">
                4-Digit PIN
              </Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                placeholder="••••"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setPin(value)
                }}
                maxLength={4}
                className="h-12 text-center tracking-widest text-xl"
                autoComplete="current-password"
              />
              <p className="text-xs text-gray-500">
                Enter the 4-digit PIN provided by your manager
              </p>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials (Remove in production) */}
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>Staff ID:</strong> Ravi Kumar</p>
              <p><strong>PIN:</strong> 1234</p>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact your manager or front desk
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
