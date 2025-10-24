'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RevenueCalculator() {
  const [rooms, setRooms] = useState('')
  const [rate, setRate] = useState('')
  const [result, setResult] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder calculation logic
    const nRooms = Number(rooms)
    const nRate = Number(rate)
    if (!nRooms || !nRate) {
      setResult("Please enter valid numbers!")
      return
    }
    setResult("Estimate coming soon...") // Placeholder
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8">
          How Much Ancillary Revenue Are You Leaving on the Table?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:justify-center">
            <Input
              type="number"
              placeholder="Average number of rooms in your hotel?"
              value={rooms}
              min={1}
              className="w-72"
              onChange={e => setRooms(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Average daily room rate (₹)?"
              value={rate}
              min={1}
              className="w-72"
              onChange={e => setRate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="bg-accent-green px-8 py-3 text-lg font-bold w-72">
            Calculate My Potential
          </Button>
          {result && (
            <div className="mt-4 text-primary font-semibold text-lg">
              {result}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
