'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import { ArrowLeft, Search, UserPlus, Eye, Mail, Phone, MoreVertical } from 'lucide-react'

export default function ManageStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [students] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@email.com', phone: '9876543210', course: 'SSC CGL 2024', progress: 75, status: 'Active' },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', phone: '9876543211', course: 'UPSC 2024', progress: 45, status: 'Active' },
    { id: 3, name: 'Amit Sharma', email: 'amit@email.com', phone: '9876543212', course: 'Banking PO 2024', progress: 30, status: 'Inactive' },
    { id: 4, name: 'Neha Gupta', email: 'neha@email.com', phone: '9876543213', course: 'SSC CGL 2024', progress: 90, status: 'Active' },
  ])

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/teacher">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold gradient-text">Manage Students</h1>
          <Button variant="gradient">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search students by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({students.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-semibold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {student.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.course}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{student.progress}%</span>
                      </div>
                    </div>
                    <Badge className={student.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'}>
                      {student.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}