'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { toast } from 'sonner'
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface FileUploadProps {
  onUploadSuccess?: (url: string, publicId: string) => void
  folder?: string
  accept?: string
  label?: string
}

export function FileUpload({ 
  onUploadSuccess, 
  folder = 'uploads',
  accept = 'image/*,video/*,application/pdf',
  label = 'Upload File'
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      setUploading(true)
      setProgress(0)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      toast.success('File uploaded successfully! 🎉')
      onUploadSuccess?.(data.url, data.publicId)

    } catch (error: any) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(100)
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
      />
      <label htmlFor="file-upload">
        <Button variant="outline" as="span" className="cursor-pointer" disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              {label}
            </>
          )}
        </Button>
      </label>
    </div>
  )
}