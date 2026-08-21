'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent } from '@/app/components/ui/card'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <div><p className="font-medium">Email</p><p className="text-gray-500">support@parth-education.com</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Phone className="w-6 h-6 text-green-500" />
                <div><p className="font-medium">Phone</p><p className="text-gray-500">+91-9876543210</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <MapPin className="w-6 h-6 text-orange-500" />
                <div><p className="font-medium">Address</p><p className="text-gray-500">New Delhi, India</p></div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <textarea className="w-full p-3 border rounded-lg min-h-[150px]" placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                <Button type="submit" variant="gradient" className="w-full"><Send className="w-4 h-4 mr-2" /> Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}