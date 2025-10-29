'use client'

import { motion } from 'framer-motion'

export default function Mission() {
  return (
    <section className="py-32 px-6 bg-primary-violet-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Image placeholder - replace with actual founder photo */}
              <div className="w-full h-full bg-gradient-to-br from-primary-violet to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-violet opacity-20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-400 opacity-20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Built for India,
              <br />
              <span className="text-primary-violet">By Indians.</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed">
              <p>
                We started Zen-Guests because we saw India's hotel owners drowning in chaos—juggling multiple apps, missing revenue opportunities, and struggling to deliver the modern experience today's guests expect.
              </p>
              <p>
                Our mission is simple: <span className="font-semibold text-text-primary">empower every hotel owner in India with the technology to compete, profit, and delight.</span>
              </p>
              <p>
                We're not just building software. We're building a movement to transform Indian hospitality—one hotel at a time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-primary-violet mb-2">100%</div>
                <div className="text-sm text-text-secondary">Made in India</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-violet mb-2">24/7</div>
                <div className="text-sm text-text-secondary">Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-violet mb-2">₹0</div>
                <div className="text-sm text-text-secondary">Setup Fees</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
