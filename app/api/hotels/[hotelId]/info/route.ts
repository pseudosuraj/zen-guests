import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: params.hotelId },
      select: {
        id: true,
        name: true,
        wifiName: true,
        wifiPassword: true
      }
    })
    
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 })
    }
    
    return NextResponse.json(hotel)
  } catch (error) {
    console.error("Error fetching hotel info:", error)
    return NextResponse.json({ error: "Failed to fetch hotel info" }, { status: 500 })
  }
}
