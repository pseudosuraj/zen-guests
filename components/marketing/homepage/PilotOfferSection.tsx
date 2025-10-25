'use client'
import { CheckCircle2 } from "lucide-react"

export default function PilotOfferSection() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto bg-card-bg border-2 border-accent-copper rounded-3xl p-8 md:p-12 shadow-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-4 md:mb-6">
          Become a Founding Partner Hotel
        </h2>
        <div className="text-lg md:text-xl text-primary-blue/70 mb-8 md:mb-10 leading-relaxed">
          We are inviting a limited number of innovative hotels in Hyderabad to join our exclusive pilot program.<br className="hidden md:inline" />
          Help shape the future of Indian hospitality and get exclusive benefits.
        </div>
        <ul className="mb-8 md:mb-10 space-y-3 md:space-y-4 text-left max-w-lg mx-auto">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-copper flex-shrink-0" size={24} />
            <span className="text-primary-blue text-base md:text-lg"><b>Free access</b> for the first 6 months.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-copper flex-shrink-0" size={24} />
            <span className="text-primary-blue text-base md:text-lg"><b>Dedicated onboarding and support.</b></span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-copper flex-shrink-0" size={24} />
            <span className="text-primary-blue text-base md:text-lg"><b>Direct influence</b> on our product roadmap.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-copper flex-shrink-0" size={24} />
            <span className="text-primary-blue text-base md:text-lg"><b>Be featured as an industry innovator.</b></span>
          </li>
        </ul>
        <a
          href="/pilot-program"
          className="inline-block bg-accent-copper text-white px-8 md:px-10 py-4 md:py-5 font-bold text-base md:text-lg rounded-lg
                     hover:bg-accent-copper/90 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Apply for a Limited Spot
        </a>
      </div>
    </section>
  )
}
