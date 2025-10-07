// app/actions/assignTask.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function assignTask(taskId: string, staffName: string | null) {
  try {
    // 1) Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }

    // 2) Get user's hotel to verify ownership
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { hotelId: true },
    })

    if (!user?.hotelId) {
      throw new Error('No hotel linked to user')
    }

    // 3) Verify task belongs to this hotel
    const task = await prisma.serviceTask.findUnique({
      where: { id: taskId },
      select: { hotelId: true },
    })

    if (!task || task.hotelId !== user.hotelId) {
      throw new Error('Task not found or access denied')
    }

    // 4) Update task assignment
    const updatedTask = await prisma.serviceTask.update({
      where: { id: taskId },
      data: {
        assignedTo: staffName,
        updatedAt: new Date(),
      },
    })

    // 5) Revalidate pages
    revalidatePath('/owner/dashboard')
    revalidatePath('/owner/tasks')

    console.log(`✅ Task ${taskId} assigned to ${staffName || 'unassigned'}`)

    return { success: true, task: updatedTask }
  } catch (error) {
    console.error('❌ Assign task error:', error)
    throw error
  }
}
