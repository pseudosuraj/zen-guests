// app/api/deals/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dealsRaw = await prisma.upsellDeal.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Convert Decimal to number for JSON serialization
    const deals = dealsRaw.map(deal => ({
      ...deal,
      price: deal.price.toNumber(),
      createdAt: deal.createdAt.toISOString(),
      updatedAt: deal.updatedAt.toISOString(),
    }));

    return NextResponse.json(deals, { status: 200 });
  } catch (error) {
    console.error('GET /api/deals error:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}
