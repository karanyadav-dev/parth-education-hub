import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://parth-coaching.com'),
  title: {
    default: 'Parth Coaching - Learn Today, Lead Tomorrow',
    template: '%s | Parth Coaching'
  },
  description: "India's best coaching platform for competitive exam preparation. Access courses, mock tests, quizzes, study materials and more.",
  keywords: [
    'coaching',
    'education',
    'learning',
    'competitive exams',
    'SSC',
    'Banking',
    'UPSC',
    'Railway',
    'teaching',
    'online courses',
    'mock tests',
    'quiz series',
    'current affairs'
  ],
  authors: [{ name: 'Parth Coaching' }],
  creator: 'Parth Coaching',
  publisher: 'Parth Coaching',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://parth-coaching.com',
    siteName: 'Parth Coaching',
    title: 'Parth Coaching - Learn Today, Lead Tomorrow',
    description: "India's best coaching platform for competitive exam preparation. Access courses, mock tests, quizzes, and more.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Parth Coaching - Learn Today, Lead Tomorrow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parth Coaching - Learn Today, Lead Tomorrow',
    description: "India's best coaching platform for competitive exam preparation.",
    images: ['/og-image.jpg'],
    creator: '@parthcoaching',
    site: '@parthcoaching',
  },
  alternates: {
    canonical: 'https://parth-coaching.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'education',
  classification: 'Education, Learning, Exam Preparation',
  applicationName: 'Parth Coaching',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  assets: ['https://parth-coaching.com/assets'],
  bookmarks: ['https://parth-coaching.com'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16 md:pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}