"use client"
import { useState } from "react"

// Explicit type for a deal
type Deal = {
  id: string,
  title: string,
  description: string | null,
  price: number,
  createdAt: string
}

// Explicit props type
interface DealsListClientProps {
  deals: Deal[];
  hotelId: string;
  roomNumber: string;
  guestName: string;
}

export default function DealsListClient({
  deals,
  hotelId,
  roomNumber,
  guestName
}: DealsListClientProps) {
  const [message, setMessage] = useState<string>("")

  async function buyDeal(dealId: string) {
    const res = await fetch("/api/guest/buy-deal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId, hotelId, roomNumber, guestName }),
    })
    if (res.ok) setMessage("Request sent! Our staff will message you in chat when fulfilled.")
    else setMessage("Sorry, your request could not be sent.")
  }

  return (
    <div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <ul>
        {deals.map((deal: Deal) => (
          <li key={deal.id}>
            <strong>{deal.title}</strong> — ₹{deal.price}
            <div>{deal.description}</div>
            <div>Created: {deal.createdAt}</div>
            <button onClick={() => buyDeal(deal.id)}>Get this Deal</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
