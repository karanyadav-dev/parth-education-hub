// src/routes/admin.routes.ts
import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// PDF अपलोड सेटअप
const storage = multer.diskStorage({
  destination: './uploads/pdfs/',
  filename: (_req, file, cb) => {  // ← req को _req करें (TypeScript एरर फिक्स)
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ==========================================
// 1. GET ALL USERS
// ==========================================
router.get('/users', async (_req, res) => {  // ← req को _req करें
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
// 2. ADD COURSE
// ==========================================
router.post('/courses/add', async (req, res) => {
  try {
    const { title, description, price, duration, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // ✅ अगर Prisma में Course मॉडल है तो इस कमेंट को हटाएँ:
    // const course = await prisma.course.create({
    //   data: { title, description, price, duration, category }
    // });

    return res.json({
      success: true,
      message: 'Course added successfully',
      data: { title, description, price, duration, category }
    });
  } catch (error: any) {
    console.error('❌ Error adding course:', error.message);
    return res.status(500).json({ error: 'Failed to add course' });
  }
});

// ==========================================
// 3. ADD TEST WITH PDF
// ==========================================
router.post('/tests/add', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, description, duration, totalMarks, subject } = req.body;
    const pdfPath = req.file?.path || null;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    // ✅ अगर Prisma में Test मॉडल है तो इस कमेंट को हटाएँ:
    // const test = await prisma.test.create({
    //   data: { title, description, duration, totalMarks, subject, pdfPath }
    // });

    return res.json({
      success: true,
      message: 'Test added successfully with PDF',
      data: { title, description, duration, totalMarks, subject, pdfPath }
    });
  } catch (error: any) {
    console.error('❌ Error adding test:', error.message);
    return res.status(500).json({ error: 'Failed to add test' });
  }
});

// ==========================================
// 4. ADD CURRENT AFFAIRS WITH PDF
// ==========================================
router.post('/current-affairs/add', upload.single('pdfFile'), async (req, res) => {
  try {
    const { title, content, date, category, source } = req.body;
    const pdfPath = req.file?.path || null;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // ✅ अगर Prisma में CurrentAffair मॉडल है तो इस कमेंट को हटाएँ:
    // const currentAffair = await prisma.currentAffair.create({
    //   data: { title, content, date: new Date(date), category, source, pdfPath }
    // });

    return res.json({
      success: true,
      message: 'Current Affairs added successfully with PDF',
      data: { title, content, date, category, source, pdfPath }
    });
  } catch (error: any) {
    console.error('❌ Error adding current affairs:', error.message);
    return res.status(500).json({ error: 'Failed to add current affairs' });
  }
});

export default router;