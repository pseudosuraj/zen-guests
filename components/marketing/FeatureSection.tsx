"use client";
import { Gem, Workflow, SmilePlus } from "lucide-react";
import { useRef, useEffect } from "react";

const FEATURES = [
  {
    icon: <Gem className="w-10 h-10 text-purple-700" />,
    title: "The Revenue Engine",
    desc: "Go beyond simple upsells. Our AI intelligently bundles offers and even monetizes your local city through our unique Zen-Concierge marketplace.",
  },
  {
    icon: <Workflow className="w-10 h-10 text-green-700" />,
    title: "The Operations Engine",
    desc: "Digitize your entire staff workflow. From guest requests to housekeeping tasks, manage everything from a single, beautiful dashboard.",
  },
  {
    icon: <SmilePlus className="w-10 h-10 text-blue-700" />,
    title: "The Experience Engine",
    desc: "Give your guests the modern, seamless experience they expect. From digital check-in to in-portal chat, we make exceptional hospitality effortless.",
  },
];

export default function FeatureSection() {
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const handler = () => {
      cardRefs.forEach((ref, idx) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            ref.current.classList.add("animate-cardfadein");
          }
        }
      });
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-14">
        An Entire Ecosystem, Not Just an App.
      </h2>
      <div className="grid gap-10 max-w-6xl mx-auto md:grid-cols-3">
        {FEATURES.map((feat, idx) => (
          <div
            key={idx}
            ref={cardRefs[idx]}
            className="bg-white rounded-2xl border shadow p-8 flex flex-col items-center text-center opacity-0 translate-y-8 transition-all duration-700"
          >
            {feat.icon}
            <div className="font-bold text-xl mb-2 mt-2">{feat.title}</div>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </div>
      <style>{`
        .animate-cardfadein {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
