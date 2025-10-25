'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const features = [
  {
    title: "Capture Every Rupee",
    desc: "Launch up-sells instantly. Track every order. Maximize revenue with your own In-House Marketplace.",
    img: "/images/revenue-mockup.png",
    reverse: false,
  },
  {
    title: "Peak Productivity",
    desc: "Unified dashboard for every department. No more WhatsApp chaos or lost tasks. Real-time assignment and tracking.",
    img: "/images/operations-mockup.png",
    reverse: true,
  },
  {
    title: "Delight Every Guest",
    desc: "Guests access minibar, room service, spa bookings instantly on their phone. Your team delivers at record speed.",
    img: "/images/guest-mockup.png",
    reverse: false,
  },
];

function FeatureCard({ title, desc, img, reverse }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-16 items-center mb-32 ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={reverse ? 'md:order-2' : ''}
      >
        <div className="rounded-3xl overflow-hidden border border-border-soft bg-card-bg shadow-2xl">
          <Image
            src={img}
            alt={title}
            width={700}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={reverse ? 'md:order-1' : ''}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          {title}
        </h2>
        <p className="text-xl text-text-primary/70 leading-relaxed">
          {desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function InteractiveShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  )
}
