'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  TrendingDown,  // ✅ YEH LINE ADD KI
  Activity,
  LogOut,
  UserPlus,
  FileText,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Bell,
  BarChart3,
  PieChart,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    console.log('🔍 Token:', token)
    console.log('👤 User:', userData)

    if (!token) {
      console.log('❌ No token found, redirecting to login...')
      router.push('/auth/login')
      return
    }

    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
        console.log('✅ User loaded:', parsed)
      } catch (e) {
        console.log('❌ Error parsing user data')
      }
    }
    setLoading(false)
  }, [router])

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  // ✅ Stats data
  const stats = [
    { title: 'Total Users', value: '25,847', icon: Users, change: '+12%', color: 'blue' },
    { title: 'Total Courses', value: '156', icon: BookOpen, change: '+8%', color: 'green' },
    { title: 'Total Revenue', value: '₹12,45,000', icon: DollarSign, change: '+22%', color: 'emerald' },
    { title: 'New Orders', value: '342', icon: ShoppingCart, change: '-3%', color: 'orange' },
  ]

  // ✅ Recent orders
  const recentOrders = [
    { id: '#ORD-001', user: 'Rahul Kumar', course: 'Geography Complete Course', amount: '₹599', status: 'Completed', date: '2 min ago' },
    { id: '#ORD-002', user: 'Priya Singh', course: 'Polity Complete Course', amount: '₹584', status: 'Pending', date: '15 min ago' },
    { id: '#ORD-003', user: 'Amit Sharma', course: 'History Complete Course', amount: '₹584', status: 'Completed', date: '1 hour ago' },
    { id: '#ORD-004', user: 'Neha Gupta', course: 'World Map Course', amount: '₹559', status: 'Failed', date: '2 hours ago' },
  ]

  // ✅ Recent users
  const recentUsers = [
    { name: 'Rahul Kumar', email: 'rahul@email.com', role: 'Student', status: 'Active', date: '2 min ago' },
    { name: 'Priya Singh', email: 'priya@email.com', role: 'Teacher', status: 'Active', date: '15 min ago' },
    { name: 'Amit Sharma', email: 'amit@email.com', role: 'Student', status: 'Inactive', date: '1 hour ago' },
    { name: 'Neha Gupta', email: 'neha@email.com', role: 'Student', status: 'Active', date: '2 hours ago' },
  ]

  // ✅ Recent courses
  const recentCourses = [
    { title: 'Geography Complete Course', price: '₹599', students: 25000, rating: 4.9, status: 'Published' },
    { title: 'Polity Complete Course', price: '₹584', students: 18000, rating: 4.8, status: 'Published' },
    { title: 'History Complete Course', price: '₹584', students: 15000, rating: 4.7, status: 'Draft' },
    { title: 'World Map Course', price: '₹559', students: 12000, rating: 4.6, status: 'Published' },
  ]

  // ✅ Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-600'
      case 'Pending': return 'bg-yellow-500/10 text-yellow-600'
      case 'Failed': return 'bg-red-500/10 text-red-600'
      case 'Active': return 'bg-green-500/10 text-green-600'
      case 'Inactive': return 'bg-gray-500/10 text-gray-600'
      case 'Published': return 'bg-green-500/10 text-green-600'
      case 'Draft': return 'bg-yellow-500/10 text-yellow-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back{user?.name ? `, ${user.name}` : ''}! Here's what's happening.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="gradient" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {stat.change.startsWith('+') ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders and Users */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.user}</p>
                      <p className="text-sm text-gray-500">{order.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/orders">
                <Button variant="ghost" className="w-full mt-4">View All Orders</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/users">
                <Button variant="ghost" className="w-full mt-4">View All Users</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>💰 {course.price}</span>
                      <span>👥 {course.students.toLocaleString()}</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/courses">
              <Button variant="ghost" className="w-full mt-4">View All Courses</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/courses/add">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
              <CardContent className="p-6 text-center">
                <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Add Course</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/users">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
              <CardContent className="p-6 text-center">
                <UserPlus className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Manage Users</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/tests/add">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Add Test</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/current-affairs/add">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-dashed hover:border-primary">
              <CardContent className="p-6 text-center">
                <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Add Current Affairs</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}