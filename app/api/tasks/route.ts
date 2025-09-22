import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return empty tasks array (temporary fix)
    const tasks: any[] = []
    
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('GET /api/tasks error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
