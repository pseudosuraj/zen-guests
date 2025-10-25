'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NewHero() {
  return (
    <section className="min-h-[90vh] flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 text-primary-blue leading-tight">
            The End of<br />Hotel Chaos.
          </h1>
          <p className="text-xl md:text-2xl text-primary-blue/70 mb-10 leading-relaxed">
            Zen-Guests is the single OS that unifies your operations, unlocks hidden revenue, and delivers the 5-star digital experience your guests demand.
          </p>
          <a
            href="/pilot-program"
            className="inline-block px-10 py-5 rounded-lg font-bold text-lg text-white bg-accent-gold
                       hover:bg-accent-gold/90 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Join the Pilot Program
          </a>
        </motion.div>

        {/* Right Column - Floating Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden border-2 border-border-soft bg-card-bg shadow-2xl"
          >
            <Image
              src="/images/dashboard-hero.png"
              alt="Zen-Guests Dashboard"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
