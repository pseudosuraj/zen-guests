import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    const hotelId = params.hotelId
    const deals = await prisma.deal.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(deals)
  } catch (error) {
    console.error("Error fetching regular deals:", error)
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
  }
}
