// app/actions/createTask.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Version 1: FormData version (for forms)
export async function createTask(formData: FormData) {
  try {
    // For pilot: Use demo hotel by default
    const DEMO_HOTEL_ID = 'demo-hotel-123'

    // Read inputs from form
    const title = String(formData.get('title') ?? '')
    const description = String(formData.get('description') ?? '')
    const status = String(formData.get('status') ?? 'pending')
    const priority = String(formData.get('priority') ?? 'medium')
    const assignedTo = String(formData.get('assignedTo') ?? '')
    const roomNumber = String(formData.get('roomNumber') ?? '')

    if (!title.trim()) {
      throw new Error('Title is required')
    }

    // Create task
    const task = await prisma.serviceTask.create({
      data: {
        title,
        description: description || null,
        status,
        priority,
        assignedTo: assignedTo || null,
        roomNumber: roomNumber || null,
        hotelId: DEMO_HOTEL_ID,
      },
    })

    // Revalidate pages
    revalidatePath('/owner/dashboard')
    revalidatePath('/owner/tasks')

    console.log('✅ Task created:', task.id)

    return { success: true, task }
  } catch (error) {
    console.error('❌ Create task error:', error)
    throw error
  }
}

// Version 2: Direct-call version (for programmatic use)
export async function createTaskDirect(
  title: string,
  roomNumber: string,
  hotelId: string
) {
  try {
    console.log('📝 Creating task:', { title, roomNumber, hotelId })

    const task = await prisma.serviceTask.create({
      data: {
        title,
        roomNumber,
        hotelId,
        status: 'pending',
        priority: 'medium',
        description: null,
        assignedTo: null,
      },
    })

    // Revalidate pages
    revalidatePath('/owner/dashboard')
    revalidatePath('/owner/tasks')

    console.log('✅ Task created:', task.id)

    return { success: true, task }
  } catch (error) {
    console.error('❌ Create task error:', error)
    throw new Error('Failed to create task')
  }
}
