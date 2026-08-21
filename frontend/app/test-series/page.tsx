'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import {
  BarChart3,
  Clock,
  Users,
  Award,
  Filter,
  Search,
  Star,
  ChevronRight,
  Timer,
  FileQuestion,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

export default function TestSeriesPage() {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  // Sample Test Data
  const tests = [
    {
      id: '1',
      title: 'SSC CGL 2024 - Full Mock Test 1',
      description: 'Complete SSC CGL 2024 mock test with all sections',
      category: 'SSC',
      totalQuestions: 100,
      duration: 60,
      totalMarks: 200,
      negativeMarks: 0.25,
      price: 0,
      isFree: true,
      students: 12500,
      rating: 4.8,
      difficulty: 'Medium'
    },
    {
      id: '2',
      title: 'UPSC Prelims 2024 - Test Series',
      description: 'UPSC Prelims practice test with GS and CSAT',
      category: 'UPSC',
      totalQuestions: 100,
      duration: 120,
      totalMarks: 200,
      negativeMarks: 0.33,
      price: 99,
      isFree: false,
      students: 8500,
      rating: 4.9,
      difficulty: 'Hard'
    },
    {
      id: '3',
      title: 'Banking PO 2024 - Chapter Test',
      description: 'Banking PO chapter-wise test for practice',
      category: 'Banking',
      totalQuestions: 50,
      duration: 30,
      totalMarks: 50,
      negativeMarks: 0,
      price: 0,
      isFree: true,
      students: 6800,
      rating: 4.7,
      difficulty: 'Easy'
    },
    {
      id: '4',
      title: 'Railway RRB 2024 - Full Test',
      description: 'Railway RRB NTPC full mock test',
      category: 'Railway',
      totalQuestions: 75,
      duration: 45,
      totalMarks: 75,
      negativeMarks: 0.25,
      price: 49,
      isFree: false,
      students: 4200,
      rating: 4.6,
      difficulty: 'Medium'
    },
    {
      id: '5',
      title: 'SSC CHSL 2024 - Practice Set',
      description: 'SSC CHSL Tier 1 practice test',
      category: 'SSC',
      totalQuestions: 25,
      duration: 30,
      totalMarks: 50,
      negativeMarks: 0,
      price: 0,
      isFree: true,
      students: 3200,
      rating: 4.5,
      difficulty: 'Easy'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600'
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600'
      case 'Hard': return 'bg-red-500/10 text-red-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  const filteredTests = filter === 'all' 
    ? tests 
    : tests.filter(test => test.category.toLowerCase() === filter)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="gradient" className="mb-4 bg-white/20">
            Practice Mode
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Test Series
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Practice with India's best test series for competitive exams
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'gradient' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={filter === 'ssc' ? 'gradient' : 'outline'}
              onClick={() => setFilter('ssc')}
              size="sm"
            >
              SSC
            </Button>
            <Button 
              variant={filter === 'upsc' ? 'gradient' : 'outline'}
              onClick={() => setFilter('upsc')}
              size="sm"
            >
              UPSC
            </Button>
            <Button 
              variant={filter === 'banking' ? 'gradient' : 'outline'}
              onClick={() => setFilter('banking')}
              size="sm"
            >
              Banking
            </Button>
            <Button 
              variant={filter === 'railway' ? 'gradient' : 'outline'}
              onClick={() => setFilter('railway')}
              size="sm"
            >
              Railway
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Test Cards */}
      <section className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading tests...</p>
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-12">
            <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tests found</h3>
            <p className="text-gray-500">Try changing the filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant={test.isFree ? 'success' : 'default'}>
                        {test.isFree ? 'FREE' : `₹${test.price}`}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <FileQuestion className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <span className="block text-xs text-gray-500">Questions</span>
                        <span className="font-semibold">{test.totalQuestions}</span>
                      </div>
                      <div className="text-center">
                        <Timer className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <span className="block text-xs text-gray-500">Duration</span>
                        <span className="font-semibold">{test.duration} min</span>
                      </div>
                      <div className="text-center">
                        <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <span className="block text-xs text-gray-500">Marks</span>
                        <span className="font-semibold">{test.totalMarks}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        {test.students.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        {test.rating}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/test-series/${test.id}`} className="w-full">
                      <Button variant="gradient" className="w-full gap-2">
                        Start Test
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12 mt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-gray-500">Total Tests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">25K+</div>
              <div className="text-sm text-gray-500">Students Attempted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.8</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-500">Free Tests Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary to-accent text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Test Your Skills?
          </h2>
          <p className="text-white/80 mb-6">
            Join thousands of students and start practicing today
          </p>
          <Button variant="default" className="bg-white text-primary hover:bg-white/90">
            Start Free Test
          </Button>
        </div>
      </section>
    </div>
  )
}