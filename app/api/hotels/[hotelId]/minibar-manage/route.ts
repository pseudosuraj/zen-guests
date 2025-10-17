import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await context.params;

    const minibarItems = await prisma.minibarItem.findMany({
      where: {
        hotelId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(minibarItems);
  } catch (error) {
    console.error('Error fetching minibar items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch minibar items' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await context.params;
    const body = await request.json();

    const { name, price, category, stockQuantity, lowStockThreshold } = body;

    const minibarItem = await prisma.minibarItem.create({
      data: {
        name,
        price: parseFloat(price),
        category,
        stockQuantity: parseInt(stockQuantity) || 0,
        lowStockThreshold: parseInt(lowStockThreshold) || 5,
        isAvailable: true,
        hotelId,
      },
    });

    return NextResponse.json(minibarItem, { status: 201 });
  } catch (error) {
    console.error('Error creating minibar item:', error);
    return NextResponse.json(
      { error: 'Failed to create minibar item' },
      { status: 500 }
    );
  }
}
