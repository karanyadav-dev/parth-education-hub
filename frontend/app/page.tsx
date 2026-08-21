'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  Search,
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  BookOpen,
  GraduationCap,
  FileText,
  Briefcase,
  BarChart3,
  Shield,
  Play,
  ChevronRight,
  Globe,
  Video,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Layers,
  Target,
  TrendingUp,
  Zap,
  CheckCircle,
  Sparkles,
  Building2,
  UserCheck,
  Library,
  Download,
  Eye
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // ✅ All Exams
  const examCategories = [
    { name: 'UPSC & State PSC', icon: Shield, color: 'from-orange-500 to-red-500', count: '10+ Exams' },
    { name: 'SSC Exams', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', count: '8+ Exams' },
    { name: 'Banking Exams', icon: BarChart3, color: 'from-emerald-500 to-teal-500', count: '10+ Exams' },
    { name: 'Railway Exams', icon: Globe, color: 'from-purple-500 to-pink-500', count: '7+ Exams' },
    { name: 'CET (10+2 & Graduate)', icon: UserCheck, color: 'from-teal-500 to-cyan-600', count: '10+ Exams' },
    { name: 'CUET', icon: Library, color: 'from-purple-600 to-indigo-600', count: '6+ Exams' },
    { name: 'RPSC', icon: MapPin, color: 'from-red-500 to-orange-500', count: '14+ Exams' },
    { name: 'RSSB', icon: Building2, color: 'from-amber-500 to-yellow-600', count: '20+ Exams' },
    { name: 'Police Exams', icon: Shield, color: 'from-blue-600 to-indigo-600', count: '10+ Exams' },
    { name: 'Defence Exams', icon: Target, color: 'from-indigo-500 to-blue-500', count: '10+ Exams' },
    { name: 'Teaching Exams', icon: BookOpen, color: 'from-green-500 to-emerald-500', count: '10+ Exams' },
  ]

  // ✅ NOTES DATA
  const notesData = [
    {
      id: 1,
      title: 'Geography Complete Notes',
      description: 'Complete Geography notes for competitive exams',
      category: 'Geography',
      pages: 120,
      downloads: 15000,
      rating: 4.9,
      image: '/notes/geography.jpg',
      isFree: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      title: 'Polity Complete Notes',
      description: 'Indian Constitution and Polity notes',
      category: 'Polity',
      pages: 95,
      downloads: 12000,
      rating: 4.8,
      image: '/notes/polity.jpg',
      isFree: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'History Complete Notes',
      description: 'Ancient, Medieval, Modern History notes',
      category: 'History',
      pages: 110,
      downloads: 10000,
      rating: 4.7,
      image: '/notes/history.jpg',
      isFree: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Economics Complete Notes',
      description: 'Complete Economics notes for competitive exams',
      category: 'Economics',
      pages: 85,
      downloads: 8000,
      rating: 4.6,
      image: '/notes/economics.jpg',
      isFree: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      title: 'Biology Complete Notes',
      description: 'Complete Biology notes for NEET and other exams',
      category: 'Biology',
      pages: 75,
      downloads: 6000,
      rating: 4.5,
      image: '/notes/biology.jpg',
      isFree: true,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 6,
      title: 'World Map Notes',
      description: 'Complete World Map with important locations',
      category: 'World Map',
      pages: 60,
      downloads: 5000,
      rating: 4.4,
      image: '/notes/world-map.jpg',
      isFree: true,
      color: 'from-indigo-500 to-blue-500'
    },
  ]

  const features = [
    { 
      icon: Video, 
      title: 'Free Videos', 
      description: 'Access thousands of free educational videos',
      link: '/courses',
      color: 'blue'
    },
    { 
      icon: Users, 
      title: 'Expert Faculty', 
      description: 'Learn from India\'s best teachers',
      link: '/about',
      color: 'green'
    },
    { 
      icon: Clock, 
      title: 'Learn Anytime', 
      description: '24/7 access to all study materials',
      link: '/courses',
      color: 'orange'
    },
    { 
      icon: FileText, 
      title: 'Free Notes', 
      description: 'Download free PDF notes for all subjects',
      link: '/notes',
      color: 'purple'
    },
  ]

  const testimonials = [
    {
      name: 'Rahul Kumar',
      role: 'UPSC CSE 2024 Qualified',
      content: 'Parth Education Hub helped me achieve my dream. The faculty and study materials are world-class!',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      role: 'SSC CGL 2024 Qualified',
      content: 'The mock tests and live classes are amazing. I cleared my exam in the first attempt!',
      rating: 5,
    },
    {
      name: 'Amit Sharma',
      role: 'Bank PO Success',
      content: 'Best platform for competitive exam preparation. Highly recommended for all aspirants!',
      rating: 5,
    },
  ]

  const { ref: statsRef } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/YPS_6414.JPG.jpeg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/40 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gradient" className="mb-4 text-sm font-medium">
                🚀 India's Most Trusted Learning Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Learn Today,{' '}
                <span className="gradient-text">Lead Tomorrow</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join millions of students preparing for competitive exams with India's best faculty and study materials.
              </p>

              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="What do you want to learn today? Search courses, exams, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-12 pr-32 py-6 text-base bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary rounded-2xl"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Button 
                  variant="gradient" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-gray-300 text-sm">Popular:</span>
                {['UPSC', 'SSC CGL', 'Bank PO', 'Railway', 'CET', 'CUET', 'RPSC', 'RSSB'].map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-white/10 border-white/20 text-gray-200"
                    onClick={() => {
                      setSearchQuery(tag)
                      router.push(`/search?q=${encodeURIComponent(tag)}`)
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* All Exams Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-3">All Exams</Badge>
            <h2 className="heading-2 mb-4">
              Explore All Exams at <span className="gradient-text">Parth</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive preparation for all competitive exams with expert faculty
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {examCategories.map((exam, idx) => (
              <motion.div key={idx} variants={item}>
                <Link href={`/exams/${exam.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '')}`}>
                  <Card className="hover:shadow-xl transition-all hover:-translate-y-1 hover:border-secondary/50 cursor-pointer h-full">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exam.color} mx-auto flex items-center justify-center mb-3`}>
                        <exam.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm md:text-base">{exam.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{exam.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/all-exams">
              <Button variant="gradient" className="gap-2">
                View All Exams <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 🆕 NOTES SECTION - ADDED */}
      {/* ========================================== */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-3">📚 Free Notes</Badge>
            <h2 className="heading-2 mb-4">
              Download <span className="gradient-text">Free Notes</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete PDF notes for all subjects - Geography, Polity, History, Economics, Biology & more
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {notesData.map((note, idx) => (
              <motion.div key={note.id} variants={item}>
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                  <div className={`h-2 bg-gradient-to-r ${note.color}`}></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="success" className="text-xs">Free PDF</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-3 h-3" />
                        {note.downloads.toLocaleString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {note.pages} Pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {note.rating}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {note.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={`/notes/${note.id}`} className="flex-1">
                      <Button variant="gradient" className="w-full gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </Link>
                    <Link href={`/notes/${note.id}/preview`}>
                      <Button variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/notes">
              <Button variant="outline" className="gap-2">
                View All Notes <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/95 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-3">Why Choose Parth</Badge>
            <h2 className="heading-2 mb-4">
              What Makes Us <span className="text-accent">Different</span>
            </h2>
            <p className="text-gray-300">
              Come with an open mind, hungry to learn, and experience unmatched personal and professional growth.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={item}>
                <Link href={feature.link} className="block h-full">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-7 h-7 text-accent" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                      <div className="mt-3 text-accent text-sm font-medium flex items-center justify-center gap-1">
                        Learn More <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-3">Success Stories</Badge>
            <h2 className="heading-2 mb-4">
              Our <span className="gradient-text">Students</span> Speak
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={item}>
                <Card className="h-full hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-accent mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gradient" className="mb-3">About Parth Education Hub</Badge>
              <h2 className="heading-2 mb-4">
                India's Most Trusted <span className="gradient-text">Learning Platform</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We love learning. Through our innovative solutions, we encourage ourselves, our teams, and our Students to grow.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We strive to understand the big picture and how we contribute to the company's objectives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button variant="gradient">
                    <Play className="w-4 h-4 mr-2" /> Watch Free Videos
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-primary text-white border-primary">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold">10M+</p>
                  <p className="text-gray-300 text-sm">Registered Users</p>
                </CardContent>
              </Card>
              <Card className="bg-primary text-white border-primary">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-gray-300 text-sm">Free Videos</p>
                </CardContent>
              </Card>
              <Card className="bg-primary text-white border-primary">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-gray-300 text-sm">Active Courses</p>
                </CardContent>
              </Card>
              <Card className="bg-primary text-white border-primary">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold">5M+</p>
                  <p className="text-gray-300 text-sm">App Downloads</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-white mb-4">
              Start Your <span className="text-primary">Success Journey</span> Today
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join millions of students and start preparing for your dream career with India's best learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button variant="default" size="xl" className="bg-white text-primary hover:bg-white/90">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
              </Link>
              <Link href="/test-series">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  Start Test Series
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}