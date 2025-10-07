// app/actions/createDeal.ts
'use server'

import { Prisma, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // adjust path if you don’t use "@/"

const prisma = new PrismaClient()

export async function createDeal(formData: FormData) {
  // 1) Auth
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  // 2) Resolve current user and hotel
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, hotelId: true },
  })
  if (!user?.hotelId) {
    throw new Error('No hotel linked to user')
  }

  // 3) Read inputs
  const name = String(formData.get('name') ?? '')
  const priceStr = String(formData.get('price') ?? '0')
  const description = String(formData.get('description') ?? '')
  const imageUrl = String(formData.get('imageUrl') ?? '')
  const type = String(formData.get('type') ?? '')
  const active = String(formData.get('active') ?? 'true') === 'true'

  if (!name.trim()) {
    throw new Error('Name is required')
  }

  // 4) Create deal scoped to tenant
  const deal = await prisma.upsellDeal.create({
    data: {
      name,
      price: new Prisma.Decimal(priceStr),
      description: description || null,
      imageUrl: imageUrl || null,
      type: type || null,
      active,
      hotelId: user.hotelId,
    },
  })

  return deal
}
