import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  created_at: string;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (_id: string) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors flex items-center"
          >
            {bookmark.title}
            <ExternalLink className="h-4 w-4 ml-1 opacity-60" />
          </a>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(bookmark)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{bookmark.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {bookmark.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="text-xs text-gray-500">
        Added {new Date(bookmark.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BookmarkCard;