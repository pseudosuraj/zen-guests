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
    desc: "Every order is tracked on your dashboard, giving you a real-time view of the new, effortless revenue you're generating.",
  },
];

export default function HowItWorksSection() {
  return (
    <div className="w-full py-24 relative">
      <section className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-primary">
          Launch Your New Revenue Engine in 3 Simple Steps
          <span className="inline-block align-super text-accent-teal ml-2 text-5xl font-bold leading-none">·</span>
        </h2>

        {/* Continuous connecting line (desktop only) */}
        <div
          className="hidden md:block absolute left-1/2 top-40 bottom-10 w-1 border-l-4 border-dashed border-slate-300 z-0"
          style={{ transform: "translateX(-50%)" }}
        ></div>

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
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-slate-100 bg-white">
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
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent-teal-light text-accent-teal text-sm font-bold shadow">
                      {step.step}
                    </span>
                    <span className="font-bold text-3xl text-primary">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
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
