const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/vaccination_system', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use the admin routes (only accessible by Admins)
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
