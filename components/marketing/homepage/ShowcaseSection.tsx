'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const problems = [
  {
    title: "Front Desk Chaos",
    desc: "Manual requests, lost notes, slow responses.",
  },
  {
    title: "Leaked Commissions",
    desc: "Every OTA booking and external order costs you.",
  },
  {
    title: "Negative Reviews",
    desc: "Inconsistent service damages your reputation.",
  },
];

export default function ShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Part 1: The Problem */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-dark mb-8 leading-tight">
              Your Profit is Lost<br />in the Noise.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {problems.map((problem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-card-bg border border-border-soft rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-primary-dark mb-2">
                  {problem.title}
                </h3>
                <p className="text-primary-dark/70">
                  {problem.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 2: The Solution - Image with Floating Phone Mockup */}
        <div ref={ref} className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <Image
            src="/images/luxury-lobby.jpg"
            alt="Premium hotel environment"
            fill
            className="object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-primary-dark/40"></div>
          
          {/* Floating Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute right-12 bottom-12 z-10"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl overflow-hidden border-4 border-card-bg shadow-2xl"
              style={{ width: '280px' }}
            >
              <Image
                src="/images/guest-portal-phone.png"
                alt="Zen-Guests Guest Portal"
                width={280}
                height={560}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-2xl text-center text-white">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                The Digital Experience Your Guests Deserve.
              </h2>
              <p className="text-xl md:text-2xl">
                Seamless. Instant. Delightful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
