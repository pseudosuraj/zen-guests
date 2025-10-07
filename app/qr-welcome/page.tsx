// app/qr-welcome/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function QRWelcomePage() {
  // Use the demo hotel ID from our seed data
  const DEMO_HOTEL_ID = 'demo-hotel-123'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Welcome to The Grand Mumbai!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your personalized guest experience awaits
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What you can do:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span>✨</span>
                <span>Upgrade your room and add experiences</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🍽️</span>
                <span>Order from Mumbai's best restaurants</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🛎️</span>
                <span>Request room service instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💬</span>
                <span>Message our front desk anytime</span>
              </li>
            </ul>
          </div>

          <Button
            asChild
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold shadow-lg"
          >
            <Link href={`/guest/${DEMO_HOTEL_ID}`}>
              Enter Guest Portal →
            </Link>
          </Button>

          <p className="text-xs text-center text-gray-500">
            This portal is personalized for your stay at The Grand Mumbai
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
