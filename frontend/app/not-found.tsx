import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
        <Link href="/">
          <Button variant="gradient" className="mt-6">Go Home</Button>
        </Link>
      </div>
    </div>
  )
}