'use client'
import Image from 'next/image'

export default function FeatureShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Feature 1: Revenue Engine */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Left */}
          <div className="rounded-3xl overflow-hidden border border-border-soft bg-card-bg shadow-2xl">
            <Image
              src="/images/revenue-engine-mockup.png"
              alt="Revenue Engine Dashboard"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Text Right */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              The Revenue Engine
            </h2>
            <p className="text-xl text-primary-dark/70 leading-relaxed mb-6">
              Launch and market your up-sells instantly with the built-in In-House Marketplace. 
              Every guest sees only what's for them, every booking is tracked, and every rupee is maximized.
            </p>
            <a href="/products" className="inline-block text-accent-emerald font-semibold text-lg hover:underline">
              Explore Revenue Features →
            </a>
          </div>
        </div>

        {/* Feature 2: Operations Engine */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Left */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              Peak Productivity
            </h2>
            <p className="text-xl text-primary-dark/70 leading-relaxed mb-6">
              Unified dashboard for every department—no more sticky notes, WhatsApp chaos, or lost tasks. 
              Assignment, progress, and results all tracked in real time.
            </p>
            <a href="/products" className="inline-block text-accent-emerald font-semibold text-lg hover:underline">
              Explore Operations Features →
            </a>
          </div>
          {/* Image Right */}
          <div className="rounded-3xl overflow-hidden border border-border-soft bg-card-bg shadow-2xl">
            <Image
              src="/images/operations-mockup.png"
              alt="Operations Dashboard"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Feature 3: Experience Engine */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Left */}
          <div className="rounded-3xl overflow-hidden border border-border-soft bg-card-bg shadow-2xl">
            <Image
              src="/images/guest-experience-mockup.png"
              alt="Guest Experience Portal"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Text Right */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              Delight, On Demand
            </h2>
            <p className="text-xl text-primary-dark/70 leading-relaxed mb-6">
              Guests get digital access to every service—minibar refills, late checkout, spa bookings—on their terms. 
              Your team delivers at record speed, your reviews soar.
            </p>
            <a href="/products" className="inline-block text-accent-emerald font-semibold text-lg hover:underline">
              Explore Guest Features →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
