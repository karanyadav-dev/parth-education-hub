export default function JobAlertsPage() {
  const jobs = [
    { title: 'SSC CGL 2024', vacancies: '10,000+', lastDate: 'August 15, 2024' },
    { title: 'Bank PO 2024', vacancies: '5,000+', lastDate: 'September 1, 2024' },
  ]
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">Job Alerts</h1>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">Vacancies: {job.vacancies}</p>
              <p className="text-gray-600 dark:text-gray-400">Last Date: {job.lastDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}