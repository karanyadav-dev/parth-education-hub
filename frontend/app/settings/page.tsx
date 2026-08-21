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
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { icon: Video, value: '50K+', label: 'Free Videos' },
    { icon: Users, value: '10M+', label: 'Registered Users' },
    { icon: Award, value: '200+', label: 'Active Courses' },
    { icon: Clock, value: '5M+', label: 'App Downloads' },
  ]

  const examCategories = [
    { name: 'UPSC & State PSC', icon: Shield, color: 'from-orange-500 to-red-500' },
    { name: 'SSC Exams', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
    { name: 'Banking Exams', icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
    { name: 'Railway Exams', icon: Globe, color: 'from-purple-500 to-pink-500' },
    { name: 'State Exams', icon: MapPin, color: 'from-yellow-500 to-orange-500' },
    { name: 'Police Exams', icon: Shield, color: 'from-red-500 to-pink-500' },
    { name: 'Defence Exams', icon: Target, color: 'from-indigo-500 to-blue-500' },
    { name: 'Teaching Exams', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
  ]

  // ⚠️ YAHAN SE KHAN SIR COURSES HATAYA GAYA HAI
  const popularCourses = [
    {
      title: 'UPSC & State PSC',
      description: 'UPSC, BPSC, UP-PSC, MP-PSC',
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Foundation Courses',
      description: 'Physics, Chemistry, Biology, History, Geography, Polity',
      icon: Layers,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'NEET | JEE | CUET',
      description: 'Medical, Engineering, and Common University Entrance',
      icon: Target,
      color: 'from-red-500 to-pink-500'
    },
    // Khan Sir Courses ka data yahan se remove kar diya gaya hai
  ]

  const features = [
    { icon: Video, title: 'Free Videos', description: 'Access thousands of free educational videos' },
    { icon: Users, title: 'Expert Faculty', description: 'Learn from India\'s best teachers' },
    { icon: Award, title: 'Certificates', description: 'Earn certificates on course completion' },
    { icon: Clock, title: 'Learn Anytime', description: '24/7 access to all study materials' },
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

  return (
    <>
      {/* Hero Section with Background Photo */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/YPS_6414.JPG.jpeg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Gradient Overlay */}
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

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="What do you want to learn today? Search courses, exams, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-6 text-base bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary rounded-2xl"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Button variant="gradient" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>

              {/* Popular Tags */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-gray-300 text-sm">Popular:</span>
                {['UPSC', 'SSC CGL', 'Bank PO', 'Railway', 'NEET'].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-white/10 border-white/20 text-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-accent">
                      {stat.value}
                    </div>
                    <p className="text-gray-200 text-sm mt-1">{stat.label}</p>
                  </div>
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
                <Link href={`/exams/${exam.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                  <Card className="hover:shadow-xl transition-all hover:-translate-y-1 hover:border-secondary/50 cursor-pointer">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exam.color} mx-auto flex items-center justify-center mb-3`}>
                        <exam.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm md:text-base">{exam.name}</h4>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Section - WITHOUT KHAN SIR */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-3">Popular Courses</Badge>
            <h2 className="heading-2 mb-4">
              Popular <span className="gradient-text">Category</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {popularCourses.map((course, idx) => (
              <motion.div key={idx} variants={item}>
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center text-white mb-4`}>
                      <course.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full gap-2 text-secondary">
                      View Course <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
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
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
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
                We love learning. Through our innovative solutions, we encourage ourselves, our teams, and our Students to grow. We welcome and look for diverse perspectives and opinions because they enhance our decisions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We strive to understand the big picture and how we contribute to the company's objectives. We approach challenges with optimism and harness the power of teamwork to accomplish our goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient">
                  <Play className="w-4 h-4 mr-2" /> Watch Free Videos
                </Button>
                <Button variant="outline">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
              <Button variant="default" size="xl" className="bg-white text-primary hover:bg-white/90">
                <GraduationCap className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                <Play className="w-5 h-5 mr-2" />
                Watch Free Videos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}