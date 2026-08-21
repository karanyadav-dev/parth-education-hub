import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'  // ← नाम बदलकर auth.routes (अगर फ़ाइल का नाम यही है)
import adminRoutes from './routes/admin.routes' // ← नई लाइन ऐड करें

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ✅ CORS CONFIGURATION
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ ROUTES
app.use('/api/auth', authRoutes)
app.use('/admin', adminRoutes)  // ← नई लाइन ऐड करें

// ✅ TEST ROUTE - Direct
app.get('/api/test', (_req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  })
})

// ✅ AUTH TEST ROUTE - Extra
app.get('/api/auth/test', (_req, res) => {
  res.json({ 
    success: true, 
    message: '✅ Auth routes are working!',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      test: 'GET /api/auth/test'
    }
  })
})

// ✅ ROOT ROUTE
app.get('/', (_req, res) => {
  res.json({
    status: 'OK',
    message: '🚀 Parth Education Hub Backend',
    endpoints: {
      auth: '/api/auth',
      admin: '/admin',  // ← नई लाइन ऐड करें
      test: '/api/test',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      users: 'GET /admin/users',  // ← नई लाइन ऐड करें
      addCourse: 'POST /admin/courses/add',  // ← नई लाइन ऐड करें
      addTest: 'POST /admin/tests/add',  // ← नई लाइन ऐड करें
      addCurrentAffairs: 'POST /admin/current-affairs/add'  // ← नई लाइन ऐड करें
    }
  })
})

// ✅ 404 HANDLER
app.use((_req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'Please check the URL and try again'
  })
})

// ✅ ERROR HANDLER
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('❌ Server Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message || 'Something went wrong'
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Auth: http://localhost:${PORT}/api/auth/test`)
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`)
  console.log(`👥 Users: http://localhost:${PORT}/admin/users`)  // ← नई लाइन ऐड करें
  console.log(`📚 Admin Routes: http://localhost:${PORT}/admin`)  // ← नई लाइन ऐड करें
})