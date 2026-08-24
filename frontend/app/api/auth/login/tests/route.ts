import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // ✅ Temporary - जब तक Test Model नहीं है
    return NextResponse.json({
      success: true,
      message: 'Tests API - Model not implemented yet',
      tests: []
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, duration, totalMarks, passingMarks, subject } = body

    // ✅ Mock Response - जब तक Test Model नहीं है
    return NextResponse.json({
      success: true,
      message: 'Test created successfully (mock)',
      data: {
        id: 'mock-test-id',
        title,
        description,
        duration: parseInt(duration),
        totalMarks: parseInt(totalMarks),
        passingMarks: parseInt(passingMarks) || 0,
        subject: subject || 'General',
        isPublished: true,
        createdAt: new Date().toISOString()
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { error: 'Failed to create test' },
      { status: 500 }
    )
  }
}