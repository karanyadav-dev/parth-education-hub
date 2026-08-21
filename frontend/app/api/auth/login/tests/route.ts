import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        course: true
      },
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ tests }, { status: 200 })
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
    const { title, description, type, duration, totalMarks, passingMarks, courseId, negativeMarks } = body

    const test = await prisma.test.create({
      data: {
        title,
        description,
        type: type || 'MOCK_TEST',
        duration: parseInt(duration),
        totalMarks: parseInt(totalMarks),
        passingMarks: parseInt(passingMarks),
        negativeMarks: negativeMarks || 0.25,
        courseId,
        isPublished: true
      }
    })

    return NextResponse.json({ test }, { status: 201 })
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { error: 'Failed to create test' },
      { status: 500 }
    )
  }
}