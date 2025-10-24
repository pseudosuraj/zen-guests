'use client'
import { PhoneCall, IndianRupee, StarOff } from 'lucide-react'

export default function ProblemSolutionSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-7">
          Sound Familiar? Your Hotel Deserves Better.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Card 1: Operational Chaos */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-50 h-14 w-14">
              <PhoneCall className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">The Late-Night Call for Water</h3>
            <p className="text-gray-700">
              Guest requests come through calls, WhatsApp, and in-person, creating chaos for your front desk and leading to slow service and frustrated guests.
            </p>
          </div>
          {/* Card 2: Revenue Leakage */}
          <div className="bg-green-50 p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 h-14 w-14">
              <IndianRupee className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">The Lost Commissions</h3>
            <p className="text-gray-700">
              Every time a guest orders from an outside app, you lose a high-margin revenue opportunity. This 'leaked' revenue adds up to lakhs per year.
            </p>
          </div>
          {/* Card 3: Reputation Damage */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-50 h-14 w-14">
              <StarOff className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">The Negative Online Review</h3>
            <p className="text-gray-700">
              A single bad review from a poorly handled request can damage your reputation and impact future bookings. Manual systems create inconsistent experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
