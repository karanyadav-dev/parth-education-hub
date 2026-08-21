'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  Search,
  FileText,
  Star,
  Users,
  Download,
  Eye,
  ArrowRight,
  Filter,
  Loader2,
  BookOpen
} from 'lucide-react'
import { toast } from 'sonner'

// ==========================================
// ✅ TEACHER UPLOADED PDFs - SIRF YAHI DIKHENGE
// ==========================================

interface Note {
  id: number
  title: string
  description: string
  category: string
  pages: number
  downloads: number
  rating: number
  pdfUrl: string
  color: string
  author: string
  date: string
}

// ✅ Teacher yahan naya PDF add karega
const teacherNotes: Note[] = [
  {
    id: 1,
    title: 'Geography Complete Notes',
    description: 'Complete Geography notes for competitive exams',
    category: 'Geography',
    pages: 120,
    downloads: 15000,
    rating: 4.9,
    pdfUrl: '/pdfs/geography-complete-notes.pdf',
    color: 'from-green-500 to-emerald-500',
    author: 'Dr. Rajesh Kumar',
    date: '2024-08-10'
  },
  {
    id: 2,
    title: 'Polity Complete Notes',
    description: 'Indian Constitution and Polity notes',
    category: 'Polity',
    pages: 95,
    downloads: 12000,
    rating: 4.8,
    pdfUrl: '/pdfs/polity-complete-notes.pdf',
    color: 'from-blue-500 to-cyan-500',
    author: 'Prof. Amit Singh',
    date: '2024-08-12'
  },
  {
    id: 3,
    title: 'History Complete Notes',
    description: 'Ancient, Medieval, Modern History notes',
    category: 'History',
    pages: 110,
    downloads: 10000,
    rating: 4.7,
    pdfUrl: '/pdfs/history-complete-notes.pdf',
    color: 'from-orange-500 to-red-500',
    author: 'Dr. Suresh Sharma',
    date: '2024-08-10'
  }
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    // ✅ Teacher uploaded PDFs load karein
    setLoading(true)
    setTimeout(() => {
      setNotes(teacherNotes)
      setLoading(false)
    }, 500)
  }, [])

  // ✅ Categories from teacher uploaded notes
  const categories = ['all', ...new Set(notes.map(n => n.category))]

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || note.category === filter
    return matchesSearch && matchesFilter
  })

  // ✅ Download handler
  const handleDownload = (pdfUrl: string, title: string) => {
    toast.success(`📥 Downloading ${title}...`)
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = pdfUrl.split('/').pop() || `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => {
      toast.success('✅ PDF downloaded successfully!')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gradient" className="mb-3">📚 Study Notes</Badge>
          <h1 className="text-4xl font-bold gradient-text mb-4">Free PDF Notes</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Download free PDF notes prepared by our expert faculty
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes by title, category, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? 'gradient' : 'outline'}
                size="sm"
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No PDFs found</h3>
            <p className="text-gray-500">No PDFs available in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${note.color}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{note.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {note.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{note.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {note.pages} Pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {note.downloads.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">By: {note.author}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/notes/${note.id}/preview`} className="flex-1">
                    <Button variant="gradient" className="w-full gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleDownload(note.pdfUrl, note.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        {notes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{notes.length}</p>
                <p className="text-sm text-gray-500">Total PDFs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {notes.reduce((acc, n) => acc + n.downloads, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Downloads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {(notes.reduce((acc, n) => acc + n.rating, 0) / notes.length).toFixed(1)}
                </p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {new Set(notes.map(n => n.category)).size}
                </p>
                <p className="text-sm text-gray-500">Categories</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}