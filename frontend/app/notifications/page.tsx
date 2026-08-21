'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications] = useState([
    { id: '1', title: 'New Course Added!', message: 'SSC CGL 2024 Premium Batch is now available.', type: 'success', time: '2 min ago' },
    { id: '2', title: 'New Test Available', message: 'Daily Quiz: Indian Polity - 20 questions', type: 'warning', time: '15 min ago' },
    { id: '3', title: 'New Job Alert!', message: 'SSC CGL 2024 Notification Released!', type: 'info', time: '1 hour ago' },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default: return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card key={notif.id}>
              <CardContent className="p-6 flex items-center gap-4">
                {getIcon(notif.type)}
                <div className="flex-1">
                  <p className="font-semibold">{notif.title}</p>
                  <p className="text-gray-500 text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}