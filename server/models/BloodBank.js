const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema(
  {
    group: { type: String, required: true, unique: true },
    available: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BloodBank', bloodBankSchema);
