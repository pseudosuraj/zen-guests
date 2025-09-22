import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/owner/login",
  },
})

export const config = {
  matcher: ["/owner/dashboard/:path*", "/owner/reservations/:path*", "/owner/settings/:path*"]
}
