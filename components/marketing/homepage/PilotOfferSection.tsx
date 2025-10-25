'use client'
import { CheckCircle2 } from "lucide-react"

export default function PilotOfferSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto bg-card-bg border border-border-soft rounded-3xl p-12 shadow-xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Become a Founding Partner Hotel
        </h2>
        <div className="text-xl text-text-primary/70 mb-10 leading-relaxed">
          We are inviting a limited number of innovative hotels in Hyderabad to join our exclusive pilot program.<br className="hidden md:inline" />
          Help shape the future of Indian hospitality and get exclusive benefits.
        </div>
        <ul className="mb-10 space-y-4 text-left max-w-lg mx-auto">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-terracotta flex-shrink-0" size={24} />
            <span className="text-text-primary text-lg"><b>Free access</b> for the first 6 months.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-terracotta flex-shrink-0" size={24} />
            <span className="text-text-primary text-lg"><b>Dedicated onboarding and support.</b></span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-terracotta flex-shrink-0" size={24} />
            <span className="text-text-primary text-lg"><b>Direct influence</b> on our product roadmap.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-terracotta flex-shrink-0" size={24} />
            <span className="text-text-primary text-lg"><b>Be featured as an industry innovator.</b></span>
          </li>
        </ul>
        <a
          href="/pilot-program"
          className="inline-block bg-accent-terracotta text-white px-10 py-4 font-bold text-lg rounded-xl
                     hover:bg-accent-terracotta/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Apply for a Limited Spot
        </a>
      </div>
    </section>
  )
}
