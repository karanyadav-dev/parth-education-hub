// src/routes/admin.routes.ts
import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// ✅ Add this for req.user type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

const router = express.Router();
const prisma = new PrismaClient();

// ==========================================
// PDF UPLOAD SETUP
// ==========================================
const pdfStorage = multer.diskStorage({
  destination: './uploads/pdfs/',
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: pdfStorage });

// ==========================================
// ADMIN IMAGE UPLOAD SETUP
// ==========================================
const imageStorage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const uploadDir = './uploads/admin';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'admin-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, JPG, and WEBP images are allowed'));
    }
  }
});

// ==========================================
// 1. GET ALL USERS
// ==========================================
router.get('/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    });

    return res.json({
      success: true,
      data: users
    });
  } catch (error: any) {
    console.error('❌ Error fetching users:', error.message);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ==========================================
// 2. GET ALL COURSES
// ==========================================
router.get('/courses', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc'
      },
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
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// ==========================================
// 3. GET ALL TESTS (PUBLIC - Test Series Page)
// ==========================================
router.get('/tests/public', async (_req, res) => {
  try {
    const tests = await prisma.test.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        subject: true,
        duration: true,
        totalMarks: true,
        passingMarks: true,
        pdfUrl: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: tests
    });
  } catch (error: any) {
    console.error('❌ Error fetching public tests:', error);
    return res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// ==========================================
// 4. GET ALL TESTS (ADMIN)
// ==========================================
router.get('/tests', async (_req, res) => {
  try {
    const tests = await prisma.test.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        subject: true,
        duration: true,
        totalMarks: true,
        passingMarks: true,
        status: true,
        isPublished: true,
        pdfUrl: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: tests
    });
  } catch (error: any) {
    console.error('❌ Error fetching tests:', error);
    return res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// ==========================================
// 5. GET ALL CURRENT AFFAIRS (PUBLIC)
// ==========================================
router.get('/current-affairs/public', async (_req, res) => {
  try {
    const currentAffairs = await prisma.currentAffair.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        date: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        summary: true,
        category: true,
        date: true,
        pdfUrl: true,
        imageUrl: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: currentAffairs
    });
  } catch (error: any) {
    console.error('❌ Error fetching public current affairs:', error);
    return res.status(500).json({ error: 'Failed to fetch current affairs' });
  }
});

// ==========================================
// 6. GET ALL CURRENT AFFAIRS (ADMIN)
// ==========================================
router.get('/current-affairs', async (_req, res) => {
  try {
    const currentAffairs = await prisma.currentAffair.findMany({
      orderBy: {
        date: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        summary: true,
        category: true,
        date: true,
        pdfUrl: true,
        imageUrl: true,
        isPublished: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: currentAffairs
    });
  } catch (error: any) {
    console.error('❌ Error fetching current affairs:', error);
    return res.status(500).json({ error: 'Failed to fetch current affairs' });
  }
});

// ==========================================
// 7. ADD COURSE
// ==========================================
router.post('/courses/add', async (req, res) => {
  try {
    const { title, description, price, duration, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        category: category || 'Uncategorized',
        price: parseFloat(price) || 0,
        duration: duration || '',
        status: 'DRAFT',
        teacherId: (req as any).user?.id || 'admin',
      }
    });

    return res.json({
      success: true,
      message: 'Course added successfully',
      data: course
    });
  } catch (error: any) {
    console.error('❌ Error adding course:', error.message);
    return res.status(500).json({ error: 'Failed to add course' });
  }
});

// ==========================================
// 8. DELETE COURSE
// ==========================================
router.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await prisma.course.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error: any) {
    console.error('❌ Error deleting course:', error);
    return res.status(500).json({ error: 'Failed to delete course' });
  }
});

