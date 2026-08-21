'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Award,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  Flame,
  CheckCircle,
  AlertCircle,
  Info,
  Play,
  FileText,
  Download,
  ShoppingCart,
  Eye,
  ArrowRight
} from 'lucide-react'

export default function CoursesPage() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  // Sample Courses Data
  const courses = [
    {
      id: '1',
      title: 'Geography Complete Course',
      description: 'Master Geography for all competitive exams with India\'s best faculty',
      category: 'Geography',
      price: 999,
      discount: 40,
      finalPrice: 599,
      duration: '120 hours',
      level: 'Beginner to Advanced',
      students: 25000,
      rating: 4.9,
      image: '/courses/geography.jpg',
      isPopular: true,
      isFeatured: true,
      faculty: 'Dr. Rajesh Kumar'
    },
    {
      id: '2',
      title: 'Polity Complete Course',
      description: 'Master Indian Constitution and Polity for all competitive exams',
      category: 'Polity',
      price: 899,
      discount: 35,
      finalPrice: 584,
      duration: '100 hours',
      level: 'Beginner to Advanced',
      students: 18000,
      rating: 4.8,
      image: '/courses/polity.jpg',
      isPopular: true,
      isFeatured: false,
      faculty: 'Prof. Amit Singh'
    },
    {
      id: '3',
      title: 'History Complete Course',
      description: 'Ancient, Medieval, Modern History - complete for all government exams',
      category: 'History',
      price: 899,
      discount: 35,
      finalPrice: 584,
      duration: '110 hours',
      level: 'Beginner to Advanced',
      students: 15000,
      rating: 4.7,
      image: '/courses/history.jpg',
      isPopular: false,
      isFeatured: false,
      faculty: 'Dr. Suresh Sharma'
    },
    {
      id: '4',
      title: 'World Map Complete Course',
      description: 'Complete World Map for competitive exams with interactive learning',
      category: 'World Map',
      price: 799,
      discount: 30,
      finalPrice: 559,
      duration: '80 hours',
      level: 'Beginner to Advanced',
      students: 12000,
      rating: 4.6,
      image: '/courses/world-map.jpg',
      isPopular: false,
      isFeatured: false,
      faculty: 'Dr. Rajesh Kumar'
    },
    {
      id: '5',
      title: 'Economics Complete Course',
      description: 'Complete Economics for all competitive exams with case studies',
      category: 'Economics',
      price: 799,
      discount: 30,
      finalPrice: 559,
      duration: '90 hours',
      level: 'Beginner to Advanced',
      students: 10000,
      rating: 4.7,
      image: '/courses/economics.jpg',
      isPopular: false,
      isFeatured: false,
      faculty: 'Prof. Amit Singh'
    },
    {
      id: '6',
      title: 'Biology Complete Course',
      description: 'Complete Biology for NEET and competitive exams',
      category: 'Biology',
      price: 699,
      discount: 25,
      finalPrice: 524,
      duration: '70 hours',
      level: 'Beginner to Advanced',
      students: 8000,
      rating: 4.5,
      image: '/courses/biology.jpg',
      isPopular: false,
      isFeatured: false,
      faculty: 'Dr. Suresh Sharma'
    }
  ]

  const categories = ['All', 'Geography', 'Polity', 'History', 'World Map', 'Economics', 'Biology']

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.category.toLowerCase() === filter)

  const filteredSearch = searchQuery === '' 
    ? filteredCourses 
    : filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="gradient" className="mb-4 bg-white/20">
            📚 Learn Anytime, Anywhere
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Comprehensive courses for all competitive exams with India's best faculty
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button 
                key={cat}
                variant={filter === cat.toLowerCase() || (filter === 'all' && cat === 'All') ? 'gradient' : 'outline'}
                onClick={() => setFilter(cat.toLowerCase())}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">200+</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">10M+</p>
              <p className="text-sm text-gray-500">Registered Users</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">4.8</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">50K+</p>
              <p className="text-sm text-gray-500">Free Videos</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading courses...</p>
          </div>
        ) : filteredSearch.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-500">Try changing the filter or search</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSearch.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col ${course.isFeatured ? 'border-2 border-secondary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="gradient" className="text-xs">
                        {course.discount}% OFF
                      </Badge>
                      {course.isPopular && (
                        <Badge variant="success" className="text-xs">
                          🔥 Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <GraduationCap className="w-4 h-4" />
                        <span>{course.faculty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <span>{course.rating} (4.5K+ reviews)</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-secondary">₹{course.finalPrice}</span>
                        <span className="text-sm text-gray-400 line-through">₹{course.price}</span>
                        <Badge variant="success" className="text-xs">
                          Save {course.discount}%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <Button variant="gradient" className="w-full gap-2">
                        View Course
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="gap-2">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary to-accent text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Start Your Learning Journey Today
          </h2>
          <p className="text-white/80 mb-6">
            Join millions of students and start preparing for your dream career
          </p>
          <Link href="/courses">
            <Button variant="default" className="bg-white text-primary hover:bg-white/90">
              Explore All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}