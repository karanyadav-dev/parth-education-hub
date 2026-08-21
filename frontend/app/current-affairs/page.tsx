'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  Newspaper,
  Search,
  Calendar,
  Clock,
  Users,
  Eye,
  Download,
  FileText,
  Filter,
  ChevronRight,
  TrendingUp,
  Flame,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

export default function CurrentAffairsPage() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  // Sample Current Affairs Data
  const currentAffairs = [
    {
      id: '1',
      title: '📰 Daily Current Affairs - July 30, 2024',
      description: 'Important current affairs for UPSC, SSC, Banking, and Railway exams',
      category: 'Daily',
      date: 'July 30, 2024',
      readTime: '5 min read',
      views: 12500,
      tags: ['UPSC', 'SSC', 'Banking', 'Railway'],
      isFree: true,
      featured: true
    },
    {
      id: '2',
      title: '📰 Weekly Current Affairs - Week 4 July 2024',
      description: 'Weekly compilation of all important current affairs with MCQs',
      category: 'Weekly',
      date: 'July 28, 2024',
      readTime: '15 min read',
      views: 8500,
      tags: ['Weekly', 'Compilation'],
      isFree: true,
      featured: false
    },
    {
      id: '3',
      title: '📰 Monthly Current Affairs - June 2024',
      description: 'Complete monthly current affairs PDF with practice questions',
      category: 'Monthly',
      date: 'July 1, 2024',
      readTime: '30 min read',
      views: 4200,
      tags: ['Monthly', 'PDF', 'MCQs'],
      isFree: true,
      featured: false
    },
    {
      id: '4',
      title: '📰 Yearly Current Affairs - 2023-24',
      description: 'Complete yearly current affairs compilation for all competitive exams',
      category: 'Yearly',
      date: 'January 1, 2024',
      readTime: '60 min read',
      views: 2500,
      tags: ['Yearly', 'Compilation', 'PDF'],
      isFree: true,
      featured: true
    },
    {
      id: '5',
      title: '📰 Daily Current Affairs - July 29, 2024',
      description: 'Top 10 current affairs for today with explanation',
      category: 'Daily',
      date: 'July 29, 2024',
      readTime: '5 min read',
      views: 9800,
      tags: ['Daily', 'Top 10'],
      isFree: true,
      featured: false
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Daily': return 'bg-blue-500/10 text-blue-600'
      case 'Weekly': return 'bg-purple-500/10 text-purple-600'
      case 'Monthly': return 'bg-green-500/10 text-green-600'
      case 'Yearly': return 'bg-orange-500/10 text-orange-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Daily': return '🔥'
      case 'Weekly': return '📊'
      case 'Monthly': return '📅'
      case 'Yearly': return '📈'
      default: return '📰'
    }
  }

  const filteredAffairs = filter === 'all' 
    ? currentAffairs 
    : currentAffairs.filter(item => item.category.toLowerCase() === filter)

  const filteredSearch = searchQuery === '' 
    ? filteredAffairs 
    : filteredAffairs.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="gradient" className="mb-4 bg-white/20">
            Stay Updated
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Current Affairs
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with daily, weekly, monthly, and yearly current affairs
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'gradient' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={filter === 'daily' ? 'gradient' : 'outline'}
              onClick={() => setFilter('daily')}
              size="sm"
            >
              Daily
            </Button>
            <Button 
              variant={filter === 'weekly' ? 'gradient' : 'outline'}
              onClick={() => setFilter('weekly')}
              size="sm"
            >
              Weekly
            </Button>
            <Button 
              variant={filter === 'monthly' ? 'gradient' : 'outline'}
              onClick={() => setFilter('monthly')}
              size="sm"
            >
              Monthly
            </Button>
            <Button 
              variant={filter === 'yearly' ? 'gradient' : 'outline'}
              onClick={() => setFilter('yearly')}
              size="sm"
            >
              Yearly
            </Button>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search current affairs..."
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
              <Newspaper className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">50+</p>
              <p className="text-sm text-gray-500">Total Articles</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">30+</p>
              <p className="text-sm text-gray-500">Daily Updates</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">10K+</p>
              <p className="text-sm text-gray-500">Active Readers</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">10+</p>
              <p className="text-sm text-gray-500">PDF Downloads</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Affairs List */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading current affairs...</p>
          </div>
        ) : filteredSearch.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No current affairs found</h3>
            <p className="text-gray-500">Try changing the filter or search</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredSearch.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`hover:shadow-xl transition-all ${item.featured ? 'border-2 border-secondary/50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{getCategoryIcon(item.category)}</span>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          {item.featured && (
                            <Badge variant="gradient" className="text-xs">
                              ⭐ Featured
                            </Badge>
                          )}
                        </div>
                        <Link href={`/current-affairs/${item.id}`}>
                          <h3 className="text-xl font-semibold hover:text-secondary transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views.toLocaleString()} views
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/current-affairs/${item.id}`}>
                          <Button variant="gradient" size="sm" className="w-full">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
            📬 Get Daily Current Affairs
          </h2>
          <p className="text-white/80 mb-6">
            Subscribe to get daily current affairs directly in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button variant="default" className="bg-white text-primary hover:bg-white/90">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}