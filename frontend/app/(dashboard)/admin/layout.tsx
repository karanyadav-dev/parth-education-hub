'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Courses', href: '/admin/courses', icon: '📚' },
    { name: 'Add Course', href: '/admin/courses/add', icon: '➕' },
    { name: 'Tests', href: '/admin/tests', icon: '📝' },
    { name: 'Add Test', href: '/admin/tests/add', icon: '➕' },
    { name: 'Current Affairs', href: '/admin/current-affairs', icon: '📰' },
    { name: 'Add Current Affairs', href: '/admin/current-affairs/add', icon: '➕' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 p-2 hover:bg-gray-100 rounded"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition ${
                  pathname === item.href ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}