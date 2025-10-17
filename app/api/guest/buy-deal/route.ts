import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { dealId, hotelId, roomNumber, guestName } = await req.json()
  if (!dealId || !hotelId || !roomNumber) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }
  await prisma.dealRedemption.create({
    data: {
      dealId,
      hotelId,
      roomNumber,
      guestName,
      status: "pending",
    }
  })
  return NextResponse.json({ success: true })
}
