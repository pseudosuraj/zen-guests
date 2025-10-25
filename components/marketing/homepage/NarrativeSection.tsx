'use client'
import Image from 'next/image'

export default function NarrativeSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2 className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-16 text-center">
          Transform Every Guest Stay.
        </h2>
        
        {/* Three-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: The Problem */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl overflow-hidden border border-border-soft mb-6 w-full h-80">
              <Image
                src="/images/frustrated-guest.jpg"
                alt="Frustrated guest waiting"
                width={400}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
              The Disconnected Experience
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Manual systems, lost requests, and delayed responses create frustration and erode trust.
            </p>
          </div>
          
          {/* Column 2: The Solution (Tallest) */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-3xl overflow-hidden border border-border-soft mb-6 shadow-2xl" style={{ height: '500px' }}>
              <Image
                src="/images/guest-portal-phone.png"
                alt="Zen-Guests Guest Portal on Phone"
                width={300}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-accent-terracotta mb-3">
              The Digital Welcome
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Guests access everything—minibar, room service, spa bookings—instantly from their phone.
            </p>
          </div>
          
          {/* Column 3: The Outcome */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl overflow-hidden border border-border-soft mb-6 w-full h-80">
              <Image
                src="/images/happy-guests.jpg"
                alt="Happy guests enjoying service"
                width={400}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
              Effortless Delight
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Seamless service creates 5-star experiences, glowing reviews, and repeat bookings.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
