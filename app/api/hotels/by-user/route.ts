// /app/api/hotels/by-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") ?? undefined;
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.hotelId) return NextResponse.json({ error: "User or hotel not found" }, { status: 404 });
  const hotel = await prisma.hotel.findUnique({ where: { id: user.hotelId } });
  return NextResponse.json({ hotel });
}
