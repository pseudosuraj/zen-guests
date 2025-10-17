"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/marketing/Logo";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200 h-20">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo on the left */}
        <Logo />
        
        {/* Navigation links and CTA on the right */}
        <div className="flex items-center gap-8">
          <Link href="/products" className="text-gray-700 hover:text-purple-700 font-medium transition">
            Products
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-purple-700 font-medium transition">
            Pricing
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-purple-700 font-medium transition">
            About Us
          </Link>
          <Button asChild className="ml-2 bg-purple-700 hover:bg-purple-800 text-white text-base px-6 py-2 font-semibold rounded-xl shadow" size="lg">
            <Link href="/book-a-demo">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
