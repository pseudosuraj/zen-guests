'use client'
import { PhoneCall, IndianRupee, StarOff } from 'lucide-react'

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-16 text-center">
          You're Losing Revenue and Reputation in the Details.
        </h2>
        <div className="grid gap-8 md:grid-cols-3">

          {/* Card 1: Front Desk Chaos */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <PhoneCall className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">Front Desk Chaos</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              Guest requests via calls and WhatsApp create confusion, leading to slow service and negative online reviews.
            </p>
          </div>

          {/* Card 2: Revenue Leakage */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <IndianRupee className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">Revenue Leakage</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              Every guest order on an external app is a high-margin opportunity lost. This hidden leakage costs you lakhs every year.
            </p>
          </div>

          {/* Card 3: Negative Reviews */}
          <div className="bg-subtle-gray border border-border-gray rounded-2xl p-8 flex flex-col items-center
                          transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_25px_rgba(138,43,226,0.4)]">
            <StarOff className="w-12 h-12 text-text-primary mb-6" />
            <h3 className="text-xl font-bold text-text-primary mb-3">Negative Online Review</h3>
            <p className="text-text-secondary text-center leading-relaxed">
              A single bad review from a poorly handled request can damage your reputation and impact future bookings.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
