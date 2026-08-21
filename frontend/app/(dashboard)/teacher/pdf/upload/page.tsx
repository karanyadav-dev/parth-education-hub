'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { ArrowLeft, FileText, Upload, Loader2, CheckCircle, X } from 'lucide-react'

export default function UploadPDFPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    course: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // ✅ File type validation
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only')
        return
      }
      // ✅ File size validation (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size too large. Max 50MB allowed')
        return
      }
      setSelectedFile(file)
      setUploadSuccess(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      alert('Please select a PDF file')
      return
    }

    if (!formData.title) {
      alert('Please enter a title')
      return
    }

    setLoading(true)
    setUploadProgress(0)
    setUploadSuccess(false)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', selectedFile)
      uploadFormData.append('folder', 'pdfs')

      // ✅ Real upload to Cloudinary
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // ✅ Simulate progress for better UX
      setUploadProgress(50)
      await new Promise(resolve => setTimeout(resolve, 300))
      setUploadProgress(100)
      setUploadSuccess(true)

      // ✅ Success message
      alert('✅ PDF uploaded successfully!')
      
      // ✅ Reset form
      setTimeout(() => {
        router.push('/teacher')
      }, 1500)

    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.message || 'Failed to upload PDF. Please try again.')
      setUploadProgress(0)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Remove selected file
  const removeFile = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setUploadSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/teacher">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-2xl font-bold gradient-text mb-6">Upload PDF</h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">PDF Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter PDF title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter PDF description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  disabled={loading}
                />
              </div>

              {/* Category & Course */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    <option value="">Select Category</option>
                    <option value="Notes">Notes</option>
                    <option value="Question Bank">Question Bank</option>
                    <option value="Previous Year">Previous Year</option>
                    <option value="Practice Set">Practice Set</option>
                    <option value="Study Material">Study Material</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    <option value="">Select Course</option>
                    <option value="ssc-cgl">SSC CGL 2024</option>
                    <option value="ssc-chsl">SSC CHSL 2024</option>
                    <option value="upsc">UPSC 2024</option>
                    <option value="banking">Banking PO 2024</option>
                    <option value="railway">Railway RRB 2024</option>
                    <option value="geography">Geography</option>
                    <option value="polity">Polity</option>
                    <option value="history">History</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label>PDF File *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-file"
                    disabled={loading}
                  />
                  <label htmlFor="pdf-file" className="cursor-pointer block">
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <span className="font-medium">{selectedFile.name}</span>
                        <span className="text-sm text-gray-500">
                          ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileText className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF files only (Max 50MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Success */}
              {uploadSuccess && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Upload complete! Redirecting...</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={loading || !selectedFile}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PDF
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}