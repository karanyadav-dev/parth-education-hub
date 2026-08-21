'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { toast } from 'sonner'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentButtonProps {
  amount: number
  courseId: string
  courseName: string
}

export function PaymentButton({ amount, courseId, courseName }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Create order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `course_${courseId}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)

      // Open Razorpay checkout
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Parth Education Hub',
        description: courseName,
        order_id: data.order.id,
        handler: function (response: any) {
          toast.success('Payment successful! 🎉')
          // Redirect to success page
          window.location.href = `/payment/success?order_id=${response.razorpay_order_id}`
        },
        prefill: {
          name: 'Student',
          email: 'student@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#f97316',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error: any) {
      toast.error(error.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="gradient" onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </Button>
  )
}