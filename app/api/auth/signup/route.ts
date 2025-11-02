import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    let form;
    try {
      form = await req.json();
    } catch (badJson) {
      return NextResponse.json({ error: "Body not valid JSON!" }, { status: 400 });
    }
    const { hotelName, name, email, password } = form || {};
    if (!hotelName || !name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const hotelId = hotelName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    // Ensure the Hotel exists first
    let hotel = await prisma.hotel.findUnique({ where: { id: hotelId } });
    if (!hotel) {
      hotel = await prisma.hotel.create({
        data: {
          id: hotelId,
          name: hotelName,
        },
      });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
        hotelId: hotel.id,
      },
    });

    // ---- EMAIL SEND + DEBUG ----
    let emailResult;
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      emailResult = await resend.emails.send({
        from: process.env.EMAIL_FROM || "hello@zenguests.com",
        to: email,
        subject: "Welcome to Zen-Guests!",
        html: `<p>Welcome! <a href="http://localhost:3000/login">Sign in to your dashboard</a></p>`,
      });
      console.log("Resend email send result:", emailResult);
      if (emailResult.error) {
        return NextResponse.json({ success: true, email: "failed", error: emailResult.error }, { status: 200 });
      }
    } catch (emailErr: any) {
      console.error("Resend email error:", emailErr);
      return NextResponse.json({ success: true, email: "failed", error: emailErr.message }, { status: 200 });
    }
    // ---- END EMAIL SEND ----

    return NextResponse.json({ success: true, email: "sent" });
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: err?.message || "Signup failed" }, { status: 500 });
  }
}
