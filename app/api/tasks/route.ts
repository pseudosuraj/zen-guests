// app/api/tasks/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('📥 GET /api/tasks called')

    // For pilot: Return demo hotel tasks without auth
    const DEMO_HOTEL_ID = 'demo-hotel-123'

    const tasks = await prisma.serviceTask.findMany({
      where: {
        hotelId: DEMO_HOTEL_ID,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(`✅ Found ${tasks.length} tasks for demo hotel`)

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('❌ Fetch tasks error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}
