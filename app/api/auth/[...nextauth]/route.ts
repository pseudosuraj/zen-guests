import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
    }),
  ],
  pages: {
    signIn: "/owner/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After successful email verification, redirect to dashboard
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      // For same origin URLs, allow them
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // Default redirect to dashboard for successful logins
      return `${baseUrl}/owner/dashboard`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }
