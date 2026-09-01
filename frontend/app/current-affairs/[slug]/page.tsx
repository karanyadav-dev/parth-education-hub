'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Loader2, Video, Clock, Calendar, Users, CheckCircle, ArrowLeft, Play, FileText } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  thumbnail?: string;
  hasLive: boolean;
  hasRecorded: boolean;
  liveSchedule?: string;
  modules?: any[];
  createdAt: string;
}

interface ExamData {
  name: string;
  title: string;
  description: string;
  icon: string;
  totalCourses: number;
  courses: Course[];
}

export default function ExamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExamCourses();
  }, [slug]);

  const fetchExamCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/exams/${slug}`);
      const data = await response.json();

      if (data.success) {
        setExamData(data.data);
      } else {
        setError('Failed to load exam courses');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !examData) {
    return <div className="text-center text-red-600 p-10">{error || 'Exam not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/all-exams" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to All Exams
      </Link>

      {/* Exam Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 mb-8">
        <div className="text-5xl mb-4">{examData.icon}</div>
        <h1 className="text-3xl font-bold mb-2">{examData.title}</h1>
        <p className="text-blue-100 text-lg max-w-2xl">{examData.description}</p>
        <div className="flex gap-6 mt-4">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {examData.totalCourses} Courses
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            1.5L+ Students Enrolled
          </span>
        </div>
      </div>

      {/* Courses List */}
      {examData.courses.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-gray-500">No courses available for this exam yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examData.courses.map((course) => (
            <Card key={course.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-1">{course.title}</CardTitle>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {course.hasLive ? 'Live' : 'Recorded'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {course.description || 'Complete foundation course with expert faculty'}
                </p>
                
                {/* ✅ Live + Recorded Classes Options */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.hasLive && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs flex items-center gap-1 border border-green-200">
                      <Video className="w-3 h-3" />
                      Live Classes
                    </span>
                  )}
                  {course.hasRecorded && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                      <Clock className="w-3 h-3" />
                      Recorded Sessions
                    </span>
                  )}
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs border">
                    {course.duration || 'Self-paced'}
                  </span>
                </div>

                {course.liveSchedule && (
                  <div className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Live Schedule: {course.liveSchedule}</span>
                  </div>
                )}

                {/* ✅ Access Options */}
                <div className="flex gap-3 mt-4">
                  <Link href={`/courses/${course.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/courses/${course.slug}/enroll`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
