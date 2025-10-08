// app/api/hotels/[hotelId]/minibar-manage/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch all minibar items (for management)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await params

    const items = await prisma.minibarItem.findMany({
      where: { hotelId },
      orderBy: { category: 'asc' },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('❌ Fetch minibar error:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

// POST - Create new minibar item
export async function POST(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await params
    const body = await request.json()

    const item = await prisma.minibarItem.create({
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        stockQuantity: body.stockQuantity,
        lowStockThreshold: body.lowStockThreshold,
        hotelId,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('❌ Create minibar item error:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
