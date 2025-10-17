import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get('hotelId');
    const status = searchParams.get('status');

    const tasks = await prisma.serviceTask.findMany({
      where: {
        ...(hotelId && { hotelId }),
        ...(status && { status }),
      },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, hotelId, priority, roomNumber, assignedTo } = body;

    const task = await prisma.serviceTask.create({
      data: {
        title,
        description,
        hotelId,
        priority: priority || 'medium',
        roomNumber: roomNumber || null,
        assignedTo: assignedTo || null,
      },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
