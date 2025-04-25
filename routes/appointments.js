const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const router = express.Router();

// Book appointment
router.post('/', async (req, res) => {
  const { userId, hospitalId, vaccineId, scheduleDate } = req.body;

  const appointment = new Appointment({
    userId, hospitalId, vaccineId, scheduleDate
  });

  await appointment.save();
  res.status(201).json({ msg: 'Appointment scheduled', appointment });
});

// Get appointments for a user
router.get('/:userId', async (req, res) => {
  const appointments = await Appointment.find({ userId: req.params.userId })
    .populate('hospitalId vaccineId');
  res.json(appointments);
});

module.exports = router;
