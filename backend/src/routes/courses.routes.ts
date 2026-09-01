import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// ✅ GET ALL COURSES FOR EXAMS PAGE
router.get('/exams', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        price: true,
        duration: true,
        thumbnail: true,
        hasLive: true,
        hasRecorded: true,
        liveSchedule: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: courses
    });
  } catch (error: any) {
    console.error('❌ Error fetching exam courses:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch exam courses' 
    });
  }
});

// ✅ GET COURSES BY EXAM CATEGORY
router.get('/exams/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const courses = await prisma.course.findMany({
      where: {
        category: category,
        status: 'PUBLISHED'
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        price: true,
        duration: true,
        thumbnail: true,
        hasLive: true,
        hasRecorded: true,
        liveSchedule: true,
        createdAt: true,
      }
    });

    const examData = {
      name: category,
      title: getExamTitle(category),
      description: getExamDescription(category),
      icon: getExamIcon(category),
      totalCourses: courses.length,
      courses: courses
    };

    return res.json({
      success: true,
      data: examData
    });
  } catch (error: any) {
    console.error('❌ Error fetching exam courses:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch exam courses' 
    });
  }
});

// ✅ Helper Functions
function getExamTitle(category: string): string {
  const titles: Record<string, string> = {
    'UPSC': 'UPSC Civil Services Foundation Course',
    'RPSC': 'RPSC RAS Foundation Course',
    'SSC': 'SSC CGL Foundation Course',
    'BANKING': 'Bank PO & Clerk Foundation Course',
    'RAILWAY': 'RRB NTPC Foundation Course',
    'REET': 'REET & Teaching Exams Foundation Course',
    'POLICE': 'Police & Defence Foundation Course',
    'CET': 'Common Eligibility Test Foundation Course',
    'CUET': 'CUET Foundation Course',
  };
  return titles[category] || `${category} Foundation Course`;
}

function getExamDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'UPSC': 'Complete preparation for Civil Services Prelims & Mains with expert faculty',
    'RPSC': 'Comprehensive RAS preparation with Rajasthan specific content',
    'SSC': 'Complete SSC CGL, CHSL, MTS preparation with latest pattern',
    'BANKING': 'Bank PO, Clerk, SBI, IBPS preparation with test series',
    'RAILWAY': 'RRB NTPC, Group D, ALP complete preparation',
    'REET': 'REET, CTET, TET, BSTC complete preparation',
    'POLICE': 'Police Constable, SI, CDS, NDA preparation',
    'CET': 'Common Eligibility Test complete preparation',
    'CUET': 'CUET UG, PG complete preparation',
  };
  return descriptions[category] || 'Complete foundation course with expert guidance';
}

function getExamIcon(category: string): string {
  const icons: Record<string, string> = {
    'UPSC': '🏛️',
    'RPSC': '🏛️',
    'SSC': '📋',
    'BANKING': '🏦',
    'RAILWAY': '🚆',
    'REET': '📚',
    'POLICE': '👮',
    'CET': '📝',
    'CUET': '🎓',
  };
  return icons[category] || '📚';
}

// ✅ GET ALL COURSES (Admin)
router.get('/', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        price: true,
        duration: true,
        students: true,
        rating: true,
        status: true,
        createdAt: true,
        teacher: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    return res.json({
      success: true,
      data: courses
    });
  } catch (error: any) {
    console.error('❌ Error fetching courses:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch courses' 
    });
  }
});

// ✅ GET SINGLE COURSE
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        price: true,
        duration: true,
        students: true,
        rating: true,
        status: true,
        thumbnail: true,
        hasLive: true,
        hasRecorded: true,
        liveSchedule: true,
        createdAt: true,
        updatedAt: true,
        teacher: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        error: 'Course not found' 
      });
    }

    return res.json({
      success: true,
      data: course
    });
  } catch (error: any) {
    console.error('❌ Error fetching course:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch course' 
    });
  }
});

export default router;
