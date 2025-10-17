"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        {/* Replace with your real logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-zenguests.png" alt="Zen-Guests Logo" width={40} height={40} />
          <span className="text-xl font-extrabold tracking-wide text-purple-700">Zen-Guests</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/products" className="text-gray-700 text-md font-medium hover:text-purple-700 transition">Products</Link>
        <Link href="/pricing" className="text-gray-700 text-md font-medium hover:text-purple-700 transition">Pricing</Link>
        <Link href="/about-us" className="text-gray-700 text-md font-medium hover:text-purple-700 transition">About Us</Link>
        <Button asChild className="ml-3 px-6 py-2 font-semibold bg-purple-700 hover:bg-purple-800 text-base">
          <Link href="/book-a-demo">Book a Demo</Link>
        </Button>
      </div>
    </nav>
  );
}
