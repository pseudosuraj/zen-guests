// app/api/tasks/[taskId]/complete/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params

    console.log('✅ Marking task as complete:', taskId)

    // Update task status to complete
    const task = await prisma.serviceTask.update({
      where: { id: taskId },
      data: {
        status: 'complete',
        updatedAt: new Date(),
      },
    })

    console.log('✓ Task completed:', task.title)

    return NextResponse.json({ success: true, task })
  } catch (error) {
    console.error('❌ Error completing task:', error)
    return NextResponse.json(
      { error: 'Failed to complete task' },
      { status: 500 }
    )
  }
}
