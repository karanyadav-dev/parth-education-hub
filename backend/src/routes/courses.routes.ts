'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log('🔍 Admin Layout Auth Check:', { token, user });

    if (!token) {
      console.log('❌ No token, redirecting to login...');
      router.push('/auth/login');
      return;
    }

    try {
      const userData = JSON.parse(user || '{}');
      console.log('👤 User data:', userData);

      // ✅ Check if user is ADMIN
      if (userData.role !== 'ADMIN' && userData.role !== 'SUPER_ADMIN') {
        console.log('❌ Not admin, redirecting to dashboard...');
        router.push('/dashboard');
        return;
      }

      console.log('✅ Admin verified, loading layout...');
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error parsing user:', error);
      router.push('/auth/login');
    }
  }, [router]);

  // ✅ Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // ✅ Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Courses', href: '/admin/courses', icon: '📚' },
    { name: 'Add Course', href: '/admin/courses/add', icon: '➕' },
    { name: 'Tests', href: '/admin/tests', icon: '📝' },
    { name: 'Add Test', href: '/admin/tests/add', icon: '➕' },
    { name: 'Current Affairs', href: '/admin/current-affairs', icon: '📰' },
    { name: 'Add Current Affairs', href: '/admin/current-affairs/add', icon: '➕' },
    // ✅ NEW: All Exams Link
    { name: 'All Exams', href: '/all-exams', icon: '📚' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 p-2 hover:bg-gray-100 rounded transition"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition ${
                pathname === item.href 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.push('/auth/login');
            }}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition w-full ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
