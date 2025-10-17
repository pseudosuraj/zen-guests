"use client"
import { useState } from "react"

// Explicit type for a deal
type Deal = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  category: string | null;
  isRegular: boolean;
  isActive: boolean;
}

// Explicit props type
interface DealsListClientProps {
  deals: Deal[];
  hotelId: string;
  hotelName: string;
  roomNumber: string;
  guestName: string;
}

export default function DealsListClient({
  deals,
  hotelId,
  hotelName,
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
      <h1>Deals at {hotelName}</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <ul>
        {deals.map((deal: Deal) => (
          <li key={deal.id}>
            {deal.imageUrl && (
              <img src={deal.imageUrl} alt={deal.title} style={{ width: '200px' }} />
            )}
            <strong>{deal.title}</strong> — ₹{deal.price}
            {deal.category && <span> ({deal.category})</span>}
            <div>{deal.description}</div>
            <div>Created: {new Date(deal.createdAt).toLocaleDateString()}</div>
            <button onClick={() => buyDeal(deal.id)}>Get this Deal</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
