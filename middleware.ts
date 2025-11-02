import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/dashboard", "/app", "/hotels", "/admin"]; // Add more as needed
const loginPage = "/login"; // Adjust path if needed (e.g., /auth/signin)

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Only protect app routes (add more as your app grows)
  const needsAuth = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (needsAuth && !token) {
    // Not authenticated – redirect to login
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = loginPage;
    loginUrl.searchParams.set("callbackUrl", pathname); // Optional: return after login
    return NextResponse.redirect(loginUrl);
  }

  // All good, continue
  return NextResponse.next();
}

// Specify which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/hotels/:path*", "/admin/:path*"],
};
