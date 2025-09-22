// app/actions/updateTaskStatus.ts
'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateTaskStatus(taskId: string, status: string) {
  if (!taskId?.trim()) {
    throw new Error('Task ID is required')
  }

  if (!status?.trim()) {
    throw new Error('Status is required')
  }

  try {
    const updatedTask = await prisma.serviceTask.update({
      where: { id: taskId },
      data: { status, updatedAt: new Date() },
    })

    return updatedTask
  } catch (error) {
    console.error('Error updating task status:', error)
    throw new Error('Failed to update task status')
  }
}
