import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ msg: "Hello! Your API is running." });
}
