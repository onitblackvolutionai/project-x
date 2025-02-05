import { NextResponse } from 'next/server'
import { AuthService } from '@/app/db/services/auth.service'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide both email and password' },
        { status: 400 }
      )
    }

    try {
      const { user, session } = await AuthService.validateUser(email, password)
      return NextResponse.json({
        success: true,
        user,
        session,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid credentials'
      
      // Check if user is not registered
      if (errorMessage.includes('not registered')) {
        return NextResponse.json(
          { error: errorMessage, notRegistered: true },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 }
    )
  }
} 