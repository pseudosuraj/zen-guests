// app/api/tasks/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('📥 GET /api/tasks called')
    
    // 1) Authenticate the request
    const session = await getServerSession(authOptions)
    
    console.log('🔐 Session:', session ? 'Found' : 'Not found')
    console.log('📧 User email:', session?.user?.email)
    
    if (!session?.user?.email) {
      console.error('❌ No session or email')
      return NextResponse.json(
        { error: 'Unauthorized - No session' },
        { status: 401 }
      )
    }

    // 2) Get the user's hotel ID for multi-tenancy
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        id: true,
        email: true, 
        name: true,
        hotelId: true 
      },
    })

    console.log('👤 User found:', user ? 'Yes' : 'No')
    console.log('🏨 Hotel ID:', user?.hotelId || 'MISSING')

    if (!user?.hotelId) {
      console.error('❌ User has no hotelId:', user)
      return NextResponse.json(
        { 
          error: 'No hotel linked to this account',
          user: user?.email || 'unknown',
          hint: 'User exists but hotelId is null'
        },
        { status: 403 }
      )
    }

    // 3) Fetch tasks for this hotel only
    console.log('🔍 Fetching tasks for hotel:', user.hotelId)
    
    const tasks = await prisma.serviceTask.findMany({
      where: {
        hotelId: user.hotelId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    console.log('✅ Tasks found:', tasks.length)

    // 4) Return the tasks
    return NextResponse.json(tasks)
    
  } catch (error) {
    console.error('💥 GET /api/tasks error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('📥 POST /api/tasks called')
    
    // Parse the request body
    const body = await request.json()
    const { title, roomNumber, hotelId } = body

    console.log('📦 Body:', { title, roomNumber, hotelId })

    if (!title || !hotelId) {
      return NextResponse.json(
        { error: 'Title and hotelId are required' },
        { status: 400 }
      )
    }

    // Create the task
    const task = await prisma.serviceTask.create({
      data: {
        title,
        roomNumber: roomNumber || null,
        hotelId,
        status: 'pending',
        priority: 'high',
        description: null,
        assignedTo: null,
      },
    })

    console.log('✅ Task created:', task.id)

    return NextResponse.json(task, { status: 201 })
    
  } catch (error) {
    console.error('💥 POST /api/tasks error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
