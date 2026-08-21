'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Download,
  Share2,
  Bookmark,
  Printer,
  ChevronRight,
  FileText,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

export default function CurrentAffairDetailPage() {
  const params = useParams()
  const slug = params?.slug as string || ''
  const [loading, setLoading] = useState(false)
  const [currentAffair, setCurrentAffair] = useState<any>(null)

  // Sample data - later database se fetch karenge
  const currentAffairsData: Record<string, any> = {
    '1': {
      id: '1',
      title: '📰 Daily Current Affairs - July 30, 2024',
      description: 'Important current affairs for UPSC, SSC, Banking, and Railway exams',
      content: `
        <h2>Top 10 Current Affairs - July 30, 2024</h2>
        
        <h3>1. International News</h3>
        <p>India and USA signed a new defense agreement worth $5 billion.</p>
        
        <h3>2. National News</h3>
        <p>Government launched new education policy for 2024-25.</p>
        
        <h3>3. Economy</h3>
        <p>GDP growth rate projected at 7.5% for this fiscal year.</p>
        
        <h3>4. Sports</h3>
        <p>India won 5 medals in the Asian Games 2024.</p>
        
        <h3>5. Science & Technology</h3>
        <p>ISRO successfully launched new satellite.</p>
        
        <h3>6. Awards & Honors</h3>
        <p>Dr. APJ Abdul Kalam Award given to 5 scientists.</p>
        
        <h3>7. Banking & Finance</h3>
        <p>RBI announced new interest rates.</p>
        
        <h3>8. Important Days</h3>
        <p>International Friendship Day celebrated on July 30.</p>
        
        <h3>9. Appointment & Resignation</h3>
        <p>New Chief Justice of India appointed.</p>
        
        <h3>10. Miscellaneous</h3>
        <p>India's first underwater metro started in Kolkata.</p>
      `,
      category: 'Daily',
      date: 'July 30, 2024',
      readTime: '5 min read',
      views: 12500,
      tags: ['UPSC', 'SSC', 'Banking', 'Railway'],
      isFree: true,
      featured: true
    },
    '2': {
      id: '2',
      title: '📰 Weekly Current Affairs - Week 4 July 2024',
      description: 'Weekly compilation of all important current affairs with MCQs',
      content: `
        <h2>Weekly Current Affairs - Week 4 July 2024</h2>
        
        <h3>Weekly Summary</h3>
        <p>Complete compilation of all important events from July 22-28, 2024.</p>
        
        <h3>Key Events</h3>
        <ul>
          <li>Political developments across states</li>
          <li>Economic policy changes</li>
          <li>International relations updates</li>
          <li>Sports achievements</li>
          <li>Scientific discoveries</li>
        </ul>
        
        <h3>Practice Questions</h3>
        <p>50 MCQs based on this week's current affairs.</p>
      `,
      category: 'Weekly',
      date: 'July 28, 2024',
      readTime: '15 min read',
      views: 8500,
      tags: ['Weekly', 'Compilation'],
      isFree: true,
      featured: false
    },
    '3': {
      id: '3',
      title: '📰 Monthly Current Affairs - June 2024',
      description: 'Complete monthly current affairs PDF with practice questions',
      content: `
        <h2>Monthly Current Affairs - June 2024</h2>
        
        <h3>Complete Monthly Compilation</h3>
        <p>All important events from June 1-30, 2024.</p>
        
        <h3>Topics Covered</h3>
        <ul>
          <li>National Affairs</li>
          <li>International Affairs</li>
          <li>Economy</li>
          <li>Sports</li>
          <li>Science & Technology</li>
          <li>Awards & Honors</li>
          <li>Appointments</li>
          <li>Important Days</li>
        </ul>
        
        <h3>Download PDF</h3>
        <p>Complete PDF with all current affairs and MCQs.</p>
      `,
      category: 'Monthly',
      date: 'July 1, 2024',
      readTime: '30 min read',
      views: 4200,
      tags: ['Monthly', 'PDF', 'MCQs'],
      isFree: true,
      featured: false
    },
    '4': {
      id: '4',
      title: '📰 Yearly Current Affairs - 2023-24',
      description: 'Complete yearly current affairs compilation for all competitive exams',
      content: `
        <h2>Yearly Current Affairs - 2023-24</h2>
        
        <h3>Complete Yearly Compilation</h3>
        <p>All important events from April 2023 to March 2024.</p>
        
        <h3>Sections</h3>
        <ul>
          <li>National Affairs</li>
          <li>International Affairs</li>
          <li>Economy</li>
          <li>Sports</li>
          <li>Science & Technology</li>
          <li>Awards & Honors</li>
          <li>Appointments</li>
          <li>Important Days</li>
          <li>State News</li>
          <li>Defense News</li>
        </ul>
        
        <h3>Download PDF</h3>
        <p>Complete yearly current affairs PDF.</p>
      `,
      category: 'Yearly',
      date: 'January 1, 2024',
      readTime: '60 min read',
      views: 2500,
      tags: ['Yearly', 'Compilation', 'PDF'],
      isFree: true,
      featured: true
    }
  }

  useEffect(() => {
    if (slug) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const data = currentAffairsData[slug]
        setCurrentAffair(data || null)
        setLoading(false)
      }, 300)
    }
  }, [slug])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Daily': return '🔥'
      case 'Weekly': return '📊'
      case 'Monthly': return '📅'
      case 'Yearly': return '📈'
      default: return '📰'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Daily': return 'bg-blue-500/10 text-blue-600'
      case 'Weekly': return 'bg-purple-500/10 text-purple-600'
      case 'Monthly': return 'bg-green-500/10 text-green-600'
      case 'Yearly': return 'bg-orange-500/10 text-orange-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!currentAffair) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold mt-2">Current Affairs Not Found</h2>
          <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
          <Link href="/current-affairs">
            <Button variant="gradient" className="mt-4">Back to Current Affairs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/current-affairs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Current Affairs
          </Button>
        </Link>

        {/* Header Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xl">{getCategoryIcon(currentAffair.category)}</span>
              <Badge className={getCategoryColor(currentAffair.category)}>
                {currentAffair.category}
              </Badge>
              {currentAffair.featured && (
                <Badge variant="gradient" className="text-xs">
                  ⭐ Featured
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{currentAffair.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              {currentAffair.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {currentAffair.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {currentAffair.readTime}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {currentAffair.views.toLocaleString()} views
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentAffair.content }}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {currentAffair.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="outline">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="gradient">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}