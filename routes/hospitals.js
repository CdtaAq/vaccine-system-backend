const express = require('express');
const Hospital = require('../models/Hospital');
const router = express.Router();

// Register hospital
router.post('/register', async (req, res) => {
  const hospital = new Hospital(req.body);
  await hospital.save();
  res.status(201).json({ msg: 'Hospital registered' });
});

// List all hospitals
router.get('/', async (req, res) => {
  const hospitals = await Hospital.find().populate('vaccines');
  res.json(hospitals);
});

// Approve hospital
router.put('/approve/:id', async (req, res) => {
  await Hospital.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ msg: 'Hospital approved' });
});

module.exports = router;
