'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { toast } from 'sonner'
import { Upload, Loader2, Video, FileText, Image, X, CheckCircle } from 'lucide-react'

interface TeacherUploadProps {
  category: string  // ssc, upsc, banking, railway, etc.
  fileType: 'video' | 'pdf' | 'image'
  subType?: string  // notes, current-affairs, test-series
  onUploadSuccess?: (url: string, fileName: string) => void
}

export function TeacherUpload({ 
  category, 
  fileType, 
  subType = '',
  onUploadSuccess 
}: TeacherUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null)

  const getAcceptType = () => {
    if (fileType === 'video') return 'video/*'
    if (fileType === 'pdf') return 'application/pdf'
    if (fileType === 'image') return 'image/*'
    return '*/*'
  }

  const getIcon = () => {
    if (fileType === 'video') return <Video className="w-12 h-12 text-purple-500" />
    if (fileType === 'pdf') return <FileText className="w-12 h-12 text-red-500" />
    if (fileType === 'image') return <Image className="w-12 h-12 text-blue-500" />
    return <Upload className="w-12 h-12 text-gray-400" />
  }

  const getLabel = () => {
    if (fileType === 'video') return 'Upload Video'
    if (fileType === 'pdf') return 'Upload PDF'
    if (fileType === 'image') return 'Upload Image'
    return 'Upload File'
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    formData.append('type', fileType)
    formData.append('subType', subType)

    try {
      setUploading(true)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedFile({ name: file.name, url: data.url })
      toast.success(`✅ ${getLabel()} uploaded successfully!`)
      onUploadSuccess?.(data.url, data.fileName)

    } catch (error: any) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">{getLabel()}</h3>
            <p className="text-sm text-gray-500">Category: {category.toUpperCase()}</p>
          </div>
          <Badge variant="outline">Teacher Only</Badge>
        </div>

        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <p className="text-gray-500">Uploading...</p>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="font-medium">{uploadedFile.name}</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => window.open(uploadedFile.url, '_blank')}>
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {getIcon()}
              <div>
                <p className="font-medium">{getLabel()}</p>
                <p className="text-sm text-gray-500">Click to browse or drag & drop</p>
              </div>
              <label className="cursor-pointer">
                <Button variant="gradient" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
                <input
                  type="file"
                  accept={getAcceptType()}
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}