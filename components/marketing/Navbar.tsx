'use client'

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-white/95 border-b border-gray-200 shadow-sm fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl font-bold text-primary">
          Zen-Guests
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about-us" className="text-primary hover:text-accent-green transition text-base font-medium">
            About
          </Link>
          <Link href="/products" className="text-primary hover:text-accent-green transition text-base font-medium">
            Products
          </Link>
          <Link href="/pricing" className="text-primary hover:text-accent-green transition text-base font-medium">
            Pricing
          </Link>
          <Link href="/book-a-demo">
            <span
              className="ml-2 px-5 py-2 rounded-lg bg-accent-green text-white font-bold shadow hover:bg-accent-green/80 transition"
              style={{ boxShadow: '0 2px 14px rgba(16,185,129,0.08)' }}
            >
              Book a Demo
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
