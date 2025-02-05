import { NextResponse } from 'next/server'
import { AuthService } from '@/app/db/services/auth.service'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const resetToken = await AuthService.generateResetToken(email)
    
    // TODO: Send email with reset token
    
    return NextResponse.json({
      success: true,
      message: 'If an account exists, password reset instructions have been sent',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    )
  }
} 