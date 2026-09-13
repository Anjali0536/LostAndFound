import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'Electronics',
  'Accessories',
  'Keys',
  'Cards',
  'Documents',
  'Books',
  'Clothing',
  'Bottles',
  'Bags',
  'Miscellaneous',
];

const ReportFoundItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    image: '',
    dateFound: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-4">You must be signed in to report a found item.</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.category || !formData.location || !formData.image) {
      return setError('Title, category, location, and image URL are required.');
    }

    setIsLoading(true);
    try {
      const res = await api.post('/found-posts', formData);
      if (res.data.success) {
        navigate('/found-items');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/found-items" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Found Items
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Report a Found Item</h1>
        <p className="text-sm text-gray-500 mb-6">
          Help reunite a lost item with its owner by posting what you found.
        </p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. Black water bottle"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Found <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              type="text"
              required
              placeholder="e.g. Library, Block A corridor, Canteen"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date Found */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Found
            </label>
            <input
              name="dateFound"
              type="date"
              value={formData.dateFound}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Image URL (Phase 3 – cloud upload in Phase 9) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              name="image"
              type="url"
              required
              placeholder="Paste a direct image URL (Imgur, etc.)"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Cloud upload (Cloudinary) will be added in a later phase. For now, paste a direct image link.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Any identifying details — colour, markings, condition…"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-colors ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Posting…' : 'Post Found Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportFoundItem;
