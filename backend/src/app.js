const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const foundPostRoutes = require('./routes/foundPost.routes');

// Basic route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'CampusFind API is running.' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/found-posts', foundPostRoutes);

module.exports = app;
