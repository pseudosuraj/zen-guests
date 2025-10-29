'use client'

import { motion } from 'framer-motion'

export default function FeatureShowcase() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
            Your Complete Revenue &
            <br />
            <span className="text-primary-violet">Experience Engine</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            Every tool you need to maximize profit and delight guests—unified in one powerful platform.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Feature 1 - Digital Minibar */}
          <motion.div
            className="lg:col-span-2 lg:row-span-2 bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary-violet rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-3">Digital Minibar & Room Service</h3>
              <p className="text-lg text-text-secondary mb-6">
                Let guests order snacks, drinks, and meals directly from their phone. Zero phone calls, instant orders, instant revenue.
              </p>
            </div>
            {/* Mockup placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-primary-violet-light to-purple-100 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-text-secondary text-lg">Digital Minibar Screenshot</span>
            </div>
          </motion.div>

          {/* Small Feature 1 - Smart Upsells */}
          <motion.div
            className="bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">Smart Upsells</h3>
            <p className="text-text-secondary">
              Automatically offer upgrades, early check-ins, late checkouts at the perfect moment.
            </p>
          </motion.div>

          {/* Small Feature 2 - Task Management */}
          <motion.div
            className="bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">Task Management</h3>
            <p className="text-text-secondary">
              Assign, track, and complete housekeeping and maintenance tasks in real-time.
            </p>
          </motion.div>

          {/* Medium Feature - Guest Portal */}
          <motion.div
            className="lg:col-span-2 bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">Guest Experience Portal</h3>
                <p className="text-text-secondary">
                  Give guests a branded mobile experience for check-in, concierge, room controls, and checkout.
                </p>
              </div>
              <div className="w-full md:w-48 h-48 bg-gradient-to-br from-purple-100 to-primary-violet-light rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-text-secondary text-sm">Portal Screenshot</span>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 3 - Analytics */}
          <motion.div
            className="bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">Revenue Analytics</h3>
            <p className="text-text-secondary">
              Real-time dashboards showing revenue, occupancy, and performance metrics that matter.
            </p>
          </motion.div>

          {/* Small Feature 4 - Integrations */}
          <motion.div
            className="bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">Seamless Integrations</h3>
            <p className="text-text-secondary">
              Works with your existing PMS, payment gateways, and booking engines.
            </p>
          </motion.div>

          {/* Small Feature 5 - Support */}
          <motion.div
            className="bg-white border border-border-soft rounded-3xl p-8 hover:bg-primary-violet-light hover:scale-105 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">24/7 Support</h3>
            <p className="text-text-secondary">
              Dedicated support team available round the clock to help your staff and guests.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
