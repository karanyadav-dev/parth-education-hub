'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, Shield, BookOpen, Users, Award, Clock, MapPin, Target, GraduationCap } from 'lucide-react'

export default function RpscPage() {
  const exams = [
    { name: 'RPSC RAS (State Services)', description: 'Rajasthan Administrative Services' },
    { name: 'RPSC SI (Sub-Inspector)', description: 'RPSC Sub-Inspector Recruitment' },
    { name: 'RPSC Constable', description: 'Rajasthan Police Constable' },
    { name: 'RPSC RJS (Judicial Services)', description: 'Rajasthan Judicial Services' },
    { name: 'RPSC Assistant Professor', description: 'RPSC Assistant Professor Recruitment' },
    { name: 'RPSC School Lecturer', description: 'RPSC School Lecturer Recruitment' },
    { name: 'RPSC Block Education Officer', description: 'RPSC BEO Recruitment' },
    { name: 'RPSC Veterinary Officer', description: 'RPSC Veterinary Officer Recruitment' },
    { name: 'RPSC Agriculture Officer', description: 'RPSC Agriculture Officer Recruitment' },
    { name: 'RPSC Forest Officer', description: 'RPSC Forest Officer Recruitment' },
    { name: 'RPSC Pharmacy Officer', description: 'RPSC Pharmacy Officer Recruitment' },
    { name: 'RPSC Assistant Engineer', description: 'RPSC Assistant Engineer Recruitment' },
    { name: 'RPSC Stenographer', description: 'RPSC Stenographer Recruitment' },
    { name: 'RPSC Patwari', description: 'RPSC Patwari Recruitment' },
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

        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <MapPin className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">RPSC</h1>
              <p className="text-white/80">Rajasthan Public Service Commission Exams</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {exams.map((exam, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{exam.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                <Badge variant="outline" className="mt-2">Rajasthan</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}