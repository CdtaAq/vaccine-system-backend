const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  sideEffects: String,
  origin: String,
  dosesRequired: Number,
  strainInfo: String
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
