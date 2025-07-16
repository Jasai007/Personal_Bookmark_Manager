import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
}

interface BookmarkFormProps {
  bookmark?: Bookmark;
  onSubmit: (data: Omit<Bookmark, '_id' | 'created_at'>) => void | Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
  allTags?: string[];
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ bookmark, onSubmit, onCancel, isOpen, allTags = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    if (bookmark) {
      setFormData({
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description,
        tags: bookmark.tags.join(', ')
      });
    } else {
      setFormData({
        title: '',
        url: '',
        description: '',
        tags: ''
      });
    }
  }, [bookmark]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = onSubmit({
      title: formData.title,
      url: formData.url,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
    // If adding (not editing), reset fields after successful submit
    if (!bookmark) {
      if (result instanceof Promise) {
        await result;
      }
      setFormData({ title: '', url: '', description: '', tags: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="web, design, tools"
              list="tag-suggestions"
            />
            {allTags.length > 0 && (
              <datalist id="tag-suggestions">
                {allTags.map(tag => (
                  <option key={tag} value={tag} />
                ))}
              </datalist>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {bookmark ? 'Update' : 'Add'} Bookmark
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm;