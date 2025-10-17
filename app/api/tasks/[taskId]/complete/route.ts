import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  try {
    const { taskId } = context.params;

    const task = await prisma.serviceTask.update({
      where: { id: taskId },
      data: {
        status: 'complete',
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
    console.error('Error completing task:', error);
    return NextResponse.json(
      { error: 'Failed to complete task' },
      { status: 500 }
    );
  }
}
