"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type FeatureSectionProps = {
  imageSrc: string;
  title: string;
  description: string;
  features: string[];
  reversed?: boolean;
};

export default function FeatureSection({
  imageSrc,
  title,
  description,
  features,
  reversed = false
}: FeatureSectionProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className={
        `max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center` +
        (reversed ? " md:flex-row-reverse" : "")
      }>
        <motion.div
          initial={{ x: reversed ? 80 : -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border bg-gradient-to-br from-purple-50 via-blue-100 to-white">
            <Image
              src={imageSrc}
              alt={title}
              width={500}
              height={340}
              className="object-cover w-[340px] md:w-[500px] h-[240px] md:h-[340px]"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: reversed ? -80 : 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex flex-col justify-center"
        >
          <div className="mb-5 font-bold text-2xl md:text-3xl text-gray-900">
            {title}
          </div>
          <div className="mb-6 text-base md:text-lg text-gray-600">
            {description}
          </div>
          <ul className="space-y-5 mt-4">
            {features.map(feature => (
              <li key={feature} className="flex items-center gap-3 text-lg text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
