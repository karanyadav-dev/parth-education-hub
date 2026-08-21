export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Terms of Service</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
          <p>Last updated: July 31, 2024</p>
          <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
          <p className="text-gray-600">By using our platform, you agree to these terms.</p>
          <h2 className="text-xl font-semibold">User Accounts</h2>
          <p className="text-gray-600">You are responsible for maintaining the confidentiality of your account.</p>
          <h2 className="text-xl font-semibold">Content</h2>
          <p className="text-gray-600">All content on this platform is for educational purposes only.</p>
        </div>
      </div>
    </div>
  )
}