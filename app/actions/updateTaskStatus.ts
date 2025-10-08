// app/actions/updateTaskStatus.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function updateTaskStatus(
  taskId: string,
  newStatus: 'pending' | 'in-progress' | 'complete'
) {
  try {
    console.log('🔄 Updating task status:', { taskId, newStatus })

    // Verify task exists
    const task = await prisma.serviceTask.findUnique({
      where: { id: taskId },
      select: { id: true, hotelId: true, status: true, title: true },
    })

    if (!task) {
      throw new Error('Task not found')
    }

    console.log('📋 Found task:', task.title)

    // Update the task status
    const updatedTask = await prisma.serviceTask.update({
      where: { id: taskId },
      data: { 
        status: newStatus,
        updatedAt: new Date(),
      },
    })

    console.log(`✅ Task "${task.title}" updated to ${newStatus}`)

    // Revalidate dashboard and tasks page to show changes immediately
    revalidatePath('/owner/dashboard')
    revalidatePath('/owner/tasks')

    return { success: true, task: updatedTask }
    
  } catch (error) {
    console.error('❌ Update task status error:', error)
    throw error
  }
}
