'use client'
import Image from "next/image"
import { ReactNode } from "react"

interface FeatureSectionProps {
  reverse?: boolean
  title: string
  subtitle: string
  img: string
  featureList: ReactNode
  outcomeIcon: ReactNode
  outcomeText: string
}

export default function FeatureSection({
  reverse = false,
  title,
  subtitle,
  img,
  featureList,
  outcomeIcon,
  outcomeText,
}: FeatureSectionProps) {
  return (
    <section className="py-16">
      <div className={`max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 px-6 ${reverse ? "md:flex-row-reverse" : ""}`}>
        {/* Text */}
        <div className="flex-1">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-primary">{title}</h2>
          <p className="text-lg text-primary/80 mb-5">{subtitle}</p>
          <div className="mb-5">{featureList}</div>
          {/* Outcome block */}
          <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-5 py-3 shadow-sm w-fit">
            <span className="text-accent-green">{outcomeIcon}</span>
            <span className="font-semibold text-primary">{outcomeText}</span>
          </div>
        </div>
        {/* Image in device mockup */}
        <div className="flex-1 flex justify-center">
          <div className="rounded-2xl shadow-xl border border-gray-200 bg-gray-100 overflow-hidden" style={{ width: 370, minHeight: 510 }}>
            {/* Simple browser/device header */}
            <div className="flex items-center gap-2 h-10 px-4 border-b border-gray-200 bg-white">
              <span className="h-3 w-3 rounded-full bg-gray-300 inline-block" />
              <span className="h-3 w-3 rounded-full bg-gray-300 inline-block" />
              <span className="h-3 w-3 rounded-full bg-gray-300 inline-block" />
            </div>
            <div style={{ minHeight: 400, background: "#f5f5f5" }}>
              <Image
                src={img}
                alt={title}
                className="w-full h-auto object-cover"
                width={370}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
