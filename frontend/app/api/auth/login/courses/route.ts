import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          }
        }
      },
      where: {
        status: 'PUBLISHED'  // या 'isPublished: true' अगर आपके Schema में यह field है
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ success: true, data: courses }, { status: 200 })
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
    const { 
      title, 
      slug, 
      description, 
      price, 
      discount, 
      teacherId, 
      thumbnail, 
      category,
      duration,
      status 
    } = body

    // Calculate final price (if discount exists)
    const finalPrice = discount && discount > 0 
      ? price - (price * discount / 100) 
      : price

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price) || 0,
        category: category || 'General',
        duration: duration || '3 months',
        teacherId,
        thumbnail: thumbnail || '',
        status: status || 'DRAFT',
        students: 0,
        rating: 0,
        ratingCount: 0,
        // अगर आपके Schema में ये fields हैं:
        // discount: discount || 0,
        // finalPrice: finalPrice || price,
      }
    })

    return NextResponse.json({ success: true, data: course }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create course' },
      { status: 500 }
    )
  }
}