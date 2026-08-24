import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ==========================================
// GET - सारे Current Affairs Fetch करें
// ==========================================
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

    return NextResponse.json({ 
      success: true, 
      currentAffairs 
    }, { status: 200 })
    
  } catch (error) {
    console.error('Error fetching current affairs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch current affairs' },
      { status: 500 }
    )
  }
}

// ==========================================
// POST - नया Current Affairs Create करें
// ==========================================
export async function POST(request: NextRequest) {
  try {
    // ✅ Session Check करें (Authentication)
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login first' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, summary, category, date, tags, pdfUrl, imageUrl } = body

    // ✅ Required Fields Check करें
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // ✅ Slug Auto-generate करें
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // ✅ CurrentAffair Create करें
    const currentAffair = await prisma.currentAffair.create({
      data: {
        title,
        slug,                           // ✅ Auto-generated slug
        content,
        summary: summary || '',         // ✅ Optional
        category: category || 'GENERAL',
        date: date ? new Date(date) : new Date(),
        tags: tags || [],
        pdfUrl: pdfUrl || '',
        imageUrl: imageUrl || '',
        isPublished: true,
        teacherId: session.user.id,     // ✅ Logged-in user ka ID
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Current Affairs added successfully',
      data: currentAffair 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating current affair:', error)
    return NextResponse.json(
      { error: 'Failed to create current affair' },
      { status: 500 }
    )
  }
}