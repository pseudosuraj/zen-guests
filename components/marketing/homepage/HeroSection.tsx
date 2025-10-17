"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const headlineWords = [
  "Stop Managing Chaos.",
  "Start Engineering Profit.",
];

export default function HeroSection() {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    // Show second part after delay for word-by-word effect
    const timeout = setTimeout(() => setShowSecond(true), 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 min-h-[80vh] px-6 py-24">
      {/* Left Content: Professional headline/copy */}
      <div className="flex-1 max-w-xl mb-12 md:mb-0 md:mr-10">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.6 } },
          }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900"
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="block"
          >
            {headlineWords[0]}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={showSecond ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ type: "spring", duration: 1, delay: 1 }}
            className="block text-purple-700"
          >
            {headlineWords[1]}
          </motion.span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-xl md:text-2xl text-gray-700 mb-8"
        >
          Zen-Guests is the AI-powered OS for Indian hotels that turns guest requests into revenue and operational headaches into five-star reviews.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.7 }}
          className="flex gap-4 mt-3"
        >
          <Button
            size="lg"
            className="px-6 py-3 font-semibold text-lg bg-purple-700 hover:bg-purple-800 rounded-xl shadow transition
              hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-400"
          >
            Book a Live Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6 py-3 font-semibold text-lg rounded-xl border-gray-300 shadow transition
              hover:border-purple-400 hover:bg-purple-50 focus:scale-105"
          >
            See How It Works
          </Button>
        </motion.div>
      </div>
      {/* Right: Responsive Dashboard Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", duration: 1 }}
        className="flex-1 w-full md:max-w-lg flex justify-center items-center mt-10 md:mt-0"
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-100 bg-white relative w-[400px] h-[320px] flex items-center justify-center">
          <Image
            src="/images/dashboard-hero.png"
            alt="Zen-Guests Revenue Dashboard"
            fill
            className="object-cover rounded-3xl"
            priority
            sizes="(max-width: 768px) 90vw, 400px"
          />
        </div>
      </motion.div>
    </section>
  );
}
