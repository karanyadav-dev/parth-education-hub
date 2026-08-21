'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import {
  ArrowLeft,
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  Play,
  Download,
  Share2,
  ShoppingCart,
  CheckCircle,
  Video,
  FileText,
  GraduationCap,
  User,
  Calendar,
  TrendingUp
} from 'lucide-react'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string || ''

  const [loading, setLoading] = useState(false)

  // Course data based on slug
  const courseData: Record<string, any> = {
    'foundation-courses': {
      title: 'Foundation Courses',
      description: 'Complete foundation courses for competitive exams',
      category: 'Foundation',
      price: 999,
      discount: 40,
      finalPrice: 599,
      duration: '120 hours',
      level: 'Beginner to Advanced',
      students: 25000,
      rating: 4.9,
      faculty: 'Expert Faculty',
      image: '/courses/foundation.jpg',
      features: [
        'Physics Complete Course',
        'Chemistry Complete Course',
        'Biology Complete Course',
        'History Complete Course',
        'Geography Complete Course',
        'Polity Complete Course'
      ],
      syllabus: [
        'Physics: Mechanics, Thermodynamics, Optics',
        'Chemistry: Organic, Inorganic, Physical',
        'Biology: Botany, Zoology, Genetics',
        'History: Ancient, Medieval, Modern',
        'Geography: Physical, Indian, World',
        'Polity: Constitution, Governance, Rights'
      ]
    },
    'ssc-cgl': {
      title: 'SSC CGL Complete Course',
      description: 'Complete SSC CGL preparation with expert faculty',
      category: 'SSC',
      price: 999,
      discount: 40,
      finalPrice: 599,
      duration: '150 hours',
      level: 'Beginner to Advanced',
      students: 35000,
      rating: 4.9,
      faculty: 'Expert Faculty',
      features: [
        'Quantitative Aptitude',
        'English Language',
        'Reasoning',
        'General Knowledge',
        'Computer Awareness',
        'Previous Year Papers'
      ],
      syllabus: [
        'Quantitative Aptitude: Arithmetic, Algebra, Geometry',
        'English: Grammar, Vocabulary, Comprehension',
        'Reasoning: Logical, Analytical, Puzzle',
        'GK: History, Geography, Polity, Economy',
        'Computer: Basics, MS Office, Internet'
      ]
    },
    'ssc-chsl': {
      title: 'SSC CHSL Complete Course',
      description: 'Complete SSC CHSL preparation for Tier 1 & 2',
      category: 'SSC',
      price: 799,
      discount: 35,
      finalPrice: 519,
      duration: '100 hours',
      level: 'Beginner to Advanced',
      students: 20000,
      rating: 4.8,
      faculty: 'Expert Faculty',
      features: [
        'Quantitative Aptitude',
        'English Language',
        'Reasoning',
        'General Knowledge',
        'Previous Year Papers'
      ],
      syllabus: [
        'Quantitative Aptitude: Arithmetic, Algebra',
        'English: Grammar, Vocabulary, Comprehension',
        'Reasoning: Logical, Analytical',
        'GK: History, Geography, Polity'
      ]
    },
    'ssc-mts': {
      title: 'SSC MTS Complete Course',
      description: 'Complete SSC MTS preparation for Tier 1',
      category: 'SSC',
      price: 599,
      discount: 30,
      finalPrice: 419,
      duration: '60 hours',
      level: 'Beginner to Intermediate',
      students: 15000,
      rating: 4.7,
      faculty: 'Expert Faculty',
      features: [
        'Quantitative Aptitude',
        'English Language',
        'Reasoning',
        'General Knowledge'
      ],
      syllabus: [
        'Quantitative Aptitude: Basics',
        'English: Grammar, Vocabulary',
        'Reasoning: Logical',
        'GK: General Awareness'
      ]
    },
    'ssc-gd': {
      title: 'SSC GD Complete Course',
      description: 'Complete SSC GD Constable preparation',
      category: 'SSC',
      price: 499,
      discount: 25,
      finalPrice: 374,
      duration: '50 hours',
      level: 'Beginner to Intermediate',
      students: 12000,
      rating: 4.6,
      faculty: 'Expert Faculty',
      features: [
        'Quantitative Aptitude',
        'English Language',
        'Reasoning',
        'General Knowledge',
        'Physical Test Preparation'
      ],
      syllabus: [
        'Quantitative Aptitude: Basics',
        'English: Grammar, Vocabulary',
        'Reasoning: Logical',
        'GK: Current Affairs',
        'Physical: Running, Height, Chest'
      ]
    }
  }

  const course = courseData[slug]

  useEffect(() => {
    if (!course && !loading) {
      setLoading(false)
    }
  }, [course, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Course Not Found</h1>
          <p className="text-gray-500 mt-2">The course you are looking for does not exist.</p>
          <Link href="/courses">
            <Button variant="gradient" className="mt-4">Browse Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </Link>

        {/* Course Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <Badge variant="gradient" className="bg-white/20 mb-2">
                {course.category}
              </Badge>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-white/80 mt-2">{course.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹{course.finalPrice}</div>
              <div className="text-sm text-white/60 line-through">₹{course.price}</div>
              <Badge variant="success" className="mt-2">Save {course.discount}%</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle>Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.syllabus.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Faculty</p>
                      <p className="font-medium">{course.faculty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="font-medium">{course.level}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button variant="gradient" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Enroll Now - ₹{course.finalPrice}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">This Course Includes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" />
                    <span>150+ Video Lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Downloadable PDF Notes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Lifetime Access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}