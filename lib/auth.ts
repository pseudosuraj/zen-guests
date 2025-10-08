// lib/auth.ts
import { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM || 'noreply@zen-guests.com',
    }),
  ],
  pages: {
    signIn: '/owner/login',
    verifyRequest: '/owner/login',
    error: '/owner/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Auto-assign demo hotel to any user without one (for development)
      if (user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true, hotelId: true },
          })

          // If user exists but has no hotel, assign demo hotel
          if (existingUser && !existingUser.hotelId) {
            await prisma.user.update({
              where: { email: user.email },
              data: { hotelId: 'demo-hotel-123' },
            })
            console.log('✅ Auto-assigned demo hotel to:', user.email)
          }

          // If user doesn't exist yet, they'll be created by adapter with hotelId below
          if (!existingUser) {
            console.log('🆕 New user will be created:', user.email)
          }
        } catch (error) {
          console.error('❌ Error in signIn callback:', error)
        }
      }
      return true
    },
    async session({ session, user }) {
      // Attach hotelId to session for easy access
      if (session.user && user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { hotelId: true },
        })
        if (dbUser?.hotelId) {
          // @ts-ignore - Add hotelId to session
          session.user.hotelId = dbUser.hotelId
        }
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // When a new user is created by NextAuth, auto-assign demo hotel
      if (user.email) {
        try {
          await prisma.user.update({
            where: { email: user.email },
            data: { hotelId: 'demo-hotel-123' },
          })
          console.log('✅ New user created and assigned demo hotel:', user.email)
        } catch (error) {
          console.error('❌ Error assigning hotel to new user:', error)
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true, // Enable debug logs
}
