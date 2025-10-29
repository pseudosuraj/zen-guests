'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const chaosOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const calmOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative min-h-screen py-32">
      {/* Chaos State */}
      <motion.div
        style={{ opacity: chaosOpacity }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="relative w-full max-w-6xl h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Chaotic background image placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
            {/* You can replace this with an actual image: */}
            {/* <img src="/images/chaotic-desk.jpg" alt="Chaotic front desk" className="w-full h-full object-cover" /> */}
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>
          
          {/* Overlaid text */}
          <div className="relative z-10 flex items-center justify-center h-full px-8">
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Your hotel is stuck in a sea of phone calls, logbooks, and a dozen different apps.
            </motion.h2>
          </div>
        </div>
      </motion.div>

      {/* Calm State - The Product */}
      <motion.div
        style={{ opacity: calmOpacity }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              This is the <span className="text-primary-violet">calm</span>.
            </h2>
            <p className="text-2xl md:text-3xl text-text-secondary">
              One single OS for everything.
            </p>
          </div>

          {/* Animated Dashboard Mockup */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl border border-border-soft p-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Dashboard Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">Today's Dashboard</h3>
              <p className="text-text-secondary">Welcome back, here's what's happening</p>
            </div>

            {/* Revenue Cards with counting animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <RevenueCard
                label="Today's Revenue"
                amount={45280}
                prefix="₹"
                color="bg-primary-violet"
              />
              <RevenueCard
                label="Upsell Revenue"
                amount={12500}
                prefix="₹"
                color="bg-green-500"
              />
              <RevenueCard
                label="Active Guests"
                amount={34}
                prefix=""
                color="bg-blue-500"
              />
            </div>

            {/* Task List with check-off animation */}
            <div className="bg-primary-violet-light rounded-2xl p-6">
              <h4 className="text-xl font-semibold text-text-primary mb-4">Today's Tasks</h4>
              <div className="space-y-3">
                <TaskItem label="Check-in Room 204" delay={0.2} />
                <TaskItem label="Deliver breakfast to Room 301" delay={0.4} />
                <TaskItem label="Process checkout for Room 105" delay={0.6} />
                <TaskItem label="Restock minibar in Room 210" delay={0.8} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// Revenue Card with counting animation
function RevenueCard({ label, amount, prefix, color }: { label: string; amount: number; prefix: string; color: string }) {
  return (
    <motion.div
      className="bg-white border border-border-soft rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-12 h-12 ${color} rounded-lg mb-4`} />
      <p className="text-text-secondary text-sm mb-2">{label}</p>
      <motion.p className="text-3xl font-bold text-text-primary">
        <CountUp end={amount} prefix={prefix} />
      </motion.p>
    </motion.div>
  )
}

// Task Item with check-off animation
function TaskItem({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-white rounded-lg p-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="w-6 h-6 rounded border-2 border-primary-violet flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
      >
        <motion.svg
          className="w-4 h-4 text-primary-violet"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.7 }}
        >
          <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>
      <span className="text-text-primary">{label}</span>
    </motion.div>
  )
}

// Count up animation component
function CountUp({ end, prefix }: { end: number; prefix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        setHasAnimated(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end, hasAnimated])

  return (
    <span>
      {prefix}{count.toLocaleString('en-IN')}
    </span>
  )
}
