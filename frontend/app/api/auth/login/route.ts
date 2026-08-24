import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('🔐 Login attempt:', { email })

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ✅ Find user - Direct role String Use करें (NO include)
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      console.log('❌ User not found:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // ✅ Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // ✅ Generate token - Direct user.role Use करें
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role || 'STUDENT'  // ✅ Direct String
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    console.log('✅ Login successful:', user.id)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'STUDENT'  // ✅ Direct String
      }
    }, { status: 200 })

  } catch (error: any) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}