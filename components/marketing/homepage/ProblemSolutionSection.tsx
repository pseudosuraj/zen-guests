'use client'
import { PhoneCall, IndianRupee, StarOff } from 'lucide-react'

export default function ProblemSolutionSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-7">
          You're Losing Revenue and Reputation in the Details.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Card 1: Front Desk Chaos */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-accent-teal-light mb-4">
              <PhoneCall className="w-7 h-7 text-accent-teal" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Front Desk Chaos</h3>
            <p className="text-gray-700">
              Guest requests via calls and WhatsApp create confusion, leading to slow service and negative online reviews.
            </p>
          </div>

          {/* Card 2: Revenue Leakage */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-accent-teal-light mb-4">
              <IndianRupee className="w-7 h-7 text-accent-teal" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Revenue Leakage</h3>
            <p className="text-gray-700">
              Every guest order on an external app is a high-margin opportunity lost. This hidden leakage costs you lakhs every year.
            </p>
          </div>

          {/* Card 3: Negative Online Review */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-accent-teal-light mb-4">
              <StarOff className="w-7 h-7 text-accent-teal" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Negative Online Review</h3>
            <p className="text-gray-700">
              A single bad review from a poorly handled request can damage your reputation and impact future bookings. Manual systems create inconsistent experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
