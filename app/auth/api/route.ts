// Move all API routes here under /auth/api
import { NextResponse } from 'next/server'
import { AuthService } from '../services/auth.service'

export async function POST(req: Request) {
  const { action, ...data } = await req.json()

  try {
    switch (action) {
      case 'signin':
        return handleSignIn(data)
      case 'signup':
        return handleSignUp(data)
      case 'forgot-password':
        return handleForgotPassword(data)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 }
    )
  }
}

async function handleSignIn({ email, password }: { email: string; password: string }) {
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
    
    if (errorMessage.includes('not registered')) {
      return NextResponse.json(
        { error: errorMessage, notRegistered: true },
        { status: 404 }
      )
    }

    if (errorMessage.includes('Incorrect password')) {
      return NextResponse.json(
        { error: errorMessage, invalidPassword: true },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 401 }
    )
  }
}

async function handleSignUp(userData: { name: string; email: string; password: string }) {
  try {
    const { user, session } = await AuthService.createUser(userData)
    return NextResponse.json({
      success: true,
      user,
      session,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    )
  }
}

async function handleForgotPassword({ email }: { email: string }) {
  try {
    await AuthService.generateResetToken(email)
    return NextResponse.json({
      success: true,
      message: 'If an account exists, password reset instructions have been sent',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    )
  }
} 