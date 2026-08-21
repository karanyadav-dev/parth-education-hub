export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">About Us</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome to Parth Education Hub</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            India's most trusted platform for government exam preparation.
          </p>
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To provide quality education to every student preparing for competitive exams in India.
          </p>
          <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Expert faculty from top institutions</li>
            <li>Comprehensive study material</li>
            <li>Regular mock tests and practice</li>
            <li>24/7 doubt clearing support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}