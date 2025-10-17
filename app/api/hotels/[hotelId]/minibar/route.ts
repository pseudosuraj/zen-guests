import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { hotelId: string } }
) {
  try {
    const { hotelId } = context.params;

    const minibarItems = await prisma.minibarItem.findMany({
      where: {
        hotelId,
        isAvailable: true,
      },
      orderBy: {
        category: 'asc',
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
