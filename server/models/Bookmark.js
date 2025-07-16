const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
