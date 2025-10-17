import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  const { hotelId } = await context.params;
  
  const deals = await prisma.deal.findMany({
    where: { 
      hotelId,
      isRegular: true,
      isActive: true,
    },
    orderBy: { createdAt: "desc" }
  });
  
  return NextResponse.json(deals);
}
