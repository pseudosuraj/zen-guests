"use client";
import { motion } from "framer-motion";
import { Phone, Smartphone } from "lucide-react";

export default function ProblemSolutionSection() {
  return (
    <section className="bg-white py-24 px-4">
      <h2 className="text-2xl md:text-3xl text-center font-bold mb-14 text-gray-900">
        The Indian Hospitality Market Suffers from a 'Two-Guest Crisis.'
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Panel - Problem */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl bg-purple-50 p-10 shadow-md flex flex-col items-center"
        >
          <Phone className="w-10 h-10 mb-4 text-purple-700" />
          <div className="font-bold text-lg mb-2">The Offline Guest</div>
          <p className="text-gray-700">
            Your front desk is tied up with phone calls for basic requests, leading to staff burnout and chaotic operations.
          </p>
        </motion.div>
        {/* Right Panel - Solution */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-xl bg-blue-50 p-10 shadow-md flex flex-col items-center"
        >
          <Smartphone className="w-10 h-10 mb-4 text-blue-700" />
          <div className="font-bold text-lg mb-2">The Digital Guest</div>
          <p className="text-gray-700">
            Zen-Guests brings all guest needs into one beautiful digital portal, freeing your staff and unlocking new revenue from every single booking.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
