import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, receipt } = body

    const order = await razorpay.orders.create({
      amount: amount * 100, // Paise mein convert
      currency: currency || 'INR',
      receipt: receipt || 'receipt_' + Date.now(),
    })

    return NextResponse.json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    })

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}