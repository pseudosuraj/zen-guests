'use client'

import Image from 'next/image'

export default function FounderStory() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Founder Image */}
        <div className="flex justify-center md:justify-end">
          <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
            <Image
              src="/images/founder-photo.jpg"
              alt="Zen-Guests Founder"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        {/* Story Text */}
        <div>
          <div className="text-accent-green text-sm font-bold mb-2 uppercase tracking-widest">
            Our Story
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
            A Founder’s Journey
          </h2>
          <p className="text-lg text-primary/80 leading-relaxed">
            The idea for Zen-Guests was born on a bus ride through India. I saw a world of people living on their smartphones, demanding one-tap convenience, and our entire hospitality industry stuck in the past. Why are hotels and PGs still running on ringing phones and manual processes while giants like Zomato and Swiggy are capturing all the value?
            <br /><br />
            We founded Zen-Guests to solve this. Our mission is to empower every hotel owner in India with the tools to compete, to profit, and to deliver the world-class hospitality they are known for.
          </p>
        </div>
      </div>
    </section>
  )
}
