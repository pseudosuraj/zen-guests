import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const hotelId = "demo-hotel-123" // Or get from session/auth
    
    const count = await prisma.dealRedemption.count({
      where: {
        hotelId,
        status: "pending"
      }
    })
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error counting deal requests:", error)
    return NextResponse.json({ count: 0 })
  }
}
