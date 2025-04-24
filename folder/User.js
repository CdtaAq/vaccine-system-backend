const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
  gender: String,
  contact: String,
  address: String,
  disease: String,
  medicalCertificate: String,
  email: String,
  password: String,
  role: { type: String, default: 'patient' }, // admin/hospital/patient
  isApproved: { type: Boolean, default: false },
  vaccinationStatus: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('User', userSchema);
