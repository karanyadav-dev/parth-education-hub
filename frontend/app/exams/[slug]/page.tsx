'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { ArrowLeft, BookOpen, Users, Award, Clock, Target, Shield, GraduationCap, BarChart3, Globe, MapPin } from 'lucide-react'

export default function ExamDetailPage() {
  const params = useParams()
  const slug = params?.slug as string || ''

  // Exam data based on slug
  const examData: Record<string, any> = {
    'upsc': {
      name: 'UPSC & State PSC',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      description: 'Union Public Service Commission - India\'s premier central recruiting agency',
      fullDescription: 'UPSC conducts Civil Services Examination for IAS, IPS, IFS, and other Group A and Group B services.',
      exams: ['UPSC CSE', 'IFS', 'IPS', 'IAS', 'State PSC'],
      pattern: 'Prelims + Mains + Interview',
      subjects: ['History', 'Geography', 'Polity', 'Economics', 'Science', 'Current Affairs'],
      eligibility: 'Bachelor\'s degree in any discipline'
    },
    'ssc': {
      name: 'SSC Exams',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Staff Selection Commission - Conducts exams for Group B and Group C posts',
      fullDescription: 'SSC conducts CGL, CHSL, CPO, MTS, and other exams for central government jobs.',
      exams: ['SSC CGL', 'SSC CHSL', 'SSC CPO', 'SSC MTS', 'SSC GD'],
      pattern: 'Tier 1 + Tier 2 + Tier 3',
      subjects: ['Quantitative Aptitude', 'English', 'Reasoning', 'GK'],
      eligibility: '10th/12th/Graduation depending on post'
    },
    'banking': {
      name: 'Banking Exams',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-500',
      description: 'Banking sector exams for PO and Clerk positions',
      fullDescription: 'Banking exams are conducted by IBPS, SBI, and RBI for various positions.',
      exams: ['SBI PO', 'SBI Clerk', 'IBPS PO', 'IBPS Clerk', 'RBI Assistant'],
      pattern: 'Prelims + Mains + Interview',
      subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'GK', 'Computer'],
      eligibility: 'Graduation in any discipline'
    },
    'railway': {
      name: 'Railway Exams',
      icon: Globe,
      color: 'from-purple-500 to-pink-500',
      description: 'Railway Recruitment Board - Non-technical and technical posts',
      fullDescription: 'RRB conducts NTPC, Group D, ALP, and other railway exams.',
      exams: ['RRB NTPC', 'RRB Group D', 'RRB ALP', 'RRB JE'],
      pattern: 'CBT 1 + CBT 2 + Typing Test',
      subjects: ['Mathematics', 'Reasoning', 'GK', 'Science'],
      eligibility: '10th/ITI/Graduation'
    },
    'police': {
      name: 'Police Exams',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      description: 'Police department recruitment for various posts',
      fullDescription: 'Police exams are conducted for constable, SI, and other posts.',
      exams: ['Constable', 'Sub-Inspector', 'DSP', 'State Police'],
      pattern: 'Written + Physical + Interview',
      subjects: ['GK', 'Reasoning', 'Mathematics', 'Hindi/English'],
      eligibility: '10th/12th/Graduation depending on post'
    },
    'defence': {
      name: 'Defence Exams',
      icon: Target,
      color: 'from-indigo-500 to-blue-500',
      description: 'Defence sector exams for Army, Navy, and Air Force',
      fullDescription: 'Defence exams include NDA, CDS, AFCAT, and other defence services.',
      exams: ['NDA', 'CDS', 'AFCAT', 'INET', 'TA'],
      pattern: 'Written + SSB Interview + Medical',
      subjects: ['Mathematics', 'English', 'GK', 'Current Affairs'],
      eligibility: '10th/12th/Graduation'
    },
    'teaching': {
      name: 'Teaching Exams',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      description: 'Teaching sector exams for various government teaching posts',
      fullDescription: 'Teaching exams include CTET, UPTET, REET, and other TETs.',
      exams: ['CTET', 'UPTET', 'REET', 'STET', 'DSSSB'],
      pattern: 'CBT + Interview',
      subjects: ['Child Pedagogy', 'Maths', 'English', 'Hindi', 'Science', 'Social Science'],
      eligibility: 'Graduation + B.Ed/D.El.Ed'
    },
    'state': {
      name: 'State Exams',
      icon: MapPin,
      color: 'from-yellow-500 to-orange-500',
      description: 'State-level exams for various government posts',
      fullDescription: 'State PSC exams are conducted by state public service commissions.',
      exams: ['BPSC', 'MPPSC', 'UPPSC', 'RPSC', 'HPSC'],
      pattern: 'Prelims + Mains + Interview',
      subjects: ['History', 'Geography', 'Polity', 'Economics', 'Current Affairs'],
      eligibility: 'Bachelor\'s degree in any discipline'
    }
  }

  const exam = examData[slug]

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Exam Not Found</h1>
          <p className="text-gray-500 mt-2">The exam you are looking for does not exist.</p>
          <Link href="/all-exams">
            <Button variant="gradient" className="mt-4">View All Exams</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = exam.icon

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/all-exams">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Exams
          </Button>
        </Link>

        {/* Header */}
        <div className={`bg-gradient-to-r ${exam.color} text-white rounded-2xl p-8 mb-8`}>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <IconComponent className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{exam.name}</h1>
              <p className="text-white/80">{exam.description}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Description</p>
                <p className="text-gray-700 dark:text-gray-300">{exam.fullDescription}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exam Pattern</p>
                <p className="font-medium">{exam.pattern}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Eligibility</p>
                <p className="font-medium">{exam.eligibility}</p>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Card */}
          <Card>
            <CardHeader>
              <CardTitle>Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {exam.subjects.map((subject: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="px-3 py-1">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Exam List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {exam.exams.map((e: string, idx: number) => (
                <Badge key={idx} variant="gradient" className="px-4 py-2 text-sm">
                  {e}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}