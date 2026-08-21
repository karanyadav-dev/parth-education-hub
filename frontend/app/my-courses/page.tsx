'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { BookOpen, Play, ArrowRight, CheckCircle, Clock } from 'lucide-react'

// ✅ COMPONENT - SAHI TARIKA SE EXPORT
export default function MyCoursesPage() {
  const myCourses = [
    { id: 1, title: 'Geography Complete Course', progress: 75, status: 'In Progress' },
    { id: 2, title: 'Polity Complete Course', progress: 45, status: 'In Progress' },
    { id: 3, title: 'History Complete Course', progress: 100, status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Courses</h1>
            <p className="text-gray-500">Track your learning progress</p>
          </div>
          <Link href="/courses">
            <Button variant="gradient">Browse More Courses</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {myCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <Badge className={course.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}>
                        {course.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="gradient" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {myCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No courses yet</h3>
            <p className="text-gray-500">Start your learning journey by enrolling in a course</p>
            <Link href="/courses">
              <Button variant="gradient" className="mt-4">Browse Courses</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}