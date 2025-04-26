// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'secret_key', { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error while signing up.', error: err.message });
  }
});

module.exports = router;
