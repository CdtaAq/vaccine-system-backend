const express = require('express');
const Vaccine = require('../models/Vaccine');
const router = express.Router();

// Register a vaccine
router.post('/', async (req, res) => {
  const vaccine = new Vaccine(req.body);
  await vaccine.save();
  res.status(201).json({ msg: 'Vaccine added' });
});

// List vaccines
router.get('/', async (req, res) => {
  const vaccines = await Vaccine.find();
  res.json(vaccines);
});

module.exports = router;
