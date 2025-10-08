// app/api/tasks/[taskId]/assign/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params
    const body = await request.json()
    const { staffName } = body

    console.log('📥 PATCH /api/tasks/[taskId]/assign called')
    console.log('Task ID:', taskId)
    console.log('Staff Name:', staffName)

    // Verify task exists
    const task = await prisma.serviceTask.findUnique({
      where: { id: taskId },
      select: { hotelId: true, status: true },
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Prevent assignment changes to completed tasks
    if (task.status === 'complete') {
      return NextResponse.json(
        { error: 'Cannot modify completed tasks' },
        { status: 400 }
      )
    }

    // Update assignment
    const updatedTask = await prisma.serviceTask.update({
      where: { id: taskId },
      data: {
        assignedTo: staffName || null,
        updatedAt: new Date(),
      },
    })

    console.log('✅ Task assigned successfully')

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error('❌ Task assignment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
