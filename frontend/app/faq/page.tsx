'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  { question: 'What is Parth Education Hub?', answer: 'India\'s best online learning platform for government exam preparation.' },
  { question: 'How do I enroll in a course?', answer: 'Browse courses, click "Enroll Now", complete payment, and start learning.' },
  { question: 'Is there a refund policy?', answer: 'Yes, 7-day money-back guarantee if not satisfied.' },
  { question: 'Can I access courses on mobile?', answer: 'Yes, fully responsive on all devices.' },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">FAQs</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="cursor-pointer" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
                {openIndex === index && <p className="mt-3 text-gray-600">{faq.answer}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}