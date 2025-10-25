'use client'
import { TrendingUp, ClipboardCheck, Smile, BarChart3, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: "The Revenue Engine",
    desc: "Launch up-sells instantly. Track every order. Maximize revenue with your In-House Marketplace.",
  },
  {
    icon: ClipboardCheck,
    title: "The Operations Hub",
    desc: "Unified dashboard for every department. Real-time assignment and tracking. No more chaos.",
  },
  {
    icon: Smile,
    title: "The Guest Experience",
    desc: "Guests access minibar, spa, room service instantly on their phone. Seamless digital delight.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Live revenue tracking, guest satisfaction scores, and operational insights at your fingertips.",
  },
  {
    icon: Zap,
    title: "Instant Activation",
    desc: "Setup in one day. No complex PMS integration needed for pilot. Start generating revenue immediately.",
  },
  {
    icon: Shield,
    title: "Built for India",
    desc: "UPI payments, local workflows, and support tailored to Indian hotels. Not a foreign template.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 md:py-24 px-6 bg-card-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-blue mb-12 md:mb-16 text-center">
          An OS Designed for Total Control.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-background border border-border-soft rounded-2xl p-6 md:p-8 
                           hover:shadow-2xl hover:border-accent-copper transition-all duration-300"
              >
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-accent-copper/10 flex items-center justify-center mb-4 md:mb-6">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent-copper" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary-blue mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-blue/70 leading-relaxed text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
