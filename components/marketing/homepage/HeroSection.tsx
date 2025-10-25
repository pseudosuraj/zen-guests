'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-white min-h-[520px] flex items-center py-12 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 px-6">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary">
            Stop Managing Chaos. Start Engineering Profit.
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-8">
            The All-in-One Revenue & Experience OS for India's Modern Hotels.
          </p>
          <div className="flex gap-4">
            <a
              href="/pilot-program"
              className="inline-block px-7 py-3 rounded-lg font-bold text-lg bg-accent-teal text-white
                         hover:bg-accent-teal/90 transition shadow-lg"
              style={{ boxShadow: '0 2px 16px rgba(0,128,128,0.12)' }}
            >
              Join the Pilot Program
            </a>
            <a
              href="#learn-more"
              className="inline-block px-7 py-3 rounded-lg font-semibold text-lg border border-primary
                         text-primary hover:bg-primary hover:text-white transition"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Hero Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/images/hero-manager.png"
            width={480}
            height={600}
            alt="Confident Indian hotel manager using Zen-Guests dashboard"
            className="rounded-2xl shadow-2xl object-cover border-4 border-gray-50"
            priority
          />
        </div>
      </div>
    </section>
  )
}
