'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AnimatedHero() {
  return (
    <section className="min-h-[90vh] flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-text-primary leading-tight">
            Replace Chaos with Calm.<br />
            Turn Stays into Revenue.
          </h1>
          <p className="text-xl md:text-2xl text-text-primary/70 mb-10 leading-relaxed">
            The all-in-one OS for Indian hotels that delights your guests and transforms your bottom line.
          </p>
          <div className="flex gap-4">
            <a
              href="/pilot-program"
              className="inline-block px-8 py-4 rounded-xl font-bold text-lg text-white bg-accent-terracotta
                         hover:bg-accent-terracotta/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join the Pilot Program
            </a>
            <a
              href="#learn-more"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-lg border-2 border-text-primary
                         text-text-primary hover:bg-text-primary hover:text-background transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Column - Animated Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden border-4 border-border-soft bg-card-bg shadow-2xl">
            {/* Dashboard mockup with animated elements */}
            <div className="p-8 space-y-6">
              
              {/* Animated KPIs */}
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-background p-4 rounded-xl"
                >
                  <div className="text-sm text-text-primary/60 mb-1">Revenue Today</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-2xl font-bold text-accent-terracotta"
                  >
                    ₹45,200
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-background p-4 rounded-xl"
                >
                  <div className="text-sm text-text-primary/60 mb-1">Orders</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="text-2xl font-bold text-text-primary"
                  >
                    127
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-background p-4 rounded-xl"
                >
                  <div className="text-sm text-text-primary/60 mb-1">Satisfaction</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-2xl font-bold text-text-primary"
                  >
                    9.4/10
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="h-48 bg-background rounded-xl flex items-end justify-around p-4"
              >
                {[60, 80, 75, 90, 85, 95, 100].map((height, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 1.3 + idx * 0.1 }}
                    className="bg-accent-terracotta w-8 rounded-t"
                  />
                ))}
              </motion.div>

              {/* Animated List Items */}
              <div className="space-y-3">
                {['Room 204 - Digital Minibar Order', 'Room 315 - Late Checkout', 'Room 102 - Spa Booking'].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 + idx * 0.15 }}
                    className="bg-background p-3 rounded-lg text-sm text-text-primary"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
