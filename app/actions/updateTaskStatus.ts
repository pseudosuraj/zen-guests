// app/actions/updateTaskStatus.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateTaskStatus(taskId: string, newStatus: 'IN_PROGRESS' | 'COMPLETE') {
  try {
    await prisma.serviceTask.update({
      where: { id: parseInt(taskId) },
      data: { status: newStatus },
    });

    // Instantly refresh the dashboard to show the change
    revalidatePath('/owner/dashboard');
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
}
