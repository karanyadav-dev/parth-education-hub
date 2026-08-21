'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Search, ArrowLeft, BookOpen, GraduationCap, FileText, BarChart3, Shield, Globe, Target, MapPin, Users, Award, Clock } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<any[]>([])

  // ✅ COMPLETE DATA - SABHI EXAMS, COURSES, TESTS
  const allData = [
    // ==========================================
    // UPSC & STATE PSC EXAMS
    // ==========================================
    { id: 'upsc-1', title: 'UPSC CSE (IAS)', type: 'exam', category: 'UPSC', description: 'Union Public Service Commission Civil Services Examination', link: '/exams/upsc-cse' },
    { id: 'upsc-2', title: 'UPSC IFS', type: 'exam', category: 'UPSC', description: 'UPSC Indian Forest Service Examination', link: '/exams/upsc-ifs' },
    { id: 'upsc-3', title: 'UPSC IPS', type: 'exam', category: 'UPSC', description: 'UPSC Indian Police Service Examination', link: '/exams/upsc-ips' },
    { id: 'upsc-4', title: 'UPSC EPFO', type: 'exam', category: 'UPSC', description: 'UPSC Employees Provident Fund Organisation', link: '/exams/upsc-epfo' },
    { id: 'upsc-5', title: 'BPSC', type: 'exam', category: 'UPSC', description: 'Bihar Public Service Commission', link: '/exams/bpsc' },
    { id: 'upsc-6', title: 'UPPSC', type: 'exam', category: 'UPSC', description: 'Uttar Pradesh Public Service Commission', link: '/exams/uppsc' },
    { id: 'upsc-7', title: 'MPPSC', type: 'exam', category: 'UPSC', description: 'Madhya Pradesh Public Service Commission', link: '/exams/mppsc' },
    { id: 'upsc-8', title: 'RPSC', type: 'exam', category: 'UPSC', description: 'Rajasthan Public Service Commission', link: '/exams/rpsc' },
    
    // ==========================================
    // SSC EXAMS
    // ==========================================
    { id: 'ssc-1', title: 'SSC CGL', type: 'exam', category: 'SSC', description: 'Staff Selection Commission Combined Graduate Level', link: '/exams/ssc-cgl' },
    { id: 'ssc-2', title: 'SSC CHSL', type: 'exam', category: 'SSC', description: 'SSC Combined Higher Secondary Level', link: '/exams/ssc-chsl' },
    { id: 'ssc-3', title: 'SSC MTS', type: 'exam', category: 'SSC', description: 'SSC Multi-Tasking Staff', link: '/exams/ssc-mts' },
    { id: 'ssc-4', title: 'SSC GD', type: 'exam', category: 'SSC', description: 'SSC General Duty Constable', link: '/exams/ssc-gd' },
    { id: 'ssc-5', title: 'SSC CPO', type: 'exam', category: 'SSC', description: 'SSC Central Police Organization', link: '/exams/ssc-cpo' },
    { id: 'ssc-6', title: 'SSC JE', type: 'exam', category: 'SSC', description: 'SSC Junior Engineer', link: '/exams/ssc-je' },
    
    // ==========================================
    // BANKING EXAMS
    // ==========================================
    { id: 'bank-1', title: 'SBI PO', type: 'exam', category: 'Banking', description: 'State Bank of India Probationary Officer', link: '/exams/sbi-po' },
    { id: 'bank-2', title: 'SBI Clerk', type: 'exam', category: 'Banking', description: 'State Bank of India Clerk', link: '/exams/sbi-clerk' },
    { id: 'bank-3', title: 'IBPS PO', type: 'exam', category: 'Banking', description: 'IBPS Probationary Officer', link: '/exams/ibps-po' },
    { id: 'bank-4', title: 'IBPS Clerk', type: 'exam', category: 'Banking', description: 'IBPS Clerk', link: '/exams/ibps-clerk' },
    { id: 'bank-5', title: 'IBPS RRB PO', type: 'exam', category: 'Banking', description: 'IBPS Regional Rural Bank PO', link: '/exams/ibps-rrb-po' },
    { id: 'bank-6', title: 'RBI Grade B', type: 'exam', category: 'Banking', description: 'Reserve Bank of India Grade B', link: '/exams/rbi-grade-b' },
    
    // ==========================================
    // RAILWAY EXAMS
    // ==========================================
    { id: 'rail-1', title: 'RRB NTPC', type: 'exam', category: 'Railway', description: 'Railway Recruitment Board Non-Technical Popular Categories', link: '/exams/rrb-ntpc' },
    { id: 'rail-2', title: 'RRB Group D', type: 'exam', category: 'Railway', description: 'RRB Group D Level 1 Posts', link: '/exams/rrb-group-d' },
    { id: 'rail-3', title: 'RRB ALP', type: 'exam', category: 'Railway', description: 'RRB Assistant Loco Pilot', link: '/exams/rrb-alp' },
    { id: 'rail-4', title: 'RRB JE', type: 'exam', category: 'Railway', description: 'RRB Junior Engineer', link: '/exams/rrb-je' },
    { id: 'rail-5', title: 'RRB RPF Constable', type: 'exam', category: 'Railway', description: 'RRB Railway Protection Force Constable', link: '/exams/rrb-rpf-constable' },
    
    // ==========================================
    // POLICE EXAMS
    // ==========================================
    { id: 'police-1', title: 'Delhi Police Constable', type: 'exam', category: 'Police', description: 'Delhi Police Constable Recruitment', link: '/exams/delhi-police-constable' },
    { id: 'police-2', title: 'Delhi Police SI', type: 'exam', category: 'Police', description: 'Delhi Police Sub-Inspector', link: '/exams/delhi-police-si' },
    { id: 'police-3', title: 'UP Police Constable', type: 'exam', category: 'Police', description: 'Uttar Pradesh Police Constable', link: '/exams/up-police-constable' },
    { id: 'police-4', title: 'Bihar Police Constable', type: 'exam', category: 'Police', description: 'Bihar Police Constable', link: '/exams/bihar-police-constable' },
    
    // ==========================================
    // DEFENCE EXAMS
    // ==========================================
    { id: 'def-1', title: 'NDA', type: 'exam', category: 'Defence', description: 'National Defence Academy', link: '/exams/nda' },
    { id: 'def-2', title: 'CDS', type: 'exam', category: 'Defence', description: 'Combined Defence Services', link: '/exams/cds' },
    { id: 'def-3', title: 'AFCAT', type: 'exam', category: 'Defence', description: 'Air Force Common Admission Test', link: '/exams/afcat' },
    { id: 'def-4', title: 'Army GD', type: 'exam', category: 'Defence', description: 'Army General Duty', link: '/exams/army-gd' },
    
    // ==========================================
    // TEACHING EXAMS
    // ==========================================
    { id: 'teach-1', title: 'CTET', type: 'exam', category: 'Teaching', description: 'Central Teacher Eligibility Test', link: '/exams/ctet' },
    { id: 'teach-2', title: 'UPTET', type: 'exam', category: 'Teaching', description: 'Uttar Pradesh Teacher Eligibility Test', link: '/exams/uptet' },
    { id: 'teach-3', title: 'REET', type: 'exam', category: 'Teaching', description: 'Rajasthan Eligibility Examination for Teachers', link: '/exams/reet' },
    { id: 'teach-4', title: 'DSSSB', type: 'exam', category: 'Teaching', description: 'Delhi Subordinate Services Selection Board', link: '/exams/dsssb' },
    { id: 'teach-5', title: 'KVS', type: 'exam', category: 'Teaching', description: 'Kendriya Vidyalaya Sangathan', link: '/exams/kvs' },
    
    // ==========================================
    // COURSES
    // ==========================================
    { id: 'course-1', title: 'SSC CGL Complete Course', type: 'course', category: 'SSC', description: 'Complete SSC CGL preparation with expert faculty', link: '/courses/ssc-cgl' },
    { id: 'course-2', title: 'SSC CHSL Complete Course', type: 'course', category: 'SSC', description: 'Complete SSC CHSL preparation', link: '/courses/ssc-chsl' },
    { id: 'course-3', title: 'Geography Complete Course', type: 'course', category: 'Geography', description: 'Master Geography for all competitive exams', link: '/courses/geography' },
    { id: 'course-4', title: 'Polity Complete Course', type: 'course', category: 'Polity', description: 'Master Indian Constitution and Polity', link: '/courses/polity' },
    { id: 'course-5', title: 'History Complete Course', type: 'course', category: 'History', description: 'Ancient, Medieval, Modern History', link: '/courses/history' },
    
    // ==========================================
    // TEST SERIES
    // ==========================================
    { id: 'test-1', title: 'SSC CGL Mock Test 1', type: 'test', category: 'SSC', description: 'Full mock test for SSC CGL preparation', link: '/test-series/ssc-cgl-1' },
    { id: 'test-2', title: 'UPSC Prelims Test 1', type: 'test', category: 'UPSC', description: 'UPSC Prelims practice test', link: '/test-series/upsc-1' },
    { id: 'test-3', title: 'Bank PO Mock Test', type: 'test', category: 'Banking', description: 'Bank PO full mock test', link: '/test-series/bank-po-1' },
    { id: 'test-4', title: 'RRB NTPC Mock Test', type: 'test', category: 'Railway', description: 'RRB NTPC practice test', link: '/test-series/rrb-ntpc-1' },
  ]

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (query.trim() === '') {
        setResults([])
        setLoading(false)
        return
      }

      const filtered = allData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setLoading(false)
    }, 300)
  }, [query])

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5 text-blue-500" />
      case 'exam': return <GraduationCap className="w-5 h-5 text-green-500" />
      case 'test': return <BarChart3 className="w-5 h-5 text-purple-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-500/10 text-blue-600'
      case 'exam': return 'bg-green-500/10 text-green-600'
      case 'test': return 'bg-purple-500/10 text-purple-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-primary/10">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {query ? `Results for "${query}"` : 'Search'}
            </h1>
            <p className="text-gray-500 text-sm">
              {loading ? 'Searching...' : `${results.length} results found`}
            </p>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any matches for "{query}". Try searching for courses, exams, or topics.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Link href="/search?q=ssc">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    SSC CGL
                  </Badge>
                </Link>
                <Link href="/search?q=upsc">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    UPSC
                  </Badge>
                </Link>
                <Link href="/search?q=banking">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    Banking
                  </Badge>
                </Link>
                <Link href="/search?q=railway">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    Railway
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((item) => (
              <Link key={item.id} href={item.link}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        {getIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge className={getTypeColor(item.type)}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-primary">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}