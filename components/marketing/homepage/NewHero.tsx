'use client'
import Image from 'next/image'

export default function NewHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Enormous Headline */}
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 text-text-primary leading-tight">
          The Calm Control Center<br />for Your Hotel.
        </h1>
        
        {/* Sub-headline */}
        <p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto">
          Zen-Guests is the OS for Indian hotels that replaces chaos with calm, and missed opportunities with effortless revenue.
        </p>
        
        {/* Central Visual - Breathing Dashboard Mockup */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden border border-border-soft shadow-2xl animate-breathe">
            <Image
              src="/images/dashboard-zen-mockup.png"
              alt="Zen-Guests Dashboard"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Single Prominent CTA */}
        <a
          href="/pilot-program"
          className="inline-block px-10 py-5 rounded-full font-bold text-xl text-white bg-accent-terracotta
                     hover:bg-accent-terracotta/90 shadow-2xl hover:shadow-accent-terracotta/50 
                     transition-all duration-300 transform hover:scale-105"
        >
          Discover the Future of Hospitality
        </a>
      </div>
    </section>
  )
}
