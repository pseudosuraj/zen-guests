'use client'
import { TrendingUp, ClipboardCheck, Smile } from 'lucide-react'

export default function FeatureHighlightsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-16 text-center">
          The All-in-One System for Revenue, Operations, and Guest Delight.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Revenue Engine */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <TrendingUp className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">The Revenue Engine</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              Launch and market your up-sells instantly with the built-in In-House Marketplace. Every guest sees only what's for them.
            </p>
          </div>

          {/* Card 2: Peak Productivity */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <ClipboardCheck className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">Peak Productivity</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              Unified dashboard for every department—no more sticky notes, WhatsApp chaos, or lost tasks. All tracked in real time.
            </p>
          </div>

          {/* Card 3: Delight, On Demand */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <Smile className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">Delight, On Demand</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              Guests get digital access to every service on their terms. Your team delivers at record speed, your reviews soar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
