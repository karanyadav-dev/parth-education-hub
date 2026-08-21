'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import {
  Shield,
  GraduationCap,
  BarChart3,
  Globe,
  MapPin,
  Target,
  BookOpen,
  ArrowRight,
  Users,
  Award,
  Clock,
  CheckCircle,
  Building2,
  UserCheck
} from 'lucide-react'

export default function AllExamsPage() {
  const examCategories = [
    {
      id: 'upsc',
      name: 'UPSC & State PSC',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      description: 'Civil Services and State PSC exams',
      exams: [
        { name: 'UPSC CSE (IAS)', slug: 'upsc-cse' },
        { name: 'UPSC IFS', slug: 'upsc-ifs' },
        { name: 'UPSC IPS', slug: 'upsc-ips' },
        { name: 'UPSC EPFO', slug: 'upsc-epfo' },
        { name: 'BPSC (Bihar)', slug: 'bpsc' },
        { name: 'UPPSC (UP)', slug: 'uppsc' },
        { name: 'MPPSC (MP)', slug: 'mppsc' },
        { name: 'HPSC (Haryana)', slug: 'hpsc' },
        { name: 'JPSC (Jharkhand)', slug: 'jpsc' },
        { name: 'RPSC (Rajasthan)', slug: 'rpsc' },
      ]
    },
    {
      id: 'ssc',
      name: 'SSC Exams',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Staff Selection Commission exams',
      exams: [
        { name: 'SSC CGL', slug: 'ssc-cgl' },
        { name: 'SSC CHSL', slug: 'ssc-chsl' },
        { name: 'SSC MTS', slug: 'ssc-mts' },
        { name: 'SSC GD', slug: 'ssc-gd' },
        { name: 'SSC CPO', slug: 'ssc-cpo' },
        { name: 'SSC JE', slug: 'ssc-je' },
        { name: 'SSC Stenographer', slug: 'ssc-stenographer' },
        { name: 'SSC Selection Post', slug: 'ssc-selection-post' },
      ]
    },
    {
      id: 'banking',
      name: 'Banking Exams',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-500',
      description: 'Bank PO and Clerk exams',
      exams: [
        { name: 'SBI PO', slug: 'sbi-po' },
        { name: 'SBI Clerk', slug: 'sbi-clerk' },
        { name: 'IBPS PO', slug: 'ibps-po' },
        { name: 'IBPS Clerk', slug: 'ibps-clerk' },
        { name: 'IBPS RRB PO', slug: 'ibps-rrb-po' },
        { name: 'IBPS RRB Clerk', slug: 'ibps-rrb-clerk' },
        { name: 'RBI Grade B', slug: 'rbi-grade-b' },
        { name: 'RBI Assistant', slug: 'rbi-assistant' },
        { name: 'NABARD Grade A', slug: 'nabard-grade-a' },
        { name: 'SIDBI Grade A', slug: 'sidbi-grade-a' },
      ]
    },
    {
      id: 'railway',
      name: 'Railway Exams',
      icon: Globe,
      color: 'from-purple-500 to-pink-500',
      description: 'RRB NTPC and Group D exams',
      exams: [
        { name: 'RRB NTPC', slug: 'rrb-ntpc' },
        { name: 'RRB Group D', slug: 'rrb-group-d' },
        { name: 'RRB ALP', slug: 'rrb-alp' },
        { name: 'RRB JE', slug: 'rrb-je' },
        { name: 'RRB RPF Constable', slug: 'rrb-rpf-constable' },
        { name: 'RRB RPF SI', slug: 'rrb-rpf-si' },
        { name: 'RRB Paramedical', slug: 'rrb-paramedical' },
      ]
    },
    {
      id: 'rpsc',
      name: 'RPSC',
      icon: MapPin,
      color: 'from-red-500 to-orange-500',
      description: 'Rajasthan Public Service Commission Exams',
      exams: [
        { name: 'RPSC RAS', slug: 'rpsc-ras' },
        { name: 'RPSC SI', slug: 'rpsc-si' },
        { name: 'RPSC Constable', slug: 'rpsc-constable' },
        { name: 'RPSC RJS', slug: 'rpsc-rjs' },
        { name: 'RPSC Assistant Professor', slug: 'rpsc-assistant-professor' },
        { name: 'RPSC School Lecturer', slug: 'rpsc-school-lecturer' },
        { name: 'RPSC BEO', slug: 'rpsc-beo' },
        { name: 'RPSC Veterinary Officer', slug: 'rpsc-veterinary-officer' },
        { name: 'RPSC Agriculture Officer', slug: 'rpsc-agriculture-officer' },
        { name: 'RPSC Forest Officer', slug: 'rpsc-forest-officer' },
        { name: 'RPSC Pharmacy Officer', slug: 'rpsc-pharmacy-officer' },
        { name: 'RPSC Assistant Engineer', slug: 'rpsc-assistant-engineer' },
        { name: 'RPSC Stenographer', slug: 'rpsc-stenographer' },
        { name: 'RPSC Patwari', slug: 'rpsc-patwari' },
      ]
    },
    {
      id: 'rssb',
      name: 'RSSB',
      icon: Building2,
      color: 'from-amber-500 to-yellow-600',
      description: 'Rajasthan Staff Selection Board Exams',
      exams: [
        { name: 'RSSB Police Constable', slug: 'rssb-police-constable' },
        { name: 'RSSB SI', slug: 'rssb-si' },
        { name: 'RSSB Patwari', slug: 'rssb-patwari' },
        { name: 'RSSB Revenue Officer', slug: 'rssb-revenue-officer' },
        { name: 'RSSB Gram Sevak', slug: 'rssb-gram-sevak' },
        { name: 'RSSB Teacher Grade 1', slug: 'rssb-teacher-grade-1' },
        { name: 'RSSB Teacher Grade 2', slug: 'rssb-teacher-grade-2' },
        { name: 'RSSB Teacher Grade 3', slug: 'rssb-teacher-grade-3' },
        { name: 'RSSB Lab Assistant', slug: 'rssb-lab-assistant' },
        { name: 'RSSB Clerk', slug: 'rssb-clerk' },
        { name: 'RSSB Junior Accountant', slug: 'rssb-junior-accountant' },
        { name: 'RSSB Stenographer', slug: 'rssb-stenographer' },
        { name: 'RSSB Forest Guard', slug: 'rssb-forest-guard' },
        { name: 'RSSB Agriculture Supervisor', slug: 'rssb-agriculture-supervisor' },
        { name: 'RSSB Animal Husbandry', slug: 'rssb-animal-husbandry' },
        { name: 'RSSB Fisheries Officer', slug: 'rssb-fisheries-officer' },
        { name: 'RSSB Cooperative Officer', slug: 'rssb-cooperative-officer' },
        { name: 'RSSB Panchayat Secretary', slug: 'rssb-panchayat-secretary' },
        { name: 'RSSB BDO', slug: 'rssb-bdo' },
        { name: 'RSSB Food Inspector', slug: 'rssb-food-inspector' },
        { name: 'RSSB Jail Warder', slug: 'rssb-jail-warder' },
        { name: 'RSSB Fireman', slug: 'rssb-fireman' },
      ]
    },
    // ✅ CET (10+2, GRADUATE) ADDED
    {
      id: 'cet',
      name: 'CET (10+2, Graduate)',
      icon: UserCheck,
      color: 'from-teal-500 to-cyan-600',
      description: 'Common Eligibility Test for Government Jobs',
      exams: [
        { name: 'CET 10+2', slug: 'cet-10-2' },
        { name: 'CET Graduate', slug: 'cet-graduate' },
        { name: 'CET 10+2 (Rajasthan)', slug: 'cet-10-2-rajasthan' },
        { name: 'CET Graduate (Rajasthan)', slug: 'cet-graduate-rajasthan' },
        { name: 'CET 10+2 (UP)', slug: 'cet-10-2-up' },
        { name: 'CET Graduate (UP)', slug: 'cet-graduate-up' },
        { name: 'CET 10+2 (Bihar)', slug: 'cet-10-2-bihar' },
        { name: 'CET Graduate (Bihar)', slug: 'cet-graduate-bihar' },
        { name: 'CET 10+2 (MP)', slug: 'cet-10-2-mp' },
        { name: 'CET Graduate (MP)', slug: 'cet-graduate-mp' },
      ]
    },
    // ✅ CUET ADDED
    {
      id: 'cuet',
      name: 'CUET',
      icon: GraduationCap,
      color: 'from-purple-600 to-indigo-600',
      description: 'Common University Entrance Test',
      exams: [
        { name: 'CUET UG', slug: 'cuet-ug' },
        { name: 'CUET PG', slug: 'cuet-pg' },
        { name: 'CUET PhD', slug: 'cuet-phd' },
        { name: 'CUET (Central Universities)', slug: 'cuet-central-universities' },
        { name: 'CUET (State Universities)', slug: 'cuet-state-universities' },
        { name: 'CUET (Private Universities)', slug: 'cuet-private-universities' },
      ]
    },
    {
      id: 'police',
      name: 'Police Exams',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      description: 'Police Constable and SI exams',
      exams: [
        { name: 'Delhi Police Constable', slug: 'delhi-police-constable' },
        { name: 'Delhi Police SI', slug: 'delhi-police-si' },
        { name: 'UP Police Constable', slug: 'up-police-constable' },
        { name: 'UP Police SI', slug: 'up-police-si' },
        { name: 'Bihar Police Constable', slug: 'bihar-police-constable' },
        { name: 'Bihar Police SI', slug: 'bihar-police-si' },
        { name: 'Rajasthan Police', slug: 'rajasthan-police' },
        { name: 'MP Police', slug: 'mp-police' },
        { name: 'Haryana Police', slug: 'haryana-police' },
        { name: 'Punjab Police', slug: 'punjab-police' },
      ]
    },
    {
      id: 'defence',
      name: 'Defence Exams',
      icon: Target,
      color: 'from-indigo-500 to-blue-500',
      description: 'NDA, CDS, and defence exams',
      exams: [
        { name: 'NDA', slug: 'nda' },
        { name: 'CDS', slug: 'cds' },
        { name: 'AFCAT', slug: 'afcat' },
        { name: 'INET', slug: 'inet' },
        { name: 'TA (Territorial Army)', slug: 'ta' },
        { name: 'SSB Interview', slug: 'ssb-interview' },
        { name: 'Army GD', slug: 'army-gd' },
        { name: 'Navy SSR', slug: 'navy-ssr' },
        { name: 'Air Force X Group', slug: 'airforce-x-group' },
        { name: 'Air Force Y Group', slug: 'airforce-y-group' },
      ]
    },
    {
      id: 'teaching',
      name: 'Teaching Exams',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      description: 'CTET, TET, and teaching exams',
      exams: [
        { name: 'CTET', slug: 'ctet' },
        { name: 'UPTET', slug: 'uptet' },
        { name: 'REET', slug: 'reet' },
        { name: 'MPTET', slug: 'mptet' },
        { name: 'HTET', slug: 'htet' },
        { name: 'BTET', slug: 'btet' },
        { name: 'DSSSB', slug: 'dsssb' },
        { name: 'KVS', slug: 'kvs' },
        { name: 'NVS', slug: 'nvs' },
        { name: 'Army Teaching', slug: 'army-teaching' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gradient" className="mb-3">All Exams</Badge>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Explore All Exams at <span className="text-primary">Parth</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive preparation for all competitive exams with expert faculty
          </p>
        </div>

        {/* Exam Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {examCategories.map((category, idx) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-3`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-1">
                      {category.exams.slice(0, 5).map((exam) => (
                        <Link key={exam.slug} href={`/exams/${exam.slug}`}>
                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <span className="text-sm">{exam.name}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      ))}
                      {category.exams.length > 5 && (
                        <Link href={`/exams/${category.id}`}>
                          <div className="text-center text-sm text-primary hover:underline font-medium mt-2">
                            +{category.exams.length - 5} more exams
                          </div>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">90+</p>
              <p className="text-sm text-gray-500">Exams Covered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">1.5L+</p>
              <p className="text-sm text-gray-500">Students Enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-gray-500">Access Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}