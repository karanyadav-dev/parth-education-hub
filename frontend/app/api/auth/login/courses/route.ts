import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
        teacher: {
          include: {
            user: true
          }
        }
      },
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, description, price, discount, categoryId, teacherId, thumbnail, level, language } = body

    const finalPrice = price - (price * discount / 100)

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        price,
        discount,
        finalPrice,
        categoryId,
        teacherId,
        thumbnail,
        level: level || 'BEGINNER',
        language: language || 'Hindi',
        isPublished: true
      }
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}