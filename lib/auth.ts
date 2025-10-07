// lib/auth.ts
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
        auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
    }),
  ],
  pages: { signIn: "/owner/login" },
  
  callbacks: {
  async signIn({ user }) {
    // Auto-assign demo hotel to new users without one
    if (user.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      })
      
      if (dbUser && !dbUser.hotelId) {
        await prisma.user.update({
          where: { email: user.email },
          data: { hotelId: 'demo-hotel-123' }
        })
      }
    }
    return true
  }
}

}
