'use client'
import Image from 'next/image'

export default function FeatureHighlightsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
          The All-in-One System for Revenue, Operations, and Guest Delight.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Revenue Engine */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/feature-revenue.png"
                alt="Revenue Engine"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">The Revenue Engine</h3>
            <p className="text-gray-700 text-center">
              Launch and market your up-sells instantly with the built-in In-House Marketplace. Every guest sees only what's for them, every booking is tracked, and every rupee is maximized.
            </p>
          </div>

          {/* Card 2: Peak Productivity */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/feature-ops.png"
                alt="Peak Productivity"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Peak Productivity</h3>
            <p className="text-gray-700 text-center">
              Unified dashboard for every department—no more sticky notes, WhatsApp chaos, or lost tasks. Assignment, progress, and results all tracked in real time.
            </p>
          </div>

          {/* Card 3: Delight, On Demand */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/feature-delight.png"
                alt="Delight On Demand"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Delight, On Demand</h3>
            <p className="text-gray-700 text-center">
              Guests get digital access to every service—minibar refills, late checkout, spa bookings—on their terms. Your team delivers at record speed, your reviews soar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
