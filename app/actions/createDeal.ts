// app/actions/createDeal.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createDeal(formData: FormData) {
  try {
    const name = String(formData.get('name') ?? '')
    const description = String(formData.get('description') ?? '')
    const price = parseFloat(String(formData.get('price') ?? '0'))
    const type = String(formData.get('type') ?? '')
    const imageUrl = String(formData.get('imageUrl') ?? '')
    const hotelId = String(formData.get('hotelId') ?? '')

    if (!name.trim()) {
      throw new Error('Deal name is required')
    }

    if (!hotelId) {
      throw new Error('Hotel ID is required')
    }

    await prisma.upsellDeal.create({
      data: { 
        name, 
        description, 
        price, 
        type, 
        imageUrl,
        hotelId,  // Add the missing hotelId
        active: true,
      }
    })

    revalidatePath("/owner/deals")
    return { success: true }
  } catch (error) {
    console.error('❌ Create deal error:', error)
    throw error
  }
}
