'use client';
import { useState } from 'react';

export default function AddCurrentAffairsPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    content: '',
    pdfFile: null as File | null,
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('date', formData.date);
    data.append('content', formData.content);
    if (formData.pdfFile) data.append('pdf', formData.pdfFile);
    if (formData.image) data.append('image', formData.image);

    try {
      const response = await fetch('/api/admin/current-affairs', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Current Affairs added successfully!');
      }
    } catch (error) {
      console.error('Error adding current affairs:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Current Affairs</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="National">National</option>
              <option value="International">International</option>
              <option value="Economy">Economy</option>
              <option value="Sports">Sports</option>
              <option value="Science">Science & Technology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Add Current Affairs
          </button>
          <button type="reset" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}