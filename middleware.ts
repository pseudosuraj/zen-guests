// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bypass authentication for development/pilot
  // Remove this when you have proper domain + email
  if (pathname.startsWith('/owner')) {
    // Allow all owner routes without auth for now
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/owner/:path*',
    '/api/tasks/:path*',
  ],
}
