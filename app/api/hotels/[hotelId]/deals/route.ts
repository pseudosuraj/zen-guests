// app/api/hotels/[hotelId]/deals/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await params

    console.log('📥 GET /api/hotels/[hotelId]/deals called')
    console.log('Hotel ID:', hotelId)

    // Fetch active deals for this hotel
    const deals = await prisma.upsellDeal.findMany({
      where: {
        hotelId: hotelId,
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(`✅ Found ${deals.length} deals for hotel ${hotelId}`)

    return NextResponse.json(deals)
  } catch (error) {
    console.error('❌ Fetch deals error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
}
