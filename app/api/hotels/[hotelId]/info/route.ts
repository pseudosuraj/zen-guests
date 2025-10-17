import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await context.params;

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        name: true,
        brandColor: true,
        wifiName: true,
        wifiPassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel information' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ hotelId: string }> }
) {
  try {
    const { hotelId } = await context.params;
    const body = await request.json();

    const { name, brandColor, wifiName, wifiPassword } = body;

    const updatedHotel = await prisma.hotel.update({
      where: { id: hotelId },
      data: {
        ...(name && { name }),
        ...(brandColor && { brandColor }),
        ...(wifiName && { wifiName }),
        ...(wifiPassword && { wifiPassword }),
      },
    });

    return NextResponse.json(updatedHotel);
  } catch (error) {
    console.error('Error updating hotel info:', error);
    return NextResponse.json(
      { error: 'Failed to update hotel information' },
      { status: 500 }
    );
  }
}
