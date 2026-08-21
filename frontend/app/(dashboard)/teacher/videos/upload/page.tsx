'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { ArrowLeft, Upload, Video, Loader2, CheckCircle, X } from 'lucide-react'

export default function UploadVideoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    course: '',
    duration: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploadProgress(i)
      }

      // Success
      setLoading(false)
      alert('✅ Video uploaded successfully!')
      setTimeout(() => router.push('/teacher'), 1500)

    } catch (error) {
      setLoading(false)
      alert('Failed to upload video')
    }
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

        <h1 className="text-2xl font-bold gradient-text mb-6">Upload Video</h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter video title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter video description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="">Select Category</option>
                    <option value="SSC">SSC</option>
                    <option value="UPSC">UPSC</option>
                    <option value="Banking">Banking</option>
                    <option value="Railway">Railway</option>
                    <option value="Geography">Geography</option>
                    <option value="Polity">Polity</option>
                    <option value="History">History</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="">Select Course</option>
                    <option value="ssc-cgl">SSC CGL 2024</option>
                    <option value="upsc">UPSC 2024</option>
                    <option value="banking">Banking PO 2024</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>Video File *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-file"
                    required
                  />
                  <label htmlFor="video-file" className="cursor-pointer">
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <Video className="w-8 h-8 text-primary" />
                        <span className="font-medium">{selectedFile.name}</span>
                        <span className="text-sm text-gray-500">
                          ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">MP4, AVI, MOV (Max 500MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {uploadProgress > 0 && (
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
                    Upload Video
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