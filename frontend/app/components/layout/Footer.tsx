'use client'

import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  Heart,
  Clock,
  Award,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Briefcase,
  Calendar,
  Shield,
  Lock,
  Globe,
  MessageCircle,
  Hash,
  Users as UsersIcon
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    setIsSubscribing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('🎉 Subscribed successfully!')
    setEmail('')
    setIsSubscribing(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
    'Courses': [
      { name: 'SSC', href: '/courses/ssc' },
      { name: 'Banking', href: '/courses/banking' },
      { name: 'UPSC', href: '/courses/upsc' },
      { name: 'Railway', href: '/courses/railway' },
    ],
    'Resources': [
      { name: 'Quiz Series', href: '/quiz' },
      { name: 'Mock Tests', href: '/test-series' },
      { name: 'Previous Papers', href: '/previous-papers' },
      { name: 'Current Affairs', href: '/current-affairs' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Refund Policy', href: '/refund' },
    ],
  }

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Subscribe to Our <span className="text-accent">Newsletter</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on courses, exams, jobs, and study materials directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-secondary"
              />
              <Button variant="gradient" type="submit" disabled={isSubscribing} className="flex-shrink-0">
                {isSubscribing ? (
                  <>
                    <span className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-xl transform rotate-12"></div>
                <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">PC</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Parth Coaching</h3>
                <p className="text-sm text-gray-400">Learn Today, Lead Tomorrow</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              India's best coaching platform for competitive exam preparation. 
              Join thousands of students and achieve your dream career.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span>parthcoaching.vm@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>8385816013, 9785308152</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Behind the Panchayat Samiti, Govindgarh, Jaipur, Rajasthan.</span>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-secondary flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-secondary flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Students', value: '50,000+' },
            { icon: GraduationCap, label: 'Courses', value: '200+' },
            { icon: Clock, label: 'Study Hours', value: '10,000+' },
            { icon: Award, label: 'Certificates', value: '25,000+' },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <stat.icon className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar with WhatsApp Channel */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Parth Coaching. All rights reserved. Made with <Heart className="w-4 h-4 text-red-500 inline" /> in India
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://whatsapp.com/channel/0029ValhPlCFXUuTuklWFs17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20"
            >
              <Hash className="w-4 h-4" />
              <span>Join WhatsApp Channel</span>
              <UsersIcon className="w-3 h-3" />
              <span className="text-xs">100+ Followers</span>
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 z-40 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/919785308152"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 z-40 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </a>
    </footer>
  )
}

export default Footer
