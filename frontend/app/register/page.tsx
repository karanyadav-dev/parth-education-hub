'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/auth/register')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Redirecting to Register...</p>
      </div>
    </div>
  )
}