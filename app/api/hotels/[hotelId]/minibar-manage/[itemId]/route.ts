// app/api/hotels/[hotelId]/minibar-manage/[itemId]/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT - Update minibar item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ hotelId: string; itemId: string }> }
) {
  try {
    const { itemId } = await params
    const body = await request.json()

    const item = await prisma.minibarItem.update({
      where: { id: itemId },
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        stockQuantity: body.stockQuantity,
        lowStockThreshold: body.lowStockThreshold,
        isAvailable: body.isAvailable,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('❌ Update minibar item error:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

// DELETE - Delete minibar item
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params

    await prisma.minibarItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Delete minibar item error:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}
