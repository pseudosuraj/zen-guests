// app/actions/createTask.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function createTask(formData: FormData) {
  // 1) Auth
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  // 2) Resolve current user and hotel
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, hotelId: true },
  })
  if (!user?.hotelId) {
    throw new Error('No hotel linked to user')
  }

  // 3) Read inputs
  const title = String(formData.get('title') ?? '')
  const description = String(formData.get('description') ?? '')
  const status = String(formData.get('status') ?? 'pending')
  const priority = String(formData.get('priority') ?? 'high')
  const assignedTo = String(formData.get('assignedTo') ?? '')
  const roomNumber = String(formData.get('roomNumber') ?? '')

  if (!title.trim()) {
    throw new Error('Title is required')
  }

  // 4) Create task scoped to tenant
  const task = await prisma.serviceTask.create({
    data: {
      title,
      description: description || null,
      status,
      priority,
      assignedTo: assignedTo || null,
      roomNumber: roomNumber || null,
      hotelId: user.hotelId,
    },
  })

  // 5) Revalidate the dashboard so it shows the new task immediately
  revalidatePath('/owner/dashboard')

  return task
}

// Alternative: Direct-call version that accepts parameters instead of FormData
export async function createTaskDirect(
  title: string,
  roomNumber: string,
  hotelId: string
) {
  'use server'
  
  const task = await prisma.serviceTask.create({
    data: {
      title,
      roomNumber,
      hotelId,
      status: 'pending',
      priority: 'high',
      description: null,
      assignedTo: null,
    },
  })

  revalidatePath('/owner/dashboard')

  return task
}
