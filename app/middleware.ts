import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  // Exclude auth routes from middleware
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Check if session exists
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return res
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    )
  }
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/api/protected/:path*',
    '/Home/:path*',
  ],
} 