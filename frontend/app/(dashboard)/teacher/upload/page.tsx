'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { TeacherUpload } from '@/app/components/TeacherUpload'

export default function TeacherUploadPage() {
  const [selectedCategory, setSelectedCategory] = useState('ssc')

  const categories = [
    { id: 'ssc', label: 'SSC' },
    { id: 'upsc', label: 'UPSC' },
    { id: 'banking', label: 'Banking' },
    { id: 'railway', label: 'Railway' },
    { id: 'police', label: 'Police' },
    { id: 'defence', label: 'Defence' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'rpsc', label: 'RPSC' },
    { id: 'rssb', label: 'RSSB' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold gradient-text mb-2">Upload Content</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Upload videos, PDFs, and images for your students
        </p>

        {/* Category Tabs */}
        <Tabs defaultValue="ssc" className="mb-6">
          <TabsList className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Video Upload */}
                <TeacherUpload
                  category={cat.id}
                  fileType="video"
                  subType="lectures"
                />

                {/* PDF Upload */}
                <TeacherUpload
                  category={cat.id}
                  fileType="pdf"
                  subType="notes"
                />

                {/* Image Upload */}
                <TeacherUpload
                  category={cat.id}
                  fileType="image"
                  subType="thumbnails"
                />

                {/* Test Series PDF */}
                <TeacherUpload
                  category={cat.id}
                  fileType="pdf"
                  subType="test-series"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}