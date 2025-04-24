const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  vaccineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' },
  scheduleDate: Date,
  status: { type: String, default: 'Scheduled' },
  paymentStatus: { type: String, default: 'Unpaid' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
