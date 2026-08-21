'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, Building2, Users, Award, Clock } from 'lucide-react'

export default function RssbPage() {
  const exams = [
    { name: 'RSSB Rajasthan Police Constable', description: 'Rajasthan Police Constable Recruitment' },
    { name: 'RSSB Rajasthan SI', description: 'Rajasthan Sub-Inspector Recruitment' },
    { name: 'RSSB Rajasthan Patwari', description: 'Rajasthan Patwari Recruitment' },
    { name: 'RSSB Rajasthan Revenue Officer', description: 'Rajasthan Revenue Officer Recruitment' },
    { name: 'RSSB Rajasthan Gram Sevak', description: 'Rajasthan Gram Sevak Recruitment' },
    { name: 'RSSB Rajasthan Teacher (Grade 1)', description: 'Rajasthan Teacher Grade 1 Recruitment' },
    { name: 'RSSB Rajasthan Teacher (Grade 2)', description: 'Rajasthan Teacher Grade 2 Recruitment' },
    { name: 'RSSB Rajasthan Teacher (Grade 3)', description: 'Rajasthan Teacher Grade 3 Recruitment' },
    { name: 'RSSB Rajasthan Lab Assistant', description: 'Rajasthan Lab Assistant Recruitment' },
    { name: 'RSSB Rajasthan Clerk', description: 'Rajasthan Clerk Recruitment' },
    { name: 'RSSB Rajasthan Junior Accountant', description: 'Rajasthan Junior Accountant Recruitment' },
    { name: 'RSSB Rajasthan Stenographer', description: 'Rajasthan Stenographer Recruitment' },
    { name: 'RSSB Rajasthan Forest Guard', description: 'Rajasthan Forest Guard Recruitment' },
    { name: 'RSSB Rajasthan Agriculture Supervisor', description: 'Rajasthan Agriculture Supervisor Recruitment' },
    { name: 'RSSB Rajasthan Animal Husbandry', description: 'Rajasthan Animal Husbandry Recruitment' },
    { name: 'RSSB Rajasthan Fisheries Officer', description: 'Rajasthan Fisheries Officer Recruitment' },
    { name: 'RSSB Rajasthan Cooperative Officer', description: 'Rajasthan Cooperative Officer Recruitment' },
    { name: 'RSSB Rajasthan Panchayat Secretary', description: 'Rajasthan Panchayat Secretary Recruitment' },
    { name: 'RSSB Rajasthan Block Development Officer', description: 'Rajasthan BDO Recruitment' },
    { name: 'RSSB Rajasthan Food Inspector', description: 'Rajasthan Food Inspector Recruitment' },
    { name: 'RSSB Rajasthan Jail Warder', description: 'Rajasthan Jail Warder Recruitment' },
    { name: 'RSSB Rajasthan Fireman', description: 'Rajasthan Fireman Recruitment' },
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

        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">RSSB</h1>
              <p className="text-white/80">Rajasthan Staff Selection Board Exams</p>
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