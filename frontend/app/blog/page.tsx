export default function BlogPage() {
  const blogs = [
    { title: 'SSC CGL 2024 Notification Released', excerpt: 'SSC CGL 2024 notification released with 10,000+ vacancies.', date: 'July 30, 2024' },
    { title: 'UPSC Prelims 2024 Results Announced', excerpt: 'UPSC Prelims 2024 results announced. Check your score now.', date: 'July 28, 2024' },
  ]
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Blog</h1>
        <div className="space-y-6">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{blog.excerpt}</p>
              <p className="text-sm text-gray-400 mt-2">{blog.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}