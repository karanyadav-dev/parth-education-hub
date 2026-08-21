'use client'

import { useEffect } from 'react'
import { Button } from '@/app/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error('Error:', error), [error])
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
        <p className="text-gray-500 mt-2">{error.message || 'An unexpected error occurred.'}</p>
        <Button variant="gradient" className="mt-4" onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}