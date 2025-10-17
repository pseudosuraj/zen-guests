import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  const hotelId = params.hotelId
  const deals = await prisma.deal.findMany({
    where: { hotelId },
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(deals)
}
