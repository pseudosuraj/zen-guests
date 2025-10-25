"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const STEPS = [
  {
    img: "/images/how-it-works-scan.png",
    step: "Step 1",
    title: "Guest Scans & Taps",
    desc: "No app downloads. Guests access their private portal via a simple QR code to see all your services.",
  },
  {
    img: "/images/how-it-works-order.png",
    step: "Step 2",
    title: "Discover & Order",
    desc: "From your 'Digital Minibar' to room upgrades, guests can browse and pay for upsells with one tap via UPI.",
  },
  {
    img: "/images/how-it-works-profit.png",
    step: "Step 3",
    title: "You See the Profit",
    desc: "Every order is tracked on your dashboard, giving you a real-time view of the new revenue you're generating.",
  },
];

export default function HowItWorksSection() {
  return (
    <div className="w-full py-24 relative px-6 bg-background">
      <section className="relative max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20 text-primary-dark">
          Launch Your New Revenue Engine in 3 Simple Steps
        </h2>

        <div className="space-y-24 relative z-10">
          {STEPS.map((step, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="rounded-3xl overflow-hidden border border-border-soft bg-card-bg shadow-xl">
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                  <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full 
                                     bg-accent-blue/10 border border-accent-blue text-accent-blue text-sm font-bold">
                      {step.step}
                    </span>
                    <span className="font-bold text-2xl text-primary-dark">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-primary-dark/70 text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
