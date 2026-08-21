import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// ==========================================
// TEST ROUTE
// ==========================================
router.get('/test', (_req, res) => {
  return res.json({
    success: true,
    message: '✅ Auth routes are working!',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      test: 'GET /api/auth/test'
    }
  })
})

// ==========================================
// REGISTER
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    console.log('📝 Register:', { name, email })

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: 'STUDENT',
        isVerified: true
      }
    })

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error: any) {
    console.error('❌ Registration error:', error.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// ==========================================
// LOGIN
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('🔐 Login attempt:', { email })

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ User not found:', email)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '')
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    console.log('✅ Login successful:', user.id)

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error: any) {
    console.error('❌ Login error:', error.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router