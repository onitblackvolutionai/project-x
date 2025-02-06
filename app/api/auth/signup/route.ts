import { NextResponse } from 'next/server'
import { AuthService } from '@/app/db/services/auth.service'

export async function POST(req: Request) {
  try {
    const userData = await req.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate password length
    if (userData.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const { user, token } = await AuthService.createUser(userData)
    
    return NextResponse.json(
      {
        success: true,
        user,
        token,
        message: 'User created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error creating user',
        success: false
      },
      { status: error instanceof Error && error.message.includes('exists') ? 400 : 500 }
    )
  }
} 