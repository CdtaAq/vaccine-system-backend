const express = require('express');
const QRCode = require('qrcode');
const Appointment = require('../models/Appointment');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { appointmentId } = req.body;

  const qrData = `Pay for Appointment: ${appointmentId}`;
  const qrImage = await QRCode.toDataURL(qrData);

  // Update appointment to "Paid" (mock confirmation)
  await Appointment.findByIdAndUpdate(appointmentId, { paymentStatus: 'Paid' });

  res.json({ msg: 'Payment confirmed', qrImage });
});

module.exports = router;
