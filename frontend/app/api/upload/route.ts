import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// ==========================================
// TEACHER UPLOAD API
// ==========================================

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'others'
    const type = formData.get('type') as string || 'video'
    const subType = formData.get('subType') as string || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // ✅ Teacher upload validation
    const teacherToken = request.headers.get('authorization')
    if (!teacherToken) {
      return NextResponse.json(
        { error: 'Unauthorized - Teacher login required' },
        { status: 401 }
      )
    }

    // ✅ File type detect
    const fileExt = path.extname(file.name).toLowerCase()
    const fileType = detectFileType(fileExt)

    // ✅ Folder path generate
    const uploadDir = await createTeacherFolder(category, fileType, subType)
    
    // ✅ Unique filename
    const fileName = `${Date.now()}-${uuidv4().slice(0, 8)}-${file.name.replace(/\s/g, '_')}`
    const filePath = path.join(uploadDir, fileName)

    // ✅ Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // ✅ Public URL
    const publicUrl = `/uploads/${category}/${fileType}${subType ? '/' + subType : ''}/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      filePath: filePath,
      category: category,
      type: fileType,
      subType: subType
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

// ==========================================
// FILE TYPE DETECT
// ==========================================

function detectFileType(ext: string): string {
  if (['.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv'].includes(ext)) {
    return 'videos'
  }
  if (['.pdf'].includes(ext)) {
    return 'pdfs'
  }
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
    return 'images'
  }
  return 'documents'
}

// ==========================================
// TEACHER FOLDER CREATE
// ==========================================

async function createTeacherFolder(
  category: string, 
  fileType: string, 
  subType: string
): Promise<string> {
  const baseDir = path.join(process.cwd(), 'public/uploads')
  
  // ✅ Category-based folder structure
  let folderPath = baseDir
  
  // ✅ Main category folder
  if (category === 'ssc' || category === 'upsc' || category === 'banking' || 
      category === 'railway' || category === 'police' || category === 'defence' ||
      category === 'teaching' || category === 'rpsc' || category === 'rssb') {
    folderPath = path.join(baseDir, fileType, category)
  } else {
    folderPath = path.join(baseDir, fileType, category)
  }
  
  // ✅ Sub folder (notes, current-affairs, test-series)
  if (subType) {
    folderPath = path.join(folderPath, subType)
  }
  
  // ✅ Folder create
  await mkdir(folderPath, { recursive: true })
  
  return folderPath
}