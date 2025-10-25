'use client'
import Image from 'next/image'

export default function ProblemSolutionSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-7">
          You're Losing Revenue and Reputation in the Details.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Card 1: High OTA Commissions */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/problem-chaos.png"
                alt="High OTA Commissions"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">High OTA Commissions</h3>
            <p className="text-gray-700">
              High dependency on OTAs eats into your profits, while direct booking tools are often too complex or expensive.
            </p>
          </div>

          {/* Card 2: Operational Chaos */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/problem-leakage.png"
                alt="Front Desk Chaos"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Front Desk Chaos</h3>
            <p className="text-gray-700">
              Guest requests via calls and WhatsApp create confusion, leading to slow service and negative online reviews.
            </p>
          </div>

          {/* Card 3: Revenue Leakage */}
          <div className="bg-white p-8 rounded-xl shadow flex flex-col items-center border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Image
                src="/images/problem-review.png"
                alt="Revenue Leakage"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
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
