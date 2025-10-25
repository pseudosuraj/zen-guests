'use client'
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PilotOfferSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
          Become a Founding Partner Hotel
        </h2>
        <div className="text-lg text-primary font-medium mb-6">
          We are inviting a limited number of innovative hotels in Hyderabad to join our exclusive pilot program.<br className="hidden md:inline" />
          Help shape the future of Indian hospitality and get exclusive benefits.
        </div>
        <ul className="mb-7 space-y-3 text-left max-w-lg mx-auto">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-teal flex-shrink-0" size={22} />
            <span className="text-primary"><b>Free access</b> for the first 6 months.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-teal flex-shrink-0" size={22} />
            <span className="text-primary"><b>Dedicated onboarding and support.</b></span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-teal flex-shrink-0" size={22} />
            <span className="text-primary"><b>Direct influence</b> on our product roadmap.</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-accent-teal flex-shrink-0" size={22} />
            <span className="text-primary"><b>Be featured as an industry innovator.</b></span>
          </li>
        </ul>
        <Button className="bg-accent-teal text-white px-7 py-3 font-bold text-lg hover:bg-accent-teal/90 transition shadow-lg">
          Apply for a Limited Spot
        </Button>
      </div>
    </section>
  )
}