// ==========================================
// 9. ADD TEST WITH PDF
// ==========================================
router.post('/tests/add', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, description, duration, totalMarks, subject, passingMarks } = req.body;
    const pdfPath = req.file?.path || null;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const test = await prisma.test.create({
      data: {
        title,
        description: description || '',
        subject: subject || 'General',
        duration: parseInt(duration) || 60,
        totalMarks: parseInt(totalMarks) || 100,
        passingMarks: parseInt(passingMarks) || 40,
        pdfUrl: pdfPath,
        status: 'DRAFT',
        isPublished: true,
        teacherId: (req as any).user?.id || 'admin',
      }
    });

    return res.json({
      success: true,
      message: 'Test added successfully with PDF',
      data: test
    });
  } catch (error: any) {
    console.error('❌ Error adding test:', error.message);
    return res.status(500).json({ error: 'Failed to add test' });
  }
});

// ==========================================
// 10. DELETE TEST
// ==========================================
router.delete('/tests/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const test = await prisma.test.findUnique({
      where: { id }
    });

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    await prisma.test.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: 'Test deleted successfully'
    });
  } catch (error: any) {
    console.error('❌ Error deleting test:', error);
    return res.status(500).json({ error: 'Failed to delete test' });
  }
});

// ==========================================
// 11. ADD CURRENT AFFAIRS WITH PDF
// ==========================================
router.post('/current-affairs/add', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, content, date, category, summary } = req.body;
    const pdfPath = req.file?.path || null;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const currentAffair = await prisma.currentAffair.create({
      data: {
        title,
        slug,
        content: content || '',
        summary: summary || '',
        category: category || 'GENERAL',
        date: date ? new Date(date) : new Date(),
        pdfUrl: pdfPath || '',
        isPublished: true,
        teacherId: (req as any).user?.id || 'admin',
      }
    });

    return res.json({
      success: true,
      message: 'Current Affairs added successfully with PDF',
      data: currentAffair
    });
  } catch (error: any) {
    console.error('❌ Error adding current affairs:', error.message);
    return res.status(500).json({ error: 'Failed to add current affairs' });
  }
});

// ==========================================
// 12. DELETE CURRENT AFFAIRS
// ==========================================
router.delete('/current-affairs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const currentAffair = await prisma.currentAffair.findUnique({
      where: { id }
    });

    if (!currentAffair) {
      return res.status(404).json({ error: 'Current Affairs not found' });
    }

    await prisma.currentAffair.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: 'Current Affairs deleted successfully'
    });
  } catch (error: any) {
    console.error('❌ Error deleting current affairs:', error);
    return res.status(500).json({ error: 'Failed to delete current affairs' });
  }
});

// ==========================================
// 13. GET ADMIN PROFILE
// ==========================================
router.get('/profile', async (req, res) => {
  try {
    const adminId = (req as any).user?.id;
    
    if (!adminId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        createdAt: true,
      }
    });

    return res.json({
      success: true,
      data: admin
    });
  } catch (error: any) {
    console.error('❌ Error fetching profile:', error.message);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// ==========================================
// 14. UPDATE ADMIN PROFILE
// ==========================================
router.put('/profile', async (req, res) => {
  try {
    const adminId = (req as any).user?.id;
    
    if (!adminId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, phone } = req.body;

    const updatedAdmin = await prisma.user.update({
      where: { id: adminId },
      data: {
        name: name || undefined,
        phone: phone || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
      }
    });

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedAdmin
    });
  } catch (error: any) {
    console.error('❌ Error updating profile:', error.message);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ==========================================
// 15. UPLOAD ADMIN IMAGE
// ==========================================
router.post('/upload-image', imageUpload.single('image'), async (req, res) => {
  try {
    const adminId = (req as any).user?.id;
    
    if (!adminId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `/uploads/admin/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: { id: adminId },
      data: {
        image: imageUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      }
    });

    return res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: updatedUser
    });
  } catch (error: any) {
    console.error('❌ Error uploading image:', error.message);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ==========================================
// 16. GET ALL COURSES (PUBLIC)
// ==========================================
router.get('/courses/public', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc'
      },
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
    console.error('❌ Error fetching public courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

export default router;
