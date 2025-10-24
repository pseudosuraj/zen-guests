'use client'
import { TrendingUp, ClipboardCheck, Smile } from 'lucide-react'

export default function FeatureHighlightsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
          The All-in-One System for Revenue, Operations, and Guest Delight.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 h-14 w-14">
              <TrendingUp className="w-8 h-8 text-accent-green" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">The Revenue Engine</h3>
            <p className="text-gray-700 text-center">
              Launch and market your up-sells instantly with the built-in In-House Marketplace. Every guest sees only what’s for them, every booking is tracked, and every rupee is maximized.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 h-14 w-14">
              <ClipboardCheck className="w-8 h-8 text-accent-green" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">Peak Productivity</h3>
            <p className="text-gray-700 text-center">
              Unified dashboard for every department—no more sticky notes, WhatsApp chaos, or lost tasks. Assignment, progress, and results all tracked in real time.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 h-14 w-14">
              <Smile className="w-8 h-8 text-accent-green" />
            </span>
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
