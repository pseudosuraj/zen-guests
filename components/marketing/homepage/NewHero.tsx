'use client'
import Image from 'next/image'

export default function NewHero() {
  return (
    <section className="min-h-[85vh] flex items-center py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column - Text */}
        <div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-primary-dark leading-tight">
            Stop Managing Chaos.<br />
            Start Engineering Profit.
          </h1>
          <p className="text-xl md:text-2xl text-primary-dark/80 mb-10 leading-relaxed">
            The All-in-One Revenue & Experience OS for India's Modern Hotels.
          </p>
          <div className="flex gap-4">
            <a
              href="/pilot-program"
              className="inline-block px-8 py-4 rounded-xl font-bold text-lg text-white bg-accent-emerald
                         hover:bg-accent-emerald/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join the Pilot Program
            </a>
            <a
              href="#learn-more"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-dark
                         text-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Column - Glowing Product Mockup */}
        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border-4 border-border-soft bg-card-bg shadow-2xl
                          animate-glow-pulse max-w-lg">
            <Image
              src="/images/dashboard-mockup.png"
              alt="Zen-Guests Dashboard"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
