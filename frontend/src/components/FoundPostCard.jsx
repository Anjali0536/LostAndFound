import React from 'react';
import { Link } from 'react-router-dom';

// Formats an ISO date string to a readable format, e.g. "13 Sep 2026"
const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Map status to a badge colour
const statusColour = {
  ACTIVE: 'bg-green-100 text-green-700',
  RECOVERED: 'bg-blue-100 text-blue-700',
  EXPIRED: 'bg-gray-100 text-gray-500',
  CLOSED: 'bg-red-100 text-red-600',
};

const FoundPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{post.title}</h3>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusColour[post.status] || 'bg-gray-100 text-gray-500'}`}
          >
            {post.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>🏷️ {post.category}</span>
          <span>📍 {post.location}</span>
          <span>📅 {formatDate(post.dateFound)}</span>
        </div>

        {post.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-50 flex gap-2">
          <Link
            to={`/found-posts/${post._id}`}
            className="flex-1 text-center text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoundPostCard;
