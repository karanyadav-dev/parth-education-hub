import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const currentAffairs = await prisma.currentAffair.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json({ currentAffairs }, { status: 200 })
  } catch (error) {
    console.error('Error fetching current affairs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch current affairs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, summary, category, date, tags, pdfUrl, imageUrl } = body

    const currentAffair = await prisma.currentAffair.create({
      data: {
        title,
        content,
        summary,
        category: category || 'DAILY',
        date: new Date(date),
        tags: tags || [],
        pdfUrl,
        imageUrl,
        isPublished: true
      }
    })

    return NextResponse.json({ currentAffair }, { status: 201 })
  } catch (error) {
    console.error('Error creating current affair:', error)
    return NextResponse.json(
      { error: 'Failed to create current affair' },
      { status: 500 }
    )
  }
}