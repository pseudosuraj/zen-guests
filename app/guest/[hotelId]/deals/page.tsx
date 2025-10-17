import { prisma } from "@/lib/prisma";
import DealsListClient from "./DealsListClient";

// Server component: fetch data, pass to client component for interactivity.
type Props = {
  params: {
    hotelId: string;
  }
}

export default async function GuestDealsPage({ params }: Props) {
  const hotelId = params.hotelId;
  const deals = await prisma.deal.findMany({
    where: { hotelId },
    orderBy: { createdAt: "desc" }
  });

  const cleanDeals = deals.map(deal => ({
    ...deal,
    createdAt: deal.createdAt.toLocaleDateString("en-IN"),
  }));

  // For now, just use sample values (replace with real data source)
  const roomNumber = "101";
  const guestName = "Guest Portal User";

  return (
    <DealsListClient
      deals={cleanDeals}
      hotelId={hotelId}
      roomNumber={roomNumber}
      guestName={guestName}
    />
  );
}
