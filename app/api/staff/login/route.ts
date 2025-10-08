// app/api/staff/login/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { staffId, pin } = body

    console.log('🔐 Staff login attempt:', { staffId })

    if (!staffId || !pin) {
      return NextResponse.json(
        { error: 'Staff ID and PIN are required' },
        { status: 400 }
      )
    }

    // For pilot: Simple demo authentication
    // In production, use proper password hashing (bcrypt)
    
    // Demo credentials (hardcoded for pilot)
    const demoStaff = [
      { id: 'staff-1', name: 'Ravi Kumar', role: 'Housekeeping', pin: '1234' },
      { id: 'staff-2', name: 'Priya Singh', role: 'Room Service', pin: '2345' },
      { id: 'staff-3', name: 'Amit Patel', role: 'Maintenance', pin: '3456' },
    ]

    // Check if staff ID matches (case-insensitive, partial match)
    const staff = demoStaff.find(
      s => s.name.toLowerCase().includes(staffId.toLowerCase()) || s.id === staffId
    )

    if (!staff) {
      console.log('❌ Staff not found:', staffId)
      return NextResponse.json(
        { error: 'Staff ID not found' },
        { status: 401 }
      )
    }

    // Verify PIN
    if (staff.pin !== pin) {
      console.log('❌ Invalid PIN for:', staff.name)
      return NextResponse.json(
        { error: 'Invalid PIN' },
        { status: 401 }
      )
    }

    console.log('✅ Staff login successful:', staff.name)

    // Return staff info (no sensitive data)
    return NextResponse.json({
      staffId: staff.id,
      staffName: staff.name,
      role: staff.role,
    })
  } catch (error) {
    console.error('❌ Staff login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
