import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  try {
    const { taskId } = context.params;
    const body = await request.json();
    const { assignedTo } = body;

    const task = await prisma.serviceTask.update({
      where: { id: taskId },
      data: {
        assignedTo: assignedTo || null,
        updatedAt: new Date(),
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

    return NextResponse.json(task);
  } catch (error) {
    console.error('Error assigning task:', error);
    return NextResponse.json(
      { error: 'Failed to assign task' },
      { status: 500 }
    );
  }
}
