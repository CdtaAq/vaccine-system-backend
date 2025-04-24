const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  type: String, // Govt/Private
  charges: Number,
  isApproved: { type: Boolean, default: false },
  vaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' }]
});

module.exports = mongoose.model('Hospital', hospitalSchema);
