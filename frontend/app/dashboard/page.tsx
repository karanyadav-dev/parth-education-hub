'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import {
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  User,
  BarChart3,
  FileText,
  LogOut,
  Home,
  GraduationCap,
  Clock,
  TrendingUp,
  Calendar,
  Video,
  Users,
  Settings
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  const recentCourses = [
    { title: 'Geography Complete Course', progress: 75, status: 'In Progress' },
    { title: 'Polity Complete Course', progress: 45, status: 'In Progress' },
    { title: 'History Complete Course', progress: 100, status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tests Attempted</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10">
                  <BarChart3 className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Score</p>
                  <p className="text-2xl font-bold">72%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>
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
                      <Badge className={course.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                  <Link href={`/courses/${idx}`}>
                    <Button variant="ghost" size="sm">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/test-series">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
              <Award className="w-5 h-5" />
              <span className="text-xs">Practice Tests</span>
            </Button>
          </Link>
          <Link href="/current-affairs">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Current Affairs</span>
            </Button>
          </Link>
          <Link href="/my-courses">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">My Courses</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1">
              <User className="w-5 h-5" />
              <span className="text-xs">My Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}