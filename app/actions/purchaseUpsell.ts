// app/actions/purchaseUpsell.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

interface PurchaseData {
  dealName: string
  dealPrice: number
  hotelId: string
  roomNumber: string
  guestName?: string
}

export async function purchaseUpsell(data: PurchaseData) {
  try {
    console.log('💰 Processing upsell purchase:', data)

    // 1) Create revenue ledger entry
    const revenueEntry = await prisma.revenueLedger.create({
      data: {
        amount: data.dealPrice,
        dealName: data.dealName,
        guestName: data.guestName || 'Guest',
        roomNumber: data.roomNumber,
        hotelId: data.hotelId,
      },
    })

    console.log('✅ Revenue logged:', revenueEntry.id)

    // 2) Create service task for staff to fulfill
    const fulfillmentTask = await prisma.serviceTask.create({
      data: {
        title: `Fulfill Upsell: ${data.dealName}`,
        description: `Guest in Room ${data.roomNumber} purchased: ${data.dealName} (₹${data.dealPrice})`,
        status: 'pending',
        priority: 'high',
        roomNumber: data.roomNumber,
        hotelId: data.hotelId,
      },
    })

    console.log('✅ Fulfillment task created:', fulfillmentTask.id)

    // 3) Revalidate dashboard to update revenue KPIs
    revalidatePath('/owner/dashboard')
    revalidatePath('/owner/tasks')

    return {
      success: true,
      revenueId: revenueEntry.id,
      taskId: fulfillmentTask.id,
    }
  } catch (error) {
    console.error('❌ Purchase upsell error:', error)
    throw new Error('Failed to process purchase')
  }
}
