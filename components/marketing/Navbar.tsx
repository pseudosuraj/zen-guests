'use client'

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-card-bg/95 backdrop-blur-sm border-b border-border-soft shadow-sm fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl font-bold text-primary-blue">
          Zen-Guests
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about-us" className="text-primary-blue hover:text-accent-gold transition text-base font-medium">
            About
          </Link>
          <Link href="/products" className="text-primary-blue hover:text-accent-gold transition text-base font-medium">
            Products
          </Link>
          <Link href="/pricing" className="text-primary-blue hover:text-accent-gold transition text-base font-medium">
            Pricing
          </Link>
          <Link href="/book-a-demo">
            <span
              className="ml-2 px-5 py-3 rounded-lg bg-accent-gold text-white font-bold 
                         hover:bg-accent-gold/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Demo
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
