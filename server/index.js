const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/mongodb');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});