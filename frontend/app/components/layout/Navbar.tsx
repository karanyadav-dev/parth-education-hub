'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Menu,
  X,
  Search,
  User,
  BookOpen,
  GraduationCap,
  FileText,
  Briefcase,
  Calendar,
  ChevronDown,
  Sun,
  Moon,
  Bell,
  LogOut,
  Settings,
  HelpCircle,
  Home,
  BarChart3,
  Award,
  FileQuestion,
  ScrollText,
  Newspaper,
  Zap,
  Clock,
  Trophy,
  MessageCircle,
  UserCircle,
  Library,
  Layers,
  Grid,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  Flame,
  Gift,
  Users,
  Video,
  Headphones,
  Shield,
  Heart,
  Target,
  MapPin,
  Globe
} from 'lucide-react'
import { cn } from '@/app/lib/utils'

// ==========================================
// NOTIFICATION TYPES
// ==========================================

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'info' | 'error'
  time: string
  read: boolean
  link?: string
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: '📚 New Course Added!',
        message: 'SSC CGL 2024 Premium Batch is now available.',
        type: 'success',
        time: '2 min ago',
        read: false,
        link: '/courses/ssc-cgl-2024'
      },
      {
        id: '2',
        title: '📝 New Test Available',
        message: 'Daily Quiz: Indian Polity - 20 questions',
        type: 'warning',
        time: '15 min ago',
        read: false,
        link: '/test-series'
      },
      {
        id: '3',
        title: '📢 New Job Alert!',
        message: 'SSC CGL 2024 Notification Released!',
        type: 'info',
        time: '1 hour ago',
        read: true,
        link: '/job-alerts'
      }
    ]
    setNotifications(sampleNotifications)
    setUnreadCount(sampleNotifications.filter(n => !n.read).length)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/classes', label: 'Live Classes', icon: Video },
    { href: '/all-exams', label: 'All Exams', icon: Layers, megaMenu: true },
    { href: '/courses', label: 'Courses', icon: BookOpen, megaMenu: true },
    { href: '/test-series', label: 'Test Series', icon: BarChart3 },
    { href: '/current-affairs', label: 'Current Affairs', icon: Newspaper },
    { href: '/job-alerts', label: 'Jobs', icon: Briefcase },
  ]

  const megaMenuItems: Record<string, any[]> = {
    'All Exams': [
      { title: 'UPSC & State PSC', icon: Shield, href: '/exams/upsc', items: ['UPSC', 'BPSC', 'UP-PSC', 'MP-PSC'] },
      { title: 'SSC Exams', icon: GraduationCap, href: '/exams/ssc', items: ['CGL', 'CPO', 'CHSL', 'MTS'] },
      { title: 'Banking Exams', icon: BarChart3, href: '/exams/banking', items: ['SBI', 'RBI', 'IBPS'] },
      { title: 'Railway Exams', icon: Globe, href: '/exams/railway', items: ['RRB', 'RPF'] },
    ],
    'Courses': [
      { title: 'Popular Courses', icon: TrendingUp, href: '/courses/popular', items: ['Mathematics', 'Reasoning', 'English', 'GK'] },
      { title: 'Foundation Courses', icon: Layers, href: '/courses/foundation', items: ['Physics', 'Chemistry', 'Biology', 'History'] },
      { title: 'Free Courses', icon: Gift, href: '/courses/free', items: ['Demo Lectures', 'Practice Sets', 'PDF Notes'] },
    ],
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === path
    return pathname?.startsWith(path)
  }

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800', icon: 'text-green-500' }
      case 'warning':
        return { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-200 dark:border-yellow-800', icon: 'text-yellow-500' }
      case 'error':
        return { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800', icon: 'text-red-500' }
      default:
        return { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', icon: 'text-blue-500' }
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-primary/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-2 sm:mr-4">
            <Image
              src="/logo.png"
              alt="Parth Coaching"
              width={70}
              height={70}
              priority
              className="rounded-xl shadow-lg object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.megaMenu && setActiveMegaMenu(link.label)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium transition-colors hover:text-secondary py-2',
                    isActive(link.href)
                      ? 'text-secondary'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.megaMenu && <ChevronDown className="w-3 h-3 ml-1" />}
                </Link>

                {/* Mega Menu */}
                {link.megaMenu && activeMegaMenu === link.label && (
                  <div className="absolute top-full left-0 w-screen max-w-4xl bg-white dark:bg-primary rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {megaMenuItems[link.label]?.map((section, idx) => (
                        <div key={idx}>
                          <div className="flex items-center gap-2 mb-3">
                            <section.icon className="w-5 h-5 text-secondary" />
                            <h4 className="font-semibold text-sm">{section.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {section.items.map((item: string) => (
                              <li key={item}>
                                <Link
                                  href={`${section.href}/${item.toLowerCase()}`}
                                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors flex items-center gap-2"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm text-gray-500">🔥 New: SSC CGL 2024 Premium Batch</span>
                      <Button variant="gradient" size="sm">View All</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive border-none">
                    {unreadCount}
                  </Badge>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[500px] bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-secondary" />
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                          setUnreadCount(0)
                        }}
                        className="text-xs text-secondary hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="overflow-y-auto max-h-[380px] divide-y divide-gray-100 dark:divide-gray-800">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const styles = getNotificationStyles(notification.type)
                        return (
                          <Link
                            key={notification.id}
                            href={notification.link || '#'}
                            className={cn(
                              'p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer block',
                              !notification.read && 'bg-primary/5 dark:bg-primary/10',
                              styles.bg
                            )}
                            onClick={() => {
                              if (!notification.read) {
                                setNotifications(prev =>
                                  prev.map(n =>
                                    n.id === notification.id ? { ...n, read: true } : n
                                  )
                                )
                                setUnreadCount(prev => Math.max(0, prev - 1))
                              }
                            }}
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400 mt-1 block">
                                {notification.time}
                              </span>
                            </div>
                          </Link>
                        )
                      })
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-200 dark:border-gray-800 text-center">
                    <Link
                      href="/notifications"
                      className="text-sm text-secondary hover:underline"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative group">
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </Button>
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="font-semibold">Guest User</p>
                  <p className="text-sm text-gray-500">guest@example.com</p>
                </div>
                <div className="py-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <UserCircle className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/my-courses" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span>My Courses</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-secondary"
                  >
                    <User className="w-4 h-4" />
                    <span>Login / Register</span>
                  </Link>
                  <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-500">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-800 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses, exams, topics, jobs..."
                className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Courses</Badge>
                <Badge variant="outline" className="text-xs">Quiz</Badge>
                <Badge variant="outline" className="text-xs">Jobs</Badge>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                    isActive(link.href)
                      ? 'text-secondary bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-secondary"
                >
                  <User className="w-5 h-5" />
                  <span>Login / Register</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
