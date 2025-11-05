import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DealsListClient from './DealsListClient';

// Remove explicit Props interface
export default async function DealsPage({ params, searchParams }: any) {
  const hotelId = params.hotelId;

  const roomNumber = searchParams?.roomNumber ?? '';
  const guestName = searchParams?.guestName ?? '';

  const hotel = await prisma.hotel.findUnique({ where: { id: hotelId }});
  if (!hotel) notFound();

  const deals = await prisma.deal.findMany({
    where: { hotelId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  const serializedDeals = deals.map((deal: any) => ({
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
