'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Star,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Share2,
  Printer,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

// ==========================================
// ✅ TEACHER UPLOADED PDF DATA
// ==========================================

interface NoteData {
  id: string
  title: string
  description: string
  category: string
  pages: number
  downloads: number
  rating: number
  isFree: boolean
  pdfUrl: string  // ✅ PDF URL - Teacher upload karega
  coverImage: string
  author: string
  publishedDate: string
  lastUpdated: string
  tags: string[]
  content: string
}

// ✅ TEACHER UPLOADED PDFs - SIRF YAHI DIKHENGE
// Teacher new PDF add karega toh yahan daalein
const teacherNotes: Record<string, NoteData> = {
  '1': {
    id: '1',
    title: 'Geography Complete Notes',
    description: 'Complete Geography notes for competitive exams - Physical, Indian, World Geography',
    category: 'Geography',
    pages: 120,
    downloads: 15000,
    rating: 4.9,
    isFree: true,
    pdfUrl: '/pdfs/geography-complete-notes.pdf', // ✅ Teacher ka PDF
    coverImage: '/notes/geography.jpg',
    author: 'Dr. Rajesh Kumar',
    publishedDate: '2024-07-15',
    lastUpdated: '2024-08-10',
    tags: ['Geography', 'SSC', 'UPSC', 'Banking'],
    content: `
      <h2>Geography Complete Notes</h2>
      <p>These notes are prepared by Dr. Rajesh Kumar for competitive exams.</p>
      <p>Click the download button below to get the complete PDF.</p>
    `
  },
  '2': {
    id: '2',
    title: 'Polity Complete Notes',
    description: 'Indian Constitution and Polity notes for competitive exams',
    category: 'Polity',
    pages: 95,
    downloads: 12000,
    rating: 4.8,
    isFree: true,
    pdfUrl: '/pdfs/polity-complete-notes.pdf', // ✅ Teacher ka PDF
    coverImage: '/notes/polity.jpg',
    author: 'Prof. Amit Singh',
    publishedDate: '2024-07-20',
    lastUpdated: '2024-08-12',
    tags: ['Polity', 'SSC', 'UPSC', 'Banking'],
    content: `
      <h2>Polity Complete Notes</h2>
      <p>These notes are prepared by Prof. Amit Singh.</p>
      <p>Click the download button below to get the complete PDF.</p>
    `
  },
  '3': {
    id: '3',
    title: 'History Complete Notes',
    description: 'Ancient, Medieval, Modern History notes for competitive exams',
    category: 'History',
    pages: 110,
    downloads: 10000,
    rating: 4.7,
    isFree: true,
    pdfUrl: '/pdfs/history-complete-notes.pdf', // ✅ Teacher ka PDF
    coverImage: '/notes/history.jpg',
    author: 'Dr. Suresh Sharma',
    publishedDate: '2024-07-25',
    lastUpdated: '2024-08-10',
    tags: ['History', 'SSC', 'UPSC'],
    content: `
      <h2>History Complete Notes</h2>
      <p>These notes are prepared by Dr. Suresh Sharma.</p>
      <p>Click the download button below to get the complete PDF.</p>
    `
  }
}

export default function NotePreviewPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string || '1'

  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState<NoteData | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // ✅ Sirf teacher uploaded PDFs fetch karein
    setTimeout(() => {
      const data = teacherNotes[id]
      if (data) {
        setNote(data)
      }
      setLoading(false)
    }, 300)
  }, [id])

  // ✅ PDF Download Handler
  const handleDownload = async () => {
    if (!note) return
    
    setDownloading(true)
    try {
      // ✅ PDF download simulation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // ✅ Actual PDF download
      const link = document.createElement('a')
      link.href = note.pdfUrl
      link.download = note.pdfUrl.split('/').pop() || `${note.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('✅ PDF downloaded successfully!')
    } catch (error) {
      toast.error('❌ Failed to download PDF')
    } finally {
      setDownloading(false)
    }
  }

  // ✅ PDF Preview Handler
  const handlePreview = () => {
    if (!note) return
    // ✅ PDF preview in new tab
    window.open(note.pdfUrl, '_blank')
  }

  // ✅ Share Handler
  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success('🔗 Link copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading note...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-700">PDF Not Found</h1>
          <p className="text-gray-500 mt-2">This PDF has not been uploaded yet.</p>
          <p className="text-sm text-gray-400 mt-1">Please contact your teacher to upload this PDF.</p>
          <Link href="/notes">
            <Button variant="gradient" className="mt-4">Browse Other Notes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link href="/notes">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* PDF Preview Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gradient">{note.category}</Badge>
              <Badge variant="success" className="text-xs">📄 Free PDF</Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {note.rating}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                {note.downloads.toLocaleString()} downloads
              </div>
            </div>
            <CardTitle className="text-3xl">{note.title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{note.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {note.pages} Pages
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {note.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Updated: {note.lastUpdated}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {/* ✅ Preview Button */}
              <Button 
                variant="gradient" 
                className="gap-2"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4" />
                Preview PDF
              </Button>
              
              {/* ✅ Download Button */}
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </Button>

              {/* ✅ PDF Info */}
              <Badge variant="outline" className="ml-2 text-xs">
                📄 PDF • {note.pages} pages
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* PDF Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              PDF Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-500 mb-4">
                📄 {note.pages} pages • 📅 Updated: {note.lastUpdated}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="gradient" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Full PDF
                </Button>
                <Button variant="outline" onClick={handleDownload} disabled={downloading}>
                  {downloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <Card className="mt-6 bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-white/80" />
            <h3 className="text-2xl font-bold mb-2">📥 Download Full PDF</h3>
            <p className="text-white/80 mb-4">
              Get the complete {note.title} with all chapters
            </p>
            <Button 
              variant="default" 
              className="bg-white text-primary hover:bg-white/90 gap-2"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}