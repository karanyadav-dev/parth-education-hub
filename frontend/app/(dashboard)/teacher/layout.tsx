'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/teacher', icon: '📊' },
    { name: 'My Courses', href: '/teacher/courses', icon: '📚' },
    { name: 'Add Course', href: '/teacher/courses/add', icon: '➕' },
    { name: 'My Students', href: '/teacher/students', icon: '👨‍🎓' },
    { name: 'Tests', href: '/teacher/tests', icon: '📝' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Teacher Panel</h2>
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
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}