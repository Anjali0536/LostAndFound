import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FoundPostCard from '../components/FoundPostCard';
import { useAuth } from '../context/AuthContext';

const FoundItems = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/found-posts');
        if (res.data.success) {
          setPosts(res.data.data);
        }
      } catch (err) {
        setError('Failed to load found items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Found Items</h1>
          <p className="text-gray-500 mt-1">
            Browse items found on campus. If you recognise something, open it and claim it.
          </p>
        </div>
        {user ? (
          <Link
            to="/report-found"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            + Report Found Item
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
          >
            Sign in to Report
          </Link>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-16 text-gray-500">Loading found items…</div>
      )}

      {!loading && error && (
        <div className="text-center py-16 text-red-500">{error}</div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No found items have been reported yet.</p>
          {user && (
            <Link
              to="/report-found"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Be the first to report a found item →
            </Link>
          )}
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <FoundPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItems;
