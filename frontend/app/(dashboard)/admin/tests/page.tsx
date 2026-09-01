'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Loader2, FileText } from 'lucide-react';
import Link from 'next/link';

interface Test {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status: string;
  createdAt: string;
  pdfUrl?: string;
}

export default function AdminTestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch Tests (सिर्फ आपके द्वारा अपलोड किए गए)
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://parth-education-hub.onrender.com/admin/tests', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();

      if (data.success) {
        setTests(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch tests');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Test
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this test?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://parth-education-hub.onrender.com/admin/tests/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('✅ Test deleted successfully');
        fetchTests();
      } else {
        toast.error(data.error || 'Failed to delete test');
      }
    } catch (err) {
      toast.error('Error deleting test');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchTests} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📝 Tests Management</h1>
          <p className="text-gray-500">Total Tests: {tests.length}</p>
        </div>
        <Link href="/admin/tests/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Test
          </Button>
        </Link>
      </div>

      {/* Tests Grid */}
      {tests.length === 0 ? (
        <Card className="p-10 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No tests found</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add New Test" to create one</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">{test.title}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.status === 'PUBLISHED' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {test.status || 'DRAFT'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {test.description || 'No description'}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    📚 {test.subject || 'General'}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    ⏱️ {test.duration || 0} min
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    📊 {test.totalMarks || 0} marks
                  </span>
                </div>
                {test.pdfUrl && (
                  <div className="text-sm text-blue-600 mb-3">
                    📄 <a href={test.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDelete(test.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
