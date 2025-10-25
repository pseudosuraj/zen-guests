'use client'
import { QrCode, Smartphone, TrendingUp, Smile } from 'lucide-react'

const STEPS = [
  {
    icon: QrCode,
    title: "Guest Scans QR",
    desc: "No app download. Instant access to your digital services.",
  },
  {
    icon: Smartphone,
    title: "Browse & Order",
    desc: "From minibar to spa, guests order with one tap.",
  },
  {
    icon: TrendingUp,
    title: "Track Revenue",
    desc: "Real-time dashboard shows every rupee earned.",
  },
  {
    icon: Smile,
    title: "Delight Guests",
    desc: "Fast service leads to 5-star reviews.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2 className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-20 text-center">
          Four Steps to Effortless Operations.
        </h2>
        
        {/* Four-Step Horizontal Layout */}
        <div className="relative">
          {/* Connecting Dotted Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dotted border-border-soft z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-border-soft border-2 border-accent-terracotta 
                                  flex items-center justify-center mb-6">
                    <Icon className="w-12 h-12 text-accent-terracotta" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
