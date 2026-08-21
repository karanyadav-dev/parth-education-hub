'use client';
import { useState } from 'react';

export default function AddTestPage() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    duration: '',
    totalMarks: '',
    pdfFile: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subject', formData.subject);
    data.append('duration', formData.duration);
    data.append('totalMarks', formData.totalMarks);
    if (formData.pdfFile) data.append('pdf', formData.pdfFile);

    try {
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Test added successfully!');
      }
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Test</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Test Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Total Marks</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={formData.totalMarks}
              onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Upload Test PDF</label>
            <input
              type="file"
              accept=".pdf"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setFormData({...formData, pdfFile: e.target.files?.[0] || null})}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload question paper as PDF</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Add Test
          </button>
          <button type="reset" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}