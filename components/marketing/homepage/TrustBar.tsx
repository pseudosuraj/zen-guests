'use client'
import { MapPin, Users, ShieldCheck } from 'lucide-react'

export default function TrustBar() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
        {/* Column 1 */}
        <div className="flex flex-col items-center">
          <MapPin className="w-10 h-10 text-accent-green mb-3" />
          <span className="font-semibold text-primary text-lg">
            Built Exclusively for the Indian Market.
          </span>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col items-center">
          <Users className="w-10 h-10 text-accent-green mb-3" />
          <span className="font-semibold text-primary text-lg">
            Backed by a Team of Hospitality Experts.
          </span>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-10 h-10 text-accent-green mb-3" />
          <span className="font-semibold text-primary text-lg">
            The Future-Proof OS for Modern Hoteliers.
          </span>
        </div>
      </div>
    </section>
  )
}
