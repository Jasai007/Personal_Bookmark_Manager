const express = require('express');
const Bookmark = require('../models/Bookmark');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all bookmarks for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user_id: req.user.userId }).sort({ created_at: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create bookmark
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, url, description, tags } = req.body;
    const bookmark = new Bookmark({
      title,
      url,
      description,
      tags: tags || [],
      user_id: req.user.userId
    });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update bookmark
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, url, description, tags } = req.body;
    const { id } = req.params;
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: id, user_id: req.user.userId },
      { title, url, description, tags: tags || [] },
      { new: true }
    );
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bookmark
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bookmark.findOneAndDelete({ _id: id, user_id: req.user.userId });
    if (!result) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;