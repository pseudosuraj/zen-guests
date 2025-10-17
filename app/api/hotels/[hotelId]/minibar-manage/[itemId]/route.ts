import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { hotelId: string; itemId: string } }
) {
  try {
    const { hotelId, itemId } = context.params;

    const item = await prisma.minibarItem.findFirst({
      where: {
        id: itemId,
        hotelId,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching minibar item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch minibar item' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { hotelId: string; itemId: string } }
) {
  try {
    const { hotelId, itemId } = context.params;
    const body = await request.json();

    const { name, price, category, stockQuantity, lowStockThreshold, isAvailable } = body;

    const updatedItem = await prisma.minibarItem.update({
      where: {
        id: itemId,
      },
      data: {
        ...(name && { name }),
        ...(price && { price: parseFloat(price) }),
        ...(category && { category }),
        ...(stockQuantity !== undefined && { stockQuantity: parseInt(stockQuantity) }),
        ...(lowStockThreshold !== undefined && { lowStockThreshold: parseInt(lowStockThreshold) }),
        ...(isAvailable !== undefined && { isAvailable }),
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating minibar item:', error);
    return NextResponse.json(
      { error: 'Failed to update minibar item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { hotelId: string; itemId: string } }
) {
  try {
    const { hotelId, itemId } = context.params;

    await prisma.minibarItem.delete({
      where: {
        id: itemId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting minibar item:', error);
    return NextResponse.json(
      { error: 'Failed to delete minibar item' },
      { status: 500 }
    );
  }
}
