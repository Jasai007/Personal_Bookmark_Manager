import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Filter } from 'lucide-react';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import SearchBar from '../components/SearchBar';
import toast from 'react-hot-toast';

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    filterBookmarks();
  }, [bookmarks, searchTerm, selectedTag]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookmarks');
      setBookmarks(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const filterBookmarks = () => {
    let filtered = bookmarks;

    if (searchTerm) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(bookmark =>
        bookmark.tags.includes(selectedTag)
      );
    }

    setFilteredBookmarks(filtered);
  };

  const handleAddBookmark = async (data: Omit<Bookmark, '_id' | 'created_at'>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookmarks', data);
      setBookmarks([response.data, ...bookmarks]);
      setIsFormOpen(false);
      toast.success('Bookmark added successfully!');
    } catch (error) {
      toast.error('Failed to add bookmark');
    }
  };

  const handleUpdateBookmark = async (data: Omit<Bookmark, '_id' | 'created_at'>) => {
    if (!editingBookmark) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/bookmarks/${editingBookmark._id}`, data);
      setBookmarks(bookmarks.map(bookmark =>
        bookmark._id === editingBookmark._id ? response.data : bookmark
      ));
      setEditingBookmark(undefined);
      setIsFormOpen(false);
      toast.success('Bookmark updated successfully!');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleDeleteBookmark = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${_id}`);
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== _id));
      toast.success('Bookmark deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete bookmark');
    }
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setIsFormOpen(true);
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    bookmarks.forEach(bookmark => {
      bookmark.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Bookmark</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Tags</option>
              {getAllTags().map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {getAllTags().length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {getAllTags().map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {bookmarks.length === 0 
              ? "No bookmarks yet. Add your first bookmark!" 
              : "No bookmarks match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map(bookmark => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              onEdit={handleEditBookmark}
              onDelete={handleDeleteBookmark}
            />
          ))}
        </div>
      )}

      <BookmarkForm
        bookmark={editingBookmark}
        onSubmit={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingBookmark(undefined);
        }}
        isOpen={isFormOpen}
        allTags={getAllTags()}
      />
    </div>
  );
};

export default Dashboard;