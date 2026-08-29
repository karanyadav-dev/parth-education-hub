import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // ✅ PUBLIC ROUTES - Bina login ke access
  const publicRoutes = ['/', '/login', '/register', '/about', '/contact', '/courses', '/test-series', '/current-affairs', '/faq', '/blog', '/job-alerts', '/all-exams', '/classes']
  
  // ✅ ADMIN ROUTES - Sirf admin login ke baad
  const adminRoutes = ['/admin']
  
  // ✅ PROTECTED ROUTES - Login required
  const protectedRoutes = ['/dashboard', '/student', '/teacher', '/profile', '/my-courses']

  // Agar admin route hai aur token nahi hai toh login par bhejo
  if (adminRoutes.some(route => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Agar protected route hai aur token nahi hai toh login par bhejo
  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Agar token hai aur login/register par jaa raha hai toh dashboard par bhejo
  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/profile/:path*',
    '/my-courses/:path*',
    '/login',
    '/register'
  ]
}