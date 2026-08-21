'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, UserCheck, Users, Award, Clock } from 'lucide-react'

export default function CetPage() {
  const exams = [
    { name: 'CET 10+2 (Rajasthan)', description: 'Rajasthan CET 10+2 Level Exam' },
    { name: 'CET Graduate (Rajasthan)', description: 'Rajasthan CET Graduate Level Exam' },
    { name: 'CET 10+2 (UP)', description: 'Uttar Pradesh CET 10+2 Level Exam' },
    { name: 'CET Graduate (UP)', description: 'Uttar Pradesh CET Graduate Level Exam' },
    { name: 'CET 10+2 (Bihar)', description: 'Bihar CET 10+2 Level Exam' },
    { name: 'CET Graduate (Bihar)', description: 'Bihar CET Graduate Level Exam' },
    { name: 'CET 10+2 (MP)', description: 'Madhya Pradesh CET 10+2 Level Exam' },
    { name: 'CET Graduate (MP)', description: 'Madhya Pradesh CET Graduate Level Exam' },
    { name: 'CET 10+2 (Haryana)', description: 'Haryana CET 10+2 Level Exam' },
    { name: 'CET Graduate (Haryana)', description: 'Haryana CET Graduate Level Exam' },
    { name: 'CET 10+2 (Punjab)', description: 'Punjab CET 10+2 Level Exam' },
    { name: 'CET Graduate (Punjab)', description: 'Punjab CET Graduate Level Exam' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/all-exams">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Exams
          </Button>
        </Link>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <UserCheck className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CET (10+2 & Graduate)</h1>
              <p className="text-white/80">Common Eligibility Test for Government Jobs</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {exams.map((exam, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{exam.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                <Badge variant="outline" className="mt-2">CET</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}