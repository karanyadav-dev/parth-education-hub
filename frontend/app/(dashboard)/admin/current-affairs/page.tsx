'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';

interface CurrentAffair {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  date: string;
  pdfUrl?: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminCurrentAffairsPage() {
  const router = useRouter();
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch Current Affairs (सिर्फ आपके द्वारा अपलोड किए गए)
  useEffect(() => {
    fetchCurrentAffairs();
  }, []);

  const fetchCurrentAffairs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://parth-education-hub.onrender.com/admin/current-affairs', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();

      if (data.success) {
        setCurrentAffairs(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch current affairs');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Current Affair
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this current affairs?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://parth-education-hub.onrender.com/admin/current-affairs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('✅ Current Affairs deleted successfully');
        fetchCurrentAffairs();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading current affairs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchCurrentAffairs} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📰 Current Affairs Management</h1>
          <p className="text-gray-500">Total: {currentAffairs.length}</p>
        </div>
        <Link href="/admin/current-affairs/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </Link>
      </div>

      {/* Current Affairs Grid */}
      {currentAffairs.length === 0 ? (
        <Card className="p-10 text-center">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No current affairs found</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add New" to create one</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAffairs.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.isPublished 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.content || 'No content'}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    📂 {item.category || 'General'}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    📅 {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                {item.summary && (
                  <p className="text-sm text-gray-500 line-clamp-1 mb-3">{item.summary}</p>
                )}
                {item.pdfUrl && (
                  <div className="text-sm text-blue-600 mb-3">
                    📄 <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
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
                    onClick={() => handleDelete(item.id)}
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
