import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    console.log('📝 Register attempt:', { name, email, phone })

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Get student role
    let studentRole = await prisma.role.findUnique({
      where: { name: 'STUDENT' }
    })

    // Agar role nahi hai toh create karein
    if (!studentRole) {
      studentRole = await prisma.role.create({
        data: {
          name: 'STUDENT',
          permissions: ['view_courses', 'take_tests', 'download_materials']
        }
      })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        roleId: studentRole.id,
        isVerified: true,
        profile: {
          create: {}
        }
      }
    })

    console.log('✅ User registered:', user.id)

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('❌ Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}