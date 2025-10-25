'use client'
import { Percent, PhoneCall, IndianRupee } from 'lucide-react'

export default function ProblemSolutionSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-7">
          You're Losing Revenue and Reputation in the Details.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Card 1: High OTA Commissions */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-50 h-14 w-14">
              <Percent className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">High OTA Commissions</h3>
            <p className="text-gray-700">
              High dependency on OTAs eats into your profits, while direct booking tools are often too complex or expensive.
            </p>
          </div>

          {/* Card 2: Operational Chaos */}
          <div className="bg-green-50 p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 h-14 w-14">
              <PhoneCall className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">Front Desk Chaos</h3>
            <p className="text-gray-700">
              Guest requests via calls and WhatsApp create confusion, leading to slow service and negative online reviews.
            </p>
          </div>

          {/* Card 3: Revenue Leakage */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200">
            <span className="mb-4 inline-flex items-center justify-center rounded-full bg-green-50 h-14 w-14">
              <IndianRupee className="w-7 h-7 text-primary" />
            </span>
            <h3 className="text-xl font-bold text-primary mb-2">Revenue Leakage</h3>
            <p className="text-gray-700">
              Every guest order on an external app is a high-margin opportunity lost. This hidden leakage costs you lakhs every year.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
