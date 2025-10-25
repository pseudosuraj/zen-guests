'use client'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-27393-large.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-text-primary leading-tight">
            Stop Managing Chaos.<br />
            Start Engineering Profit.
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-10 leading-relaxed">
            The All-in-One Revenue & Experience OS for India's Modern Hotels.
          </p>
          <div className="flex gap-4">
            <a
              href="/pilot-program"
              className="group relative inline-block px-8 py-4 rounded-xl font-bold text-lg text-white
                         bg-gradient-to-r from-accent-purple to-purple-600 
                         hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] 
                         transition-all duration-300"
            >
              Join the Pilot Program
            </a>
            <a
              href="#learn-more"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-lg border-2 border-border-gray
                         text-text-primary hover:border-accent-purple hover:bg-subtle-gray transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
