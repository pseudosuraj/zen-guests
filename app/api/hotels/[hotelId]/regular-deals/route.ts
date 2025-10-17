import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await context.params;

    const regularDeals = await prisma.deal.findMany({
      where: {
        hotelId,
        isRegular: true,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(regularDeals);
  } catch (error) {
    console.error('Error fetching regular deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regular deals' },
      { status: 500 }
    );
  }
}
