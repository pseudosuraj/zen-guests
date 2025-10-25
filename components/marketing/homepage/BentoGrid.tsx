'use client'
import { PhoneCall, IndianRupee, StarOff } from 'lucide-react'

export default function BentoGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Card - Top (spans 3 columns) */}
          <div className="md:col-span-3 bg-card-bg border border-border-soft rounded-3xl p-12 
                          hover:scale-[1.02] transition-all duration-300 shadow-lg">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              The Hidden Costs of an Outdated Hotel.
            </h2>
            <p className="text-xl text-primary-dark/70 leading-relaxed">
              Every day without the right technology, you're losing revenue, reputation, and operational efficiency.
            </p>
          </div>

          {/* Small Card 1 */}
          <div className="bg-card-bg border border-border-soft rounded-3xl p-8 flex flex-col items-center text-center
                          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-accent-emerald/10 flex items-center justify-center mb-6">
              <PhoneCall className="w-8 h-8 text-accent-emerald" />
            </div>
            <h3 className="text-2xl font-bold text-primary-dark mb-3">Front Desk Chaos</h3>
            <p className="text-primary-dark/70 leading-relaxed">
              Guest requests via calls and WhatsApp create confusion, leading to slow service.
            </p>
          </div>

          {/* Small Card 2 */}
          <div className="bg-card-bg border border-border-soft rounded-3xl p-8 flex flex-col items-center text-center
                          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-accent-emerald/10 flex items-center justify-center mb-6">
              <IndianRupee className="w-8 h-8 text-accent-emerald" />
            </div>
            <h3 className="text-2xl font-bold text-primary-dark mb-3">Revenue Leakage</h3>
            <p className="text-primary-dark/70 leading-relaxed">
              Every guest order on an external app is a high-margin opportunity lost.
            </p>
          </div>

          {/* Small Card 3 */}
          <div className="bg-card-bg border border-border-soft rounded-3xl p-8 flex flex-col items-center text-center
                          hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-accent-emerald/10 flex items-center justify-center mb-6">
              <StarOff className="w-8 h-8 text-accent-emerald" />
            </div>
            <h3 className="text-2xl font-bold text-primary-dark mb-3">Negative Reviews</h3>
            <p className="text-primary-dark/70 leading-relaxed">
              Manual systems create inconsistent experiences that damage your reputation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
