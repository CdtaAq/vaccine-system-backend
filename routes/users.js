const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get pending users
router.get('/pending', async (req, res) => {
  const users = await User.find({ isApproved: false, role: 'patient' });
  res.json(users);
});

// Approve user
router.put('/approve/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ msg: 'User approved' });
});

module.exports = router;
