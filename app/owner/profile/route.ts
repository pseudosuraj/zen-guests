import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ hotelName: "Hotel Dashboard" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ hotelName: "Hotel Dashboard" }, { status: 404 });

  let hotel = null;
  if (typeof user.hotelId === "string") {
    hotel = await prisma.hotel.findUnique({ where: { id: user.hotelId } });
  }

  return NextResponse.json({ hotelName: hotel?.name || "Hotel Dashboard" });
}
