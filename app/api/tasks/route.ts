// app/api/tasks/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function safeError(e: unknown) {
  try { return JSON.stringify(e, Object.getOwnPropertyNames(e)) } catch { return String(e) }
}

function redactedDbInfo() {
  try {
    const url = process.env.DATABASE_URL || ''
    const match = url.match(/^postgresql:\/\/[^@]+@([^/]+)\/([^?]+)/i)
    return { host: match?.[1] || null, db: match?.[2] || null }
  } catch { return { host: null, db: null } }
}

export async function GET(request: NextRequest) {
  try {
    if (request.nextUrl.searchParams.get('debug') === '1') {
      return NextResponse.json({ using: redactedDbInfo() }, { status: 200 })
    }
    const tasks = await prisma.serviceTask.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(tasks, { status: 200 })
  } catch (error) {
    console.error('GET /api/tasks:', safeError(error))
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, roomNumber } = await request.json()
    if (!title || !roomNumber) {
      return NextResponse.json({ error: 'Title and room number are required' }, { status: 400 })
    }
    const task = await prisma.serviceTask.create({
      data: { title, roomNumber, status: 'PENDING' },
    })
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('POST /api/tasks:', safeError(error))
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
