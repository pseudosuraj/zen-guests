// app/api/tasks/[taskId]/assign/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

    // 1) Authenticate
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2) Get user's hotel
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { hotelId: true },
    })

    if (!user?.hotelId) {
      return NextResponse.json(
        { error: 'No hotel linked to user' },
        { status: 403 }
      )
    }

    // 3) Verify task belongs to this hotel
    const task = await prisma.serviceTask.findUnique({
      where: { id: taskId },
      select: { hotelId: true, status: true },
    })

    if (!task || task.hotelId !== user.hotelId) {
      return NextResponse.json(
        { error: 'Task not found or access denied' },
        { status: 404 }
      )
    }

    // 4) Prevent assignment changes to completed tasks
    if (task.status === 'complete') {
      return NextResponse.json(
        { error: 'Cannot modify completed tasks' },
        { status: 400 }
      )
    }

    // 5) Update assignment
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
