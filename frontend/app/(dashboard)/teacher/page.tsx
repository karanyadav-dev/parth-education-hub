'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import {
  Users,
  BookOpen,
  Video,
  FileText,
  Upload,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  Play,
  Download,
  BarChart3,
  Calendar,
  MessageCircle,
  UserPlus,
  Settings
} from 'lucide-react'

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(false)

  const stats = [
    { title: 'Total Students', value: '1,247', icon: Users, color: 'blue' },
    { title: 'Total Courses', value: '8', icon: BookOpen, color: 'green' },
    { title: 'Total Videos', value: '156', icon: Video, color: 'purple' },
    { title: 'Total PDFs', value: '89', icon: FileText, color: 'orange' },
  ]

  const recentCourses = [
    { title: 'Geography Complete Course', students: 25000, rating: 4.9, status: 'Published', date: '2 days ago' },
    { title: 'Polity Complete Course', students: 18000, rating: 4.8, status: 'Draft', date: '5 days ago' },
    { title: 'History Complete Course', students: 15000, rating: 4.7, status: 'Published', date: '1 week ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Teacher Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, Teacher! Manage your courses and students.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="gradient">
            <Upload className="w-4 h-4 mr-2" />
            Upload Content
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/teacher/videos/upload">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
            <CardContent className="p-6 text-center">
              <Video className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Upload Video</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/teacher/pdf/upload">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Upload PDF</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/teacher/tests/create">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
            <CardContent className="p-6 text-center">
              <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Create Test</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/teacher/students">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
            <CardContent className="p-6 text-center">
              <UserPlus className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Manage Students</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👥 {course.students.toLocaleString()} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={course.status === 'Published' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}>
                    {course.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}