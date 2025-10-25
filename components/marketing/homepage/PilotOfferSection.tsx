'use client'
import { CheckCircle2 } from "lucide-react"

export default function PilotOfferSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto bg-card-bg border-2 border-accent-gold rounded-3xl p-12 shadow-2xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-blue mb-6">
          Become a Founding Partner Hotel
        </h2>
        <div className="text-xl text-primary-blue/70 mb-10 leading-relaxed">
          We are inviting a limited number of innovative hotels in Hyderabad to join our exclusive pilot program.<br className="hidden md:inline" />
          Help shape the future of Indian hospitality and get exclusive benefits.
        </div>
        <ul className="mb-10 space-y-4 text-left max-w-lg mx-auto">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-gold flex-shrink-0" size={24} />
            <span className="text-primary-blue text-lg"><b>Free access</b> for the first 6 months.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-gold flex-shrink-0" size={24} />
            <span className="text-primary-blue text-lg"><b>Dedicated onboarding and support.</b></span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-gold flex-shrink-0" size={24} />
            <span className="text-primary-blue text-lg"><b>Direct influence</b> on our product roadmap.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-gold flex-shrink-0" size={24} />
            <span className="text-primary-blue text-lg"><b>Be featured as an industry innovator.</b></span>
          </li>
        </ul>
        <a
          href="/pilot-program"
          className="inline-block bg-accent-gold text-white px-10 py-5 font-bold text-lg rounded-lg
                     hover:bg-accent-gold/90 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Apply for a Limited Spot
        </a>
      </div>
    </section>
  )
}
