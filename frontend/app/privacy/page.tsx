export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Privacy Policy</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
          <p>Last updated: July 31, 2024</p>
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <p className="text-gray-600">We collect information you provide directly, such as name, email, and phone number.</p>
          <h2 className="text-xl font-semibold">How We Use Information</h2>
          <p className="text-gray-600">To provide, maintain, and improve our services.</p>
          <h2 className="text-xl font-semibold">Data Security</h2>
          <p className="text-gray-600">We use industry-standard security measures to protect your data.</p>
        </div>
      </div>
    </div>
  )
}