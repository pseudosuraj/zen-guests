import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DealsListClient from './DealsListClient';

interface Props {
  params: { hotelId: string };
  searchParams: { roomNumber?: string; guestName?: string };
}

export default async function DealsPage({ params, searchParams }: Props) {
  const { hotelId } = await params;
  const { roomNumber = '', guestName = '' } = await searchParams;

  // Verify hotel exists
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });

  if (!hotel) {
    notFound();
  }

  // Fetch deals
  const deals = await prisma.deal.findMany({
    where: {
      hotelId,
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Serialize dates to strings for client component
  const serializedDeals = deals.map(deal => ({
    id: deal.id,
    title: deal.title,
    description: deal.description,
    price: deal.price,
    createdAt: deal.createdAt.toISOString(),
    updatedAt: deal.updatedAt.toISOString(),
    imageUrl: deal.imageUrl,
    category: deal.category,
    isRegular: deal.isRegular,
    isActive: deal.isActive,
  }));

  return (
    <DealsListClient 
      deals={serializedDeals} 
      hotelId={hotelId} 
      hotelName={hotel.name}
      roomNumber={roomNumber}
      guestName={guestName}
    />
  );
}
