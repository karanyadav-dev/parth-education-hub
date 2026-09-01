'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Users, CheckCircle, Calendar } from 'lucide-react';

// ✅ All Exam Categories
const examCategories = [
  { id: 'UPSC', name: 'UPSC Civil Services', icon: '🏛️', color: 'from-blue-500 to-purple-600', description: 'IAS, IPS, IRS complete preparation' },
  { id: 'RPSC', name: 'RPSC RAS', icon: '🏛️', color: 'from-orange-500 to-red-600', description: 'Rajasthan Administrative Services' },
  { id: 'SSC', name: 'SSC CGL & CHSL', icon: '📋', color: 'from-green-500 to-emerald-600', description: 'Staff Selection Commission' },
  { id: 'BANKING', name: 'Bank PO & Clerk', icon: '🏦', color: 'from-blue-600 to-indigo-600', description: 'SBI, IBPS, RBI preparation' },
  { id: 'RAILWAY', name: 'RRB NTPC & Group D', icon: '🚆', color: 'from-red-500 to-rose-600', description: 'Railway recruitment exams' },
  { id: 'REET', name: 'REET & Teaching', icon: '📚', color: 'from-yellow-500 to-orange-600', description: 'REET, CTET, TET, BSTC' },
  { id: 'POLICE', name: 'Police & Defence', icon: '👮', color: 'from-slate-600 to-gray-800', description: 'Police, NDA, CDS, CAPF' },
  { id: 'CET', name: 'Common Eligibility Test', icon: '📝', color: 'from-teal-500 to-cyan-600', description: 'CET for all government jobs' },
  { id: 'CUET', name: 'CUET UG & PG', icon: '🎓', color: 'from-pink-500 to-rose-600', description: 'Central University Entrance Test' },
];

export default function AllExamsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📚 All Exams & Foundation Courses</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose your exam and get complete foundation course with live classes, recorded sessions, and test series
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examCategories.map((exam) => (
          <Link key={exam.id} href={`/exams/${exam.id}`}>
            <Card className="hover:shadow-2xl transition-all hover:scale-105 cursor-pointer h-full">
              <CardHeader className={`bg-gradient-to-r ${exam.color} text-white rounded-t-lg p-6`}>
                <div className="text-4xl mb-2">{exam.icon}</div>
                <CardTitle className="text-xl">{exam.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    1.5L+ Students
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    95% Success Rate
                  </span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Foundation Course →
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
