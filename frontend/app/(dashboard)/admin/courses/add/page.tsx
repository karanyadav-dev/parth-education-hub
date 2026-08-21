'use client';
import { useState } from 'react';

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    pdfFile: null as File | null,
    thumbnail: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle course creation with PDF upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('duration', formData.duration);
    if (formData.pdfFile) data.append('pdf', formData.pdfFile);
    if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);

    try {
      // Send to your API
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Course added successfully!');
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Course Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="Geography">Geography</option>
              <option value="Polity">Polity</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₹)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 6 months"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload PDF</label>
            <input
              type="file"
              accept=".pdf"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setFormData({...formData, pdfFile: e.target.files?.[0] || null})}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload course material as PDF</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setFormData({...formData, thumbnail: e.target.files?.[0] || null})}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Course
          </button>
          <button
            type="reset"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}