import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const statusColour = {
  ACTIVE: 'bg-green-100 text-green-700',
  RECOVERED: 'bg-blue-100 text-blue-700',
  EXPIRED: 'bg-gray-100 text-gray-500',
  CLOSED: 'bg-red-100 text-red-600',
};

const FoundPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/found-posts/${id}`);
        if (res.data.success) {
          setPost(res.data.data);
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        setError('Failed to load post. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading…</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/found-items" className="text-blue-600 hover:underline">← Back to Found Items</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/found-items" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Found Items
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Image */}
        {post.image && (
          <div className="w-full max-h-96 overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
            <span className={`text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusColour[post.status] || 'bg-gray-100 text-gray-500'}`}>
              {post.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 uppercase text-xs tracking-wide font-medium mb-0.5">Category</p>
              <p className="text-gray-800 font-medium">{post.category}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-xs tracking-wide font-medium mb-0.5">Location Found</p>
              <p className="text-gray-800 font-medium">📍 {post.location}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-xs tracking-wide font-medium mb-0.5">Date Found</p>
              <p className="text-gray-800 font-medium">{formatDate(post.dateFound)}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-xs tracking-wide font-medium mb-0.5">Posted By</p>
              <p className="text-gray-800 font-medium">{post.postedBy?.name || 'Anonymous'}</p>
            </div>
          </div>

          {post.description && (
            <div>
              <p className="text-gray-400 uppercase text-xs tracking-wide font-medium mb-1">Description</p>
              <p className="text-gray-700 leading-relaxed">{post.description}</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Posted on {formatDate(post.createdAt)}
            </p>
          </div>

          {/* Claim button placeholder — Phase 4 */}
          {post.status === 'ACTIVE' && (
            <div className="pt-2">
              <button
                disabled
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium opacity-40 cursor-not-allowed text-sm"
              >
                Claim This Item (Coming Soon)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundPostDetail;
