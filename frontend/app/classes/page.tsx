'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  Video,
  Play,
  Eye,
  ThumbsUp,
  Share2,
  Youtube,
  Search,
  Grid,
  List,
  Bell,
  Star,
  Users,
  Clock,
  Calendar,
  ArrowRight,
  Download,
  Bookmark,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ClassesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState<any[]>([])

  // ✅ PARTH COACHING YOUTUBE CHANNEL DETAILS
  const CHANNEL_URL = 'https://youtube.com/@parthcoaching-vm'
  const CHANNEL_ID = 'UCXCvOJ0iPuQX29LzYEr7hUw'
  const CHANNEL_NAME = 'Parth Coaching'
  const CHANNEL_HANDLE = '@parthcoaching-vm'
  const SUBSCRIBERS = '1.36K'
  const TOTAL_VIDEOS = '103'

  // ✅ REAL YOUTUBE VIDEOS - PARTH COACHING CHANNEL
  const allVideos = [
    // === RAJASTHAN GK / CURRENT AFFAIRS ===
    {
      id: 1,
      title: '🚨 राजस्थान दिवस || 30 मार्च नहीं, 19 मार्च को || चैत्र शुक्ल प्रतिपदा || हिंदू नववर्ष 🔥 Chouhan Sir',
      teacher: 'Chouhan Sir',
      date: '18 March 2026',
      duration: '5:35',
      views: 336,
      likes: 38,
      videoId: 'DvE0sS_7qI8', // ✅ REAL VIDEO ID
      category: 'Rajasthan GK',
      isFeatured: true,
      examType: 'RAS, CET, REET'
    },
    // === POLITY MCQ SERIES ===
    {
      id: 2,
      title: '🚨मुख्यमंत्री MCQ || Polity MCQ Series || RAS || CET || PSI || VDO #polity #mcq',
      teacher: 'Parth Sir',
      date: '8 days ago',
      duration: '25:38',
      views: 349,
      likes: 45,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Polity',
      examType: 'RAS, CET, PSI, VDO'
    },
    {
      id: 3,
      title: '🚨राज्यपाल MCQ || Polity MCQ Series || नवीनतम पैटर्न पर आधारित || CET RAS REET PSI',
      teacher: 'Parth Sir',
      date: '4 weeks ago',
      duration: '20:30',
      views: 322,
      likes: 40,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Polity',
      examType: 'CET, RAS, REET, PSI'
    },
    {
      id: 4,
      title: '🚨वनपाल 2026 || Polity Question Solution || CET के लिए महत्वपूर्ण 💫',
      teacher: 'Parth Sir',
      date: '1 month ago',
      duration: '11:39',
      views: 144,
      likes: 20,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Polity',
      examType: 'CET'
    },

    // === CURRENT AFFAIRS ===
    {
      id: 5,
      title: '🚨वनपाल (Forester) 2026 Current Affairs Solution || LDC CET वाले सावधान🤔',
      teacher: 'Parth Sir',
      date: '1 month ago',
      duration: '11:16',
      views: 160,
      likes: 25,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'LDC, CET'
    },
    {
      id: 6,
      title: '🚨May 2026 Rajasthan Current Affairs || Top 50 MCQs || LDC | CET | 2nd Grade',
      teacher: 'Parth Sir',
      date: '1 month ago',
      duration: '23:27',
      views: 177,
      likes: 30,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      isFeatured: true,
      examType: 'LDC, CET, 2nd Grade'
    },
    {
      id: 7,
      title: '🚨April Rajasthan Current Affairs || Birthday Special Class🎂 MD Sir',
      teacher: 'MD Sir',
      date: '3 months ago',
      duration: '21:16',
      views: 214,
      likes: 35,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'Rajasthan Exams'
    },
    {
      id: 8,
      title: '🚨Rajasthan March 2026 Current Affairs 🔥 Top 60 MCQ || सुज़स प्रश्नोत्तरी | 1st Grade,2nd Grade LDC',
      teacher: 'Parth Sir',
      date: '3 months ago',
      duration: '25:29',
      views: 396,
      likes: 50,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      isFeatured: true,
      examType: '1st Grade, 2nd Grade, LDC'
    },
    {
      id: 9,
      title: '🔥 राजस्थान फ़रवरी 2026 || Top 50 MCQs || Lab Assistant LDC RAS PSI CET',
      teacher: 'Parth Sir',
      date: '4 months ago',
      duration: '22:17',
      views: 194,
      likes: 28,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'Lab Assistant, LDC, RAS, PSI, CET'
    },
    {
      id: 10,
      title: '🚨राजस्थान करेंट अफेयर्स || जनवरी 2026 || Lab Assistant PSI CET LDC RAS महत्वपूर्ण प्रश्न 🔥',
      teacher: 'Parth Sir',
      date: '5 months ago',
      duration: '19:46',
      views: 233,
      likes: 32,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'Lab Assistant, PSI, CET, LDC, RAS'
    },
    {
      id: 11,
      title: '🚨 जनवरी 2026 || Top 50 MCQs || SSC RRB PSI CET RAS || महत्वपूर्ण प्रश्न 🔥',
      teacher: 'Parth Sir',
      date: '5 months ago',
      duration: '21:20',
      views: 168,
      likes: 22,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'SSC, RRB, PSI, CET, RAS'
    },

    // === RAJASTHAN GK ===
    {
      id: 12,
      title: '🚨राजस्थान विधानसभा लोगो अनावरण || 75 वीं वर्षगांठ || प्रमुख तथ्य 1952 से अब तक 🔥',
      teacher: 'Parth Sir',
      date: '2 months ago',
      duration: '7:43',
      views: 104,
      likes: 15,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Rajasthan GK',
      examType: 'Rajasthan Exams'
    },
    {
      id: 13,
      title: '🚨जोधपुर के पंचगौरव || Rajasthan GK || सभी परीक्षाओं के लिए महत्वपूर्ण 🔥🌲🏇🥘🏯',
      teacher: 'Parth Sir',
      date: '6 months ago',
      duration: '3:13',
      views: 230,
      likes: 28,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Rajasthan GK',
      examType: 'All Exams'
    },

    // === EXAM UPDATES ===
    {
      id: 14,
      title: '🚨 360° विश्लेषण || 4th Grade 🔥 जानिए फाइनल Cut Off || Naruka Sir',
      teacher: 'Naruka Sir',
      date: '6 months ago',
      duration: '21:07',
      views: 6544,
      likes: 520,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Exam Updates',
      isFeatured: true,
      examType: '4th Grade'
    },

    // === SCIENCE ===
    {
      id: 15,
      title: '🚨Current Affairs Answer Key Lab Assistant Science || LDC CET के लिए महत्वपूर्ण 💫',
      teacher: 'Parth Sir',
      date: '2 months ago',
      duration: '11:36',
      views: 139,
      likes: 18,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Science',
      examType: 'Lab Assistant, LDC, CET'
    },

    // === CURRENT AFFAIRS (MISC) ===
    {
      id: 16,
      title: '🚨G7 Summit 2026 || मोदी की फ्रांस यात्रा || संपूर्ण जानकारी 🔥',
      teacher: 'Parth Sir',
      date: '1 month ago',
      duration: '2:12',
      views: 52,
      likes: 8,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'All Exams'
    },
    {
      id: 17,
      title: '🚨IPL 2026 संपूर्ण जानकारी🔥🏆 || ओरेंज कैप 🧢 पर्पल कैप | पुरस्कार राशि | सबसे ज्यादा पुरस्कार 🤔',
      teacher: 'Parth Sir',
      date: '2 months ago',
      duration: '4:43',
      views: 149,
      likes: 20,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      examType: 'All Exams'
    },
    {
      id: 18,
      title: '🚨 पद्म पुरस्कार 2026 || जानिए धर्मेंद्र और रोहित शर्मा को कौनसा पुरस्कार मिला 🤔 विस्तृत जानकारी 🔥',
      teacher: 'Parth Sir',
      date: '6 months ago',
      duration: '10:58',
      views: 312,
      likes: 35,
      videoId: 'DvE0sS_7qI8', // 🔴 APNI VIDEO ID DAALEIN
      category: 'Current Affairs',
      isFeatured: true,
      examType: 'All Exams'
    }
  ]

  const categories = ['all', 'Polity', 'Current Affairs', 'Rajasthan GK', 'Exam Updates', 'Science']

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setVideos(allVideos)
      setLoading(false)
    }, 500)
  }, [])

  const filteredClasses = videos.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cls.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePlayVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
    toast.success('▶️ Video play ho raha hai...')
  }

  const handleShare = (videoId: string) => {
    const link = `https://www.youtube.com/watch?v=${videoId}`
    navigator.clipboard.writeText(link)
    toast.success('🔗 Link copy ho gaya!')
  }

  const handleSubscribe = () => {
    window.open(CHANNEL_URL, '_blank')
    toast.success('📺 YouTube Channel open ho raha hai...')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <Youtube className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{CHANNEL_NAME}</h1>
                <p className="text-sm text-gray-500">{CHANNEL_HANDLE} • {SUBSCRIBERS} Subscribers</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="gradient" 
                className="gap-2 bg-red-600 hover:bg-red-700 text-sm"
                onClick={handleSubscribe}
              >
                <Youtube className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Channel Info */}
          <Card className="mb-6 bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {SUBSCRIBERS} Subscribers</span>
                <span className="flex items-center gap-1"><Video className="w-4 h-4" /> {TOTAL_VIDEOS} Videos</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Daily Updates</span>
                <span className="flex items-center gap-1"><Youtube className="w-4 h-4" /> @parthcoaching-vm</span>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {['Videos', 'Shorts', 'Playlists', 'Live'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  tab === 'Videos'
                    ? 'border-red-600 text-red-600 dark:text-red-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Grid */}
          {filteredClasses.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-3'
            }>
              {filteredClasses.map((video) => (
                <div key={video.id} className="group">
                  <div className="hover:shadow-xl transition-shadow overflow-hidden cursor-pointer bg-transparent">
                    {/* Thumbnail */}
                    <div 
                      className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden"
                      onClick={() => handlePlayVideo(video.videoId)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://img.youtube.com/vi/UCXCvOJ0iPuQX29LzYEr7hUw/hqdefault.jpg'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <Play className="w-7 h-7 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white">
                        {video.duration}
                      </div>
                      {video.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="gradient" className="text-[10px] px-1.5 py-0.5">
                            <Star className="w-2 h-2 mr-0.5" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      {video.examType && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-black/60 border-0 text-white">
                            {video.examType}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-3 space-y-1">
                      <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                        {video.title}
                      </h3>
                      
                      <p className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{video.teacher}</span>
                        <span className="text-gray-400">•</span>
                        <span>{video.views.toLocaleString()} views</span>
                        <span className="text-gray-400">•</span>
                        <span>{video.date}</span>
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          className="h-7 px-2 text-xs gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center"
                          onClick={() => handlePlayVideo(video.videoId)}
                        >
                          <Play className="w-3 h-3" />
                          Watch
                        </button>
                        <button
                          className="h-7 px-2 text-xs gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center"
                          onClick={() => handleShare(video.videoId)}
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                        <button className="h-7 px-2 text-xs gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center">
                          <ThumbsUp className="w-3 h-3" />
                          {video.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Video className="w-16 h-16 mx-auto text-gray-300" />
              <p className="text-gray-500 mt-4">कोई वीडियो नहीं मिला</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}