const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['patient', 'admin'],
      default: 'patient'
    },
    age: { type: Number, default: 30 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    phone: { type: String, default: '+1 555-0192' },
    address: { type: String, default: 'Kathmandu, Nepal' },
    bloodGroup: { type: String, default: 'O+' },
    preferredPaymentMethod: {
      type: String,
      enum: ['eSewa', 'Khalti', 'IME Pay', 'Connect IPS', 'Bank Transfer', 'Cash', 'Card'],
      default: 'eSewa'
    },
    paymentDetails: { type: String, default: '' },
    medicalHistory: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
