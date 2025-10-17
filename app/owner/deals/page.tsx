import { prisma } from "@/lib/prisma"
import DealManagerClient from "./DealManagerClient"

// For development, use a known hotelId (replace with your real hotel ID)
const hotelId = "demo-hotel-123" // <--- change to your hotel ID if different

export default async function DealManagerPage() {
  // Fetch deals from the database
  const deals = await prisma.deal.findMany({
    where: { hotelId },
    orderBy: { createdAt: "desc" }
  })

  // Pre-format date fields as display strings
  const cleanDeals = deals.map(deal => ({
    ...deal,
    createdAt: deal.createdAt.toLocaleDateString("en-IN"),
    updatedAt: deal.updatedAt.toLocaleDateString("en-IN"),
  }))

  // Pass to client component
  return <DealManagerClient initialDeals={cleanDeals} hotelId={hotelId} />
}
