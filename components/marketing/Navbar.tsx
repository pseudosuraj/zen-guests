'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-soft">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-violet rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold text-text-primary">Zen-Guests</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about-us" className="text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/products" className="text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium">
              Products
            </Link>
            <Link href="/pricing" className="text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium">
              Pricing
            </Link>
            <Link
              href="#pilot-program"
              className="bg-primary-violet text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 hover:scale-105 transition-all duration-200"
            >
              Join Pilot
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
          >
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/about-us" className="block text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium py-2">
                About
              </Link>
              <Link href="/products" className="block text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium py-2">
                Products
              </Link>
              <Link href="/pricing" className="block text-text-secondary hover:text-primary-violet transition-colors duration-200 font-medium py-2">
                Pricing
              </Link>
              <Link
                href="#pilot-program"
                className="block bg-primary-violet text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-opacity-90 transition-all duration-200"
              >
                Join Pilot
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
