'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PilotOfferSection() {
  return (
    <section id="pilot-program" className="py-32 px-6 bg-gradient-to-br from-primary-violet via-purple-600 to-primary-violet relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          className="inline-block mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30">
            🚀 Limited Founding Partner Slots Available
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Become a Founding Partner
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join our exclusive pilot program and get lifetime benefits as one of our founding hotel partners. Shape the future of Indian hospitality with us.
        </motion.p>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-3">Lifetime Discount</h3>
            <p className="text-white/80">Lock in 50% off forever as a founding partner</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Priority Support</h3>
            <p className="text-white/80">Dedicated account manager and 24/7 priority assistance</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-3">Early Access</h3>
            <p className="text-white/80">Get new features first and influence our product roadmap</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-violet px-12 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Apply for Pilot Program
          </Link>
          <Link
            href="/pricing"
            className="inline-block bg-transparent border-2 border-white text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          className="text-white/70 mt-12 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          ✓ No Setup Fees &nbsp;&nbsp;•&nbsp;&nbsp; ✓ No Long-term Contracts &nbsp;&nbsp;•&nbsp;&nbsp; ✓ Cancel Anytime
        </motion.p>
      </div>
    </section>
  )
}
