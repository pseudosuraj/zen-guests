"use client";
import { Card } from "@/components/ui/card";
import { Gem, Workflow, SmilePlus } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  {
    icon: <Gem className="w-10 h-10 mb-4 text-purple-700" />,
    title: "The Revenue Engine",
    desc: "Go beyond simple upsells. Our AI intelligently bundles offers and even monetizes your local city through our unique Zen-Concierge marketplace.",
  },
  {
    icon: <Workflow className="w-10 h-10 mb-4 text-green-700" />,
    title: "The Operations Engine",
    desc: "Digitize your entire staff workflow. From guest requests to housekeeping tasks, manage everything from a single, beautiful dashboard.",
  },
  {
    icon: <SmilePlus className="w-10 h-10 mb-4 text-blue-700" />,
    title: "The Experience Engine",
    desc: "Give your guests the modern, seamless experience they expect. From digital check-in to in-portal chat, we make exceptional hospitality effortless.",
  },
];

export default function FeatureHighlightsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
        An Entire Ecosystem, Not Just an App.
      </h2>
      <div className="grid gap-10 max-w-6xl mx-auto md:grid-cols-3">
        {CARDS.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="flex"
          >
            <Card className="flex-1 rounded-2xl border shadow-xl p-8 flex flex-col items-center text-center bg-white hover:shadow-2xl transition duration-150">
              {card.icon}
              <div className="font-bold text-xl mb-2">{card.title}</div>
              <p className="text-gray-600">{card.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
