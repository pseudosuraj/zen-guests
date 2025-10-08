// app/api/hotels/[hotelId]/minibar/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await params

    console.log('📥 GET /api/hotels/[hotelId]/minibar called')
    console.log('Hotel ID:', hotelId)

    const items = await prisma.minibarItem.findMany({
      where: {
        hotelId: hotelId,
        isAvailable: true,
      },
      orderBy: {
        category: 'asc',
      },
    })

    console.log(`✅ Found ${items.length} minibar items`)

    return NextResponse.json(items)
  } catch (error) {
    console.error('❌ Fetch minibar error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch minibar items' },
      { status: 500 }
    )
  }
}
