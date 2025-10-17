"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.classList.add("animate-fadein");
    }
  }, []);

  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-24 px-4 flex flex-col md:flex-row items-center justify-center min-h-[80vh]">
      {/* Text Content */}
      <div ref={textRef} className="flex-1 max-w-xl mb-12 md:mb-0 md:mr-10 opacity-0 transition-opacity duration-1000">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          The OS for Ancillary Revenue.
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 mb-8">
          Zen-Guests is the AI-powered operating system for Indian hotels that transforms operational chaos into a high-margin profit engine. Stop leaving money on the table.
        </h2>
        <div className="flex gap-4">
          <Button className="px-6 py-3 text-lg bg-purple-700 hover:bg-purple-800 font-semibold rounded-xl shadow-xl transition focus:ring-2 focus:ring-purple-400">
            Book a Live Demo
          </Button>
          <Button variant="outline" className="px-6 py-3 text-lg border-gray-300 font-semibold rounded-xl shadow transition">
            See How It Works
          </Button>
        </div>
      </div>
      {/* Visual */}
      <div className="flex-1 flex justify-center">
        <div className="relative rounded-3xl overflow-hidden shadow-xl w-[400px] h-[320px] flex items-center justify-center bg-white">
          <Image
            src="/hotel-dashboard-stock.jpg"
            fill
            alt="Zen-Guests dashboard visual"
            style={{ objectFit: "cover" }}
            className="rounded-3xl"
          />
        </div>
      </div>
      {/* Animation Keyframes */}
      <style>{`
        .animate-fadein {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
