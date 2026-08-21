'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Video, FileText, Image, Download, Eye } from 'lucide-react'

export default function StudentMaterialsPage() {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ Teacher uploaded files fetch karein
    fetchTeacherFiles()
  }, [])

  const fetchTeacherFiles = async () => {
    try {
      const response = await fetch('/api/teacher/materials')
      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFileIcon = (type: string) => {
    if (type === 'video') return <Video className="w-8 h-8 text-purple-500" />
    if (type === 'pdf') return <FileText className="w-8 h-8 text-red-500" />
    if (type === 'image') return <Image className="w-8 h-8 text-blue-500" />
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  if (loading) {
    return <div className="text-center py-12">Loading materials...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold gradient-text mb-2">Study Materials</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Teacher uploaded study materials
        </p>

        {files.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No materials uploaded yet</p>
            <p className="text-sm text-gray-400">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold">{file.name}</h3>
                      <p className="text-sm text-gray-500">{file.category.toUpperCase()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="gradient" size="sm" className="gap-1">
                          <Download className="w-3 h-3" /> Download
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="w-3 h-3" /> Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}