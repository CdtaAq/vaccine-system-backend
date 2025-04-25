const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const router = express.Router();

// Number of doses per day
router.get('/doses', async (req, res) => {
  const report = await Appointment.aggregate([
    { $match: { status: 'Vaccinated' } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$scheduleDate" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(report);
});

// Percentage of population covered
router.get('/coverage', async (req, res) => {
  const total = await User.countDocuments({ role: 'patient' });
  const vaccinated = await User.countDocuments({ vaccinationStatus: 'Vaccinated' });

  const percent = total > 0 ? ((vaccinated / total) * 100).toFixed(2) : 0;
  res.json({ vaccinated, total, coverage: `${percent}%` });
});

module.exports = router;
